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
import { SearchComponent } from "stipop-react-sdk";
const ChatFeed = () => {
  const onScroll = (e) => {
    const currentScrollY = e.target.scrollTop;
    console.log(currentScrollY);
  };

  return (
    <div className="chat_feed">
      <ChatHeader />
      <div className="message_content" onScroll={onScroll}>
        <div className="card_title">
          <div className="title_top">
            <Avatar
              className="avatar"
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <div className="topContent">
              <p>Peter Nguyen</p>
              <p>Hãy bắt đầu cùng nhau chia sẻ những...</p>
            </div>
          </div>
          <div className="title_image"></div>
        </div>
        <TimeLine />
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
        <Message me />

        <span className="goToBottom">
          <IoIosArrowDown />
        </span>
      </div>

      <NewMessageForm />
    </div>
  );
};
export default ChatFeed;
