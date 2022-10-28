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
import {
  SetIdMessageDeletedWithMe,
  SetMessageSent,
  SetStatusMessage,
} from "../../store/Actions";
import WordsComponent from "../filecomponent/WordsComponent";
// import {socket} from '../../store/socketClient';

const ChatFeedGroup = ({ socket }) => {
  const { state, depatch } = React.useContext(Contex);
  const [messages, setMessages] = useState([]);
  // console.log(messages);
  const [idReMessage, setIdReMessage] = useState("");
  const [statusLoadMessage, setStatusLoadMessage] = useState(true);
  const [statusLoadOldMessage, setStatusLoadOldMessage] = useState(false);
  // const [arrivalMess, setArrivalMess] = useState(null);
  const [arrivalMess, setArrivalMess] = useState("");

  //console.log("chetfeed message ---->" + messages);
  //detructering...
  const {
    userChatting,
    idConversation,
    user,
    messageSent,
    idMessageDeletedWithMe,
    groupChatting,
  } = state;
  // console.log(" message ---->");
  console.log(idMessageDeletedWithMe);
  const messagesEnd = useRef();

  const [panigation, setPanigation] = React.useState({ page: 0, size: 50 });
  const [page, setPage] = React.useState(0);

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  // console.log(arrivalMess);

  useEffect(() => {
    //scroll last message
    scrollToBottom();
  });

  //   useEffect(() => {
  //     setStatusLoadMessage(true);
  //     //call api get all message
  //     //set state
  //     const featchMessages = async () => {
  //       try {
  //         //cal api get total page
  //         const response = await messageApi.getMess(
  //           idConversation,
  //           user.uid,
  //           panigation.page,
  //           panigation.size
  //         );
  //         const { totalPages } = response;
  //         console.log(totalPages);

  //         //th1: so luong tin nhan < 30, page = 1
  //         if (totalPages <= 1) {
  //           setMessages(response.data[0].messages);
  //           //update page current
  //           setPage(totalPages);
  //         } else {
  //           const newPage = totalPages - 1;
  //           //get 30 tin moi nhat
  //           const currnetResponse = await messageApi.getMess(
  //             idConversation,
  //             user.uid,
  //             newPage,
  //             panigation.size
  //           );

  //           const { data, info, friendStatus, size } = currnetResponse;
  //           //neu khong tra ve du 30 tin nhan -> lui 1 page
  //           if (data[0].messages.length < 20) {
  //             const cPage = newPage - 1;
  //             //get 30 tin moi nhat
  //             const newResponse = await messageApi.getMess(
  //               idConversation,
  //               user.uid,
  //               cPage,
  //               panigation.size + data[0].messages.length
  //             );
  //             if (newResponse) {
  //               setMessages(newResponse.data[0].messages);
  //               setPage(cPage);
  //             }
  //           } else {
  //             setMessages(data[0].messages);
  //             setPage(newPage);
  //           }
  //         }

  //         // //update page current
  //         // setPage(newPage);
  //         setStatusLoadMessage(false);
  //       } catch (error) {
  //         setMessages([]);
  //         setStatusLoadMessage(false);
  //         console.log("Failed to fetch conversation list: ", error);
  //       }
  //     };

  //     featchMessages();
  //   }, [userChatting, idConversation]);

  //scroll to top -> load old message
  //   const handelScroll = (e) => {
  //     let element = e.target;

  //     if (element.scrollTop === 0) {
  //       console.log("current page " + page);
  //       setStatusLoadOldMessage(true);
  //       if (page > 0) {
  //         //lui page ve 1 bac
  //         const newPage = page - 1;
  //         //featch data theo newPage
  //         const featchMessages = async () => {
  //           try {
  //             //cal api get total page
  //             const response = await messageApi.getMess(
  //               idConversation,
  //               user.uid,
  //               newPage,
  //               panigation.size
  //             );
  //             //add data vao messages( truoc nhung tin nhan cu)
  //             const { data, info, friendStatus, size } = response;
  //             setPage(newPage);
  //             setStatusLoadOldMessage(false);
  //             setMessages((prev) => [...data[0].messages, ...prev]);
  //           } catch (error) {
  //             setStatusLoadOldMessage(false);
  //             console.log("Failed to fetch conversation list: ", error);
  //           }
  //         };

  //         featchMessages();
  //       }
  //     }
  //   };

  return (
    <div className="chat_feed">
      {/* <ChatHeader userChatting={userChatting} groupChatting={
        
      } /> */}
      <div
        // data-simplebar
        className="message_content"
        //onScroll={(e) => handelScroll(e)}
      >
        {/* <video
          src="https://chatapp-bucket.s3.ap-southeast-1.amazonaws.com/zale_1666892497792_test.mp4"
          width="300"
          height="200"
          controls="controls"
          autoplay="true"
        /> */}
        {/* <WordsComponent /> */}
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
      {/* <NewMessageForm
        userChatting={userChatting}
        idConversation={idConversation}
        messages={messages}
        setMessages={setMessages}
        socket={socket}
      /> */}
    </div>
  );
};
export default ChatFeedGroup;
