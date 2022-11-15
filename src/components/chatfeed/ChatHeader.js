import "./ChatHeaderStyle.scss";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { BsCameraVideo } from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";
import { FiUserX } from "react-icons/fi";
import friendApi from "../../api/friendApi";

import Context from "../../store/Context";
import { SetShowTabInfo } from "../../store/Actions";
import ModelDetailUser from "../model/ModelDetailUser";
import love from "../../images/love.jpg";
import { format } from "timeago.js";
import useFriendHook from "../../hooks/useFriendHook";

import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import AvatarUserOnline from "../avatar/AvatarUserOnline";

const ChatHeader = ({ userChatting, socket, isFriend }) => {
  //custom hook
  const { featchAddFriend } = useFriendHook();

  const { state, depatch } = React.useContext(Context);
  const [openModelUser, setOpenModelUser] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(false);
  const [lastLogin, setLastLogin] = React.useState("");
  const [reqFriend, setReqFriend] = React.useState(false);

  //detructering...
  const { showTabInfo, idConversation, user, groupChatting } = state;

  const handleShowTabInfo = () => {
    depatch(SetShowTabInfo(!showTabInfo));
  };
  console.log(isFriend);
  const handleShowInfo = (params) => {
    setOpenModelUser(true);
  };

  const handleAddFriend = (params) => {
    console.log("add friend");
    setReqFriend(true);
    featchAddFriend(user.uid, userChatting.uid);
  };

  const handleCancleFriend = (params) => {
    console.log("cancle");
    setReqFriend(false);
  };

  React.useEffect(() => {
    if (idConversation) {
      socket?.current.emit(
        "get-user-online",
        userChatting.uid,
        ({ isOnline, lastLogin }) => {
          setIsOnline(isOnline);
          setLastLogin(lastLogin);
          console.log(userChatting.uid, isOnline, lastLogin);
        }
      );
    }
  }, [idConversation]);

  const paseDate = format(lastLogin, "vi_VN");
  //console.log(paseDate);

  return (
    <div className="chat_header">
      <div className="chat_header-info">
        {/* {userChatting?.avatar ? (
          <React.Fragment>
            <div className="info_block">
              <Avatar
                className="avt"
                src={userChatting?.avatar}
                alt={userChatting?.first_name}
                onClick={() => handleShowInfo()}
                style={{ backgroundColor: "#e7f0ce" }}
              />
              {isOnline ? <div className="statusOnline"></div> : null}
            </div>
          </React.Fragment>
        ) : (
          <div className="info_block">
            <Avatar
              className="avt"
              style={{ textTransform: "capitalize" }}
              src={userChatting?.avatar}
              onClick={() => handleShowInfo()}
            >
              {userChatting?.last_name[0]}
            </Avatar>
            {isFriend ? (
              <React.Fragment>
                {isOnline ? <div className="statusOnline"></div> : null}
              </React.Fragment>
            ) : null}
          </div>
        )} */}

        <AvatarUserOnline
          userChatting={userChatting}
          isOnline={isOnline}
          isFriend={isFriend}
        />

        <div className="info_text">
          <span className="info_name">
            {userChatting?.last_name + " " + userChatting?.first_name}
          </span>
          {/* // <span className="info_online">{isOnline ? "0" : "1"}</span> */}

          {isFriend ? (
            <span className="info_hour">
              {isOnline ? "Vừa truy cập" : "" + paseDate}
            </span>
          ) : (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2px 6px",
                marginTop: "4px",
                borderRadius: "6px",
                backgroundColor: "#abb4bc",
                color: "#fff",
                textTransform: "capitalize",
                fontSize: "10px",
              }}
            >
              Người lạ
            </span>
          )}
        </div>
      </div>
      <ModelDetailUser
        openModelUser={openModelUser}
        setOpenModelUser={setOpenModelUser}
        friend
      />

      <div className="block_icon">
        {isFriend ? null : (
          <span className="icon" title="Add Friend">
            {reqFriend ? (
              <FiUserX onClick={() => handleCancleFriend()} />
            ) : (
              <FiUserPlus onClick={() => handleAddFriend()} />
            )}
          </span>
        )}
        <span className="icon" title="Cuộc gọi video">
          <BsCameraVideo />
        </span>
        <span
          className={showTabInfo ? "icon choise" : "icon"}
          title="Thông tin hội thoại"
          onClick={() => handleShowTabInfo()}
        >
          <BsLayoutSidebarReverse />
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;
