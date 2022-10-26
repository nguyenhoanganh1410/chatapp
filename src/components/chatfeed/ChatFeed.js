import "./ChatFeedStyle.scss";
import * as React from "react";
import { useRef, useState, useEffect } from "react";

import ChatHeader from "./ChatHeader";
import NewMessageForm from "./NewMessageForm";
import Message from "./Message";
import Avatar from "@mui/material/Avatar";
import "./MessageStyle.scss";
import TimeLine from "./TimeLine";
import { IoIosArrowDown } from "react-icons/io";

import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";
import Contex from "../../store/Context";
import messageApi from "../../api/messageApi";
import CircularProgress from "@mui/material/CircularProgress";
import { SetMessageSent, SetStatusMessage } from "../../store/Actions";
// import {socket} from '../../store/socketClient';

const ChatFeed = ({ socket }) => {
  const { state, depatch } = React.useContext(Contex);
  const [messages, setMessages] = useState([]);
  // console.log(messages);
  const [idReMessage, setIdReMessage] = useState("");
  const [statusLoadMessage, setStatusLoadMessage] = useState(true);
  // const [arrivalMess, setArrivalMess] = useState(null);
  const [arrivalMess, setArrivalMess] = useState("");

  //console.log("chetfeed message ---->" + messages);
  //detructering...
  const { userChatting, idConversation, user, messageSent } = state;
  // console.log(" message ---->");
  // console.log(messageSent);
  const messagesEnd = useRef();
  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  // const handleScroll = () => {
  //   console.log("scroll");
  // };

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.emit("seen-message", {
  //       isSeen:true,
  //       conversationId: idConversation,
  //       userId: user.uid,
  //     });
  //   }
  // }, []);

  //khi tin nhan duoc gui thi them tin nhan do vao messages -> render
  useEffect(() => {
    // console.log("useEffect --->");
    // console.log(messageSent);
    if (messageSent != "" && idConversation === messageSent.conversationId) {
      setMessages((prev) => [...prev, messageSent]);
      
    }
    // messageSent &&
    //   idConversation === messageSent.conversationId &&
  }, [messageSent]);

  useEffect(() => {

    // socket.current.emit("join-room", {
    //   idCon:idConversation,
    //   isNew:false
    // });

    socket.current?.on("get-message", ({ senderId, message }) => {
      //console.log("get");
      console.log("mess nhan dc ---> ");
      console.log(message);
      setArrivalMess(message);

      //set statusMessage = da nhan
      // depatch(SetStatusMessage("đã nhận"));
    });

    socket.current?.on("reMessage", (data) => {
      setIdReMessage(data);
    });
  }, []);
    
  // }, [userChatting]);

  // useEffect(() => {
  //     if (socket.current) {
  //       socket.current.emit("seen-message", {
  //         conversationId: idConversation,
  //         userId: user.uid,
  //       });
  //     }
  //   }, []);
  

  //cap nhat mess da thu hoi len giao dien
  useEffect(() => {
    const newMess = messages.map((mess) => {
      if (mess._id === idReMessage) {
        return { ...mess, isDeleted: true };
      }
      return mess;
    });
    console.log(newMess);
    setMessages(newMess);
  }, [idReMessage]);

  useEffect(() => {
    //xoa di message cuoi cung cua array (message mẫu)
    if (messageSent != "") {
      const messagesCurrent = messages.filter((val, idx) => {
        return idx !== messages.length - 1;
      });
      depatch(SetMessageSent(""))
      // console.log(messagesCurrent);
      arrivalMess &&
        idConversation === arrivalMess.conversationId &&
        setMessages((prev) => [...messagesCurrent, arrivalMess]);
    } else {
      arrivalMess &&
        idConversation === arrivalMess.conversationId &&
        setMessages((prev) => [...prev, arrivalMess]);
    }
  }, [arrivalMess, idConversation]);

  // console.log(arrivalMess);

  useEffect(() => {
    //scroll last message
    scrollToBottom();
  });

  useEffect(() => {
    setStatusLoadMessage(true);
    //call api get all message
    //set state
    const featchMessages = async () => {
      try {
        const response = await messageApi.getMess(idConversation, user.uid);
        const { data, info, friendStatus, size, totalPages } = response;
        //console.log(response);

        if (response) {
          setMessages(data[0].messages);
        }
        setStatusLoadMessage(false);
      } catch (error) {
        setMessages([]);
        setStatusLoadMessage(false);
        console.log("Failed to fetch conversation list: ", error);
      }
    };

    featchMessages();
  }, [userChatting, idConversation]);
  return (
    <div className="chat_feed">
      <ChatHeader userChatting={userChatting} />
      <div
        // data-simplebar
        className="message_content"
      >
        <div className="card_title">
          <div className="title_top">
            {userChatting?.avatar ? (
              <Avatar
                className=""
                src={userChatting?.avatar}
                alt={userChatting?.first_name}
              />
            ) : (
              <Avatar
                className=""
                style={{ textTransform: "capitalize" }}
                src={userChatting?.avatar}
              >
                {userChatting?.last_name[0]}
              </Avatar>
            )}

            <div className="topContent">
              <p style={{ textTransform: "capitalize" }}>
                {userChatting?.last_name + " " + userChatting?.first_name}
              </p>
              <p>Hãy bắt đầu cùng nhau chia sẻ những...</p>
            </div>
          </div>
          <div className="title_image"></div>
        </div>
        {messages.map((mess, idx) => {
          //neu la tin nhan cuoi cung
          //truyen 1 trang thai la isLastMessage
          if (idx === messages?.length - 1) {
            return (
              <Message
                key={mess._id}
                mess={mess}
                socket={socket}
                isLastMessage
              />
            );
          }
          return <Message key={mess._id} mess={mess} socket={socket} />;
        })}
        {/* <TimeLine />
        <Message />
        <Message me />

        <Message type="image" />
        <Message />
        <Message me />

        <Message me />
        <Message me />
        <Message me />
        <Message />
        <TimeLine />
        <Message />
        <Message me />
        <Message me /> */}

        <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
      </div>

      <span className="goToBottom" onClick={scrollToBottom}>
        <IoIosArrowDown />
      </span>
      {statusLoadMessage ? (
        <div className="meassage_loadingStatus">
          <CircularProgress className="circle_loading" />
          <p>Đang tải tin nhắn</p>
        </div>
      ) : null}
      <NewMessageForm
        userChatting={userChatting}
        idConversation={idConversation}
        messages={messages}
        setMessages={setMessages}
        socket={socket}
      />
    </div>
  );
};
export default ChatFeed;
