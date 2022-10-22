import "./NewMessageForm.scss";
import { MdInsertEmoticon } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { GrImage } from "react-icons/gr";
import { useState, useRef } from "react";
import { SearchComponent } from "stipop-react-sdk";
import Context from "../../store/Context";
import { useContext,useEffect } from "react";
import messageApi from "../../api/messageApi";
// import {socket} from '../../store/socketClient';
import io from "socket.io-client";
// import {init} from '../../store/socketClient';


const NewMessageForm = ({ userChatting,idConversation,messages,setMessages,socket }) => {
  
  // const [socket,setSocket] = useState(null);
  const [showStickers, setShowStickers] = useState(false);
  const [focusInput, setFocusInput] = useState(false);
  const { state, depatch } = useContext(Context);
  const[newMessage,setNewMessage]=useState("");
  const [arrivalMess, setArrivalMess] = useState(null);

  const { user } = state;

 
  //detructering...
  
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

  const onFormSubmit=async (e) => {
    e.preventDefault();
    try {
    const newMess ={
      userId:user.uid,
      content:newMessage,
      conversationId:idConversation,
      type:"TEXT"
    }
    const messSave = await messageApi.addTextMess(newMess);
    
    if(socket.current){
      socket.current.emit("send-message",{
        senderId:user.uid,
        receiverId:userChatting.uid,
        message:messSave
      });
      console.log("send");
    }
      // setMessages([...messages,messSave]);
      setNewMessage("");
    }
    catch (error) {
      console.log("Failed to fetch conversation list: ", error);
    }

  };

  useEffect(() => {
      socket.current.on('get-message', ({senderId,message}) => {
        console.log("get");
        console.log("data"+{message});
        setArrivalMess(
          message
        );
      })
  },[]);

  useEffect(() => {
    arrivalMess &&  setMessages((prev) => [...prev, arrivalMess]);
  },[arrivalMess]);

  return (
    <div className="new_message" ref={divMessage}>
      <form onSubmit={onFormSubmit}>
        <input
          onFocus={() => handleFocus()}
          onBlur={(e) => handleBlur(e)}
          onChange={(e)=>setNewMessage(e.target.value)}
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
          <GrImage />
        </span>
        <span
          style={{ color: "#333" }}
          title="Biểu cảm"
          onClick={() => handleShowStickers()}
          className={showStickers ? "choise" : ""}
        >
          <MdInsertEmoticon />
        </span>
        <span title="Gửi nhanh cảm xúc">
          <FcLike />
        </span>
      </form>
      {showStickers ? (
        <SearchComponent
          params={{
            apikey: "110a13915f6cb9503c563964f58cee2d",
            userId: user?.uid || Math.random(),
          }}
          stickerClick={(url) => console.log(url)}
        />
      ) : null}
    </div>
  );
};

export default NewMessageForm;
