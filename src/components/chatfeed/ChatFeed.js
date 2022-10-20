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

const ChatFeed = () => {
  const { state, depatch } = React.useContext(Contex);
  const [messages, setMessages] = useState([]);
  console.log(messages);
  //detructering...
  const { userChatting, idConversation, user } = state;
  console.log(idConversation);
  const messagesEnd = useRef();
  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    console.log("scroll");
  };

  useEffect(() => {
    //scroll last message
    scrollToBottom();
  });

  useEffect(() => {
    //call api get all message
    //set state
    const featchMessages = async () => {
      try {
        const response = await messageApi.getMess(idConversation, user.uid);
        const { data, info, friendStatus, size, totalPages } = response;

        if (response) {
          setMessages(data[0].messages);
        }
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    };

    featchMessages();
  }, [userChatting]);
  return (
    <div className="chat_feed">
      <ChatHeader userChatting={userChatting} />
      <div
        // data-simplebar
        className="message_content"
        onScroll={() => handleScroll()}
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
        {messages.map((mess) => {
          return <Message key={mess._id} mess={mess} />;
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
      <NewMessageForm userChatting={userChatting} />
    </div>
  );
};
export default ChatFeed;
