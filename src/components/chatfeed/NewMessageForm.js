import "./NewMessageForm.scss";
import { MdInsertEmoticon } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { FiSend } from "react-icons/fi";
import { GrImage } from "react-icons/gr";
import { useState, useRef } from "react";
import { SearchComponent } from "stipop-react-sdk";
import Context from "../../store/Context";
import { useContext, useEffect } from "react";
import messageApi from "../../api/messageApi";
// import {socket} from '../../store/socketClient';

import io from "socket.io-client";
import conversationApi from "../../api/conversationApi";
// import {init} from '../../store/socketClient';
import { SetIdConversation, SetMessageSent } from "../../store/Actions";

const NewMessageForm = ({
  userChatting,
  idConversation,
  messages,
  setMessages,
  socket,
}) => {
  // const [socket,setSocket] = useState(null);
  const [showStickers, setShowStickers] = useState(false);
  const [focusInput, setFocusInput] = useState(false);
  const { state, depatch } = useContext(Context);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMess, setArrivalMess] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [newMessageSticker, setNewMessageSticker] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [meTyping, setMeTyping] = useState("");

  const { user, messageSent } = state;
  const inputChooseIMG = useRef();


  useEffect(() => {
    if (socket.current) {
      socket.current.on("typing", (data) => {
        console.log(data.idConversation, idConversation);

        if(data.idConversation === idConversation){
          setIsTyping(true);
          setMeTyping(data.me);
        }else{
          setIsTyping(false);
        }
      });
      socket.current.on("stop-typing", (data) => {
        if(data.idConversation === idConversation){
          setIsTyping(false);
          setMeTyping(data.me);
        }else{
          setIsTyping(false);
        }
      });
    }
  }, [idConversation]);
  //detructering...
  // console.log({user});

  const divMessage = useRef();

  const handleFocus = (params) => {
    divMessage.current.classList.add("booderTop");
  };
  const handleBlur = (params) => {
    divMessage.current.classList.remove("booderTop");
  };

  const handleShowStickers = () => {
    setShowStickers(!showStickers);
  };

  // SEND FILE
  const changeHandler = async (event) => {
    const file = event.target.files[0];
    // setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    let TYPE = file.type.split("/")[0].trim().toUpperCase();
    let SIZE = file.size / 1024 / 1024;
    if (file) {
      if (!idConversation) {
        console.log("chua co conversation ---> create");
        //tao cuoc tro chuyen
        const createConversation = async () => {
          try {
            const response = await conversationApi.createConversation(
              user.uid,
              userChatting.uid
            );
            depatch(SetIdConversation(response));
            console.log("id conversation moi tao ---> " + response);
            // socket.current.emit("join-room", {
            //   idCon: response,
            //   isNew: true,
            // });

            const formData = new FormData();
            formData.append("userId", user.uid);
            formData.append("file", file);
            formData.append("type", TYPE);
            formData.append("conversationId", response);
            try {
              const messSave = await messageApi.addFileMess(formData);

              if (socket.current) {
                socket.current.emit("send-message", {
                  senderId: user.uid,
                  receiverId: userChatting.uid,
                  message: messSave,
                  idCon: response,
                });
                console.log("send");
              }
              // setMessages([...messages,messSave]);
              setNewMessage("");
            } catch (error) {
              console.log("Failed to fetch conversation list: ", error);
            }
          } catch (error) {
            console.log("Failed to create the conversation: ", error);
          }
        };

        createConversation();
      } else {
        //th2: đã có cuộc trò chuyện
        console.log(" co conversation ---> create");
        console.log(TYPE);
        const formData2 = new FormData();
        formData2.append("userId", user.uid);
        formData2.append("file", file);
        formData2.append("type", TYPE);
        formData2.append("conversationId", idConversation);
        try {
          const messSave = await messageApi.addFileMess(formData2);
          console.log("TYPE");

          if (socket.current) {
            socket.current.emit("send-message", {
              senderId: user.uid,
              receiverId: userChatting.uid,
              message: messSave,
              idCon: idConversation,
            });
            console.log("send");
          }

          // setMessages([...messages,messSave]);
          setNewMessage("");
        } catch (error) {
          console.log("Failed to fetch conversation list: ", error);
        }
      }
    }
  };

  const onHandlChoiseFile = () => {
    inputChooseIMG.current.click();
  };

  //handle send sticker
  const handleSendSticker = async (url) => {
    //console.log(url?.url)
    //set text = url of sticker
    setNewMessageSticker(url?.url);
    //ckeck
    //ckeck
    //th1: chưa từng trò chuyện, có idConversation == null
    if (!idConversation)  {
      console.log("chua co conversation ---> create");
      //tao cuoc tro chuyen
      const createConversation = async () => {
        try {
          const response = await conversationApi.createConversation(
            user.uid,
            userChatting.uid
          );
          depatch(SetIdConversation(response));
          console.log("id conversation moi tao ---> " + response);
          socket.current.emit("join-room", {
            idCon: response,
            isNew: true,
          });
          try {
            const newMess = {
              userId: user.uid,
              content: newMessageSticker,
              conversationId: response,
              type: "TEXT",
            };
            const messSave = await messageApi.addTextMess(newMess);

            if (socket.current) {
              socket.current.emit("send-message", {
                senderId: user.uid,
                receiverId: userChatting.uid,
                message: messSave,
                idCon: response,
              });
              console.log("send");
            }
          } catch (error) {
            console.log("Failed to fetch conversation list: ", error);
          }
        } catch (error) {
          console.log("Failed to create the conversation: ", error);
        }
      };

      createConversation();
    } else {
      //th2: đã có cuộc trò chuyện
      console.log(" co conversation ---> create");
      try {
        const newMess = {
          userId: user.uid,
          content: url?.url,
          conversationId: idConversation,
          type: "TEXT",
        };

        console.log(newMess);

        //call api save db
        const messSave = await messageApi.addTextMess(newMess);
        console.log(messSave);
        //gui len socket
        if (socket.current) {
          socket.current.emit("send-message", {
            senderId: user.uid,
            receiverId: userChatting.uid,
            message: messSave,
            idCon: idConversation,
          });
          console.log("send");
        }
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    }
    setNewMessageSticker("");
    setShowStickers(false);
  };

  //gui 1 tin nhan dang text
  const onFormSubmit = async (e) => {
    e.preventDefault();

    //if newMessage === "" return
    if (!newMessage) {
      return;
    }

    //ckeck
    //th1: chưa từng trò chuyện, có idConversation == null
    setNewMessage("");
    if (typeof(idConversation)!==String  ) {
      console.log("chua co conversation ---> create");
      //tao cuoc tro chuyen
      const createConversation = async () => {
        try {
          const response = await conversationApi.createConversationIndividual(
            user.uid,
            userChatting.uid
          );
          depatch(SetIdConversation(response));
          console.log("id conversation moi tao ---> " + response);

          //join a room with name = id conversation
          // socket.current.emit("join-room", {
          //   idCon: response,
          //   isNew: true,
          // });
          try {
            //create new message
            const newMess = {
              userId: user.uid,
              content: newMessage,
              conversationId: response,
              type: "TEXT",
            };

            //set messageSent
            depatch(SetMessageSent({ ...newMess, _id: Math.random() + "1" }));

            const messSave = await messageApi.addTextMess(newMess);

            if (socket.current) {
              socket.current.emit("send-message", {
                senderId: user.uid,
                receiverId: userChatting.uid,
                message: messSave,
                idCon: response,
                isNew: true,
              });
              console.log("send");
            }
            // setMessages([...messages,messSave]);
            setNewMessage("");
          } catch (error) {
            console.log("Failed to fetch conversation list: ", error);
          }
        } catch (error) {
          console.log("Failed to create the conversation: ", error);
        }
      };

      createConversation();
    } else {
      //th2: đã có cuộc trò chuyện
      console.log(" co conversation ---> create",idConversation);
      try {
        const newMess = {
          userId: user.uid,
          content: newMessage,
          conversationId: idConversation,
          type: "TEXT",
        };
        //set messageSent
        depatch(
          SetMessageSent({
            ...newMess,
            _id: Math.random() + "1",
            createdAt: new Date(),
          })
        );

        //call api add a message into db
        const messSave = await messageApi.addTextMess(newMess);

        if (socket.current) {
          socket.current.emit("send-message", {
            senderId: user.uid,
            receiverId: userChatting.uid,
            message: messSave,
            idCon: idConversation,
            name: user.first_name + "" + user.last_name,
            avatar: user.avatar,
          });
          console.log("send");
        }
        let me = user.first_name + "" + user.last_name;
        socket.current.emit("stop-typing", {idConversation,me});

        // sendNotification({
        //   userName: user.first_name,
        //   content: messSave.content,
        // });
        // setMessages([...messages,messSave]);
        setNewMessage("");
        // notifi();
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    }
  };

  const typingHandle = (e) => {
    setNewMessage(e.target.value);
    if (socket.current) {
      if (!typing) {
        console.log(idConversation);
        setTyping(true);
        let me = user.first_name + "" + user.last_name;
        socket.current.emit("typing", {idConversation,me});
      }

      let lastTypingTime = new Date().getTime();
      let timerLength = 3000;
      setTimeout(() => {
        let typingTimer = new Date().getTime();
        let timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= timerLength && typing) {
          setTyping(false);
        let me = user.first_name + "" + user.last_name;
          socket.current.emit("stop-typing", {idConversation,me});
          console.log(idConversation);
        }
      }, timerLength);
    }
  };
  isTyping
    ? console.log(
      meTyping + " đang soạn tin nhắn....."
      )
    : console.log("not typing");

  // useEffect(() => {
  //   socket.current?.on("get-message", ({ senderId, message }) => {
  //     console.log("get");
  //     console.log( message );
  //     setArrivalMess(message);
  //   });
  // }, []);

  // useEffect(() => {
  //   arrivalMess && setMessages((prev) => [...prev, arrivalMess]);
  // }, [arrivalMess]);
 

  return (
    <div className="new_message" ref={divMessage}>
      {isTyping ? (
        <div>
          {meTyping + " đang soạn tin nhắn....."}
        </div>
      ) : null}
      <form onSubmit={onFormSubmit}>
        <input
          onFocus={() => handleFocus()}
          onBlur={(e) => handleBlur(e)}
          onChange={typingHandle}
          value={newMessage}
          type="text"
          placeholder={
            "Nhập @, để nhắn tới " +
            userChatting?.last_name +
            " " +
            userChatting?.first_name
          }
        />
        <span style={{ color: "#333", fontSize: "20px" }} title="Gửi hình ảnh">
          <input
            type="file"
            ref={inputChooseIMG}
            hidden
            multiple
            accept="application/pdf, image/png"
            onChange={changeHandler}
          ></input>
          <GrImage onClick={onHandlChoiseFile} />
          {/* <button onClick={submitFile}>Submit</button> */}
        </span>
        {/* <input type="file" onChange={changeHandler} /> */}

        <span
          style={{ color: "#333" }}
          title="Biểu cảm"
          onClick={() => handleShowStickers()}
          className={showStickers ? "choise" : ""}
        >
          <MdInsertEmoticon />
        </span>
        <span title="Gửi nhanh cảm xúc">
          {/* <FcLike /> */}
          <FiSend />
        </span>
      </form>
      {showStickers ? (
        <SearchComponent
          className="searchIcons"
          params={{
            apikey: "110a13915f6cb9503c563964f58cee2d",
            userId: user?.uid || Math.random(),
          }}
          stickerClick={(url) => handleSendSticker(url)}
        />
      ) : null}
    </div>
  );
};

export default NewMessageForm;
