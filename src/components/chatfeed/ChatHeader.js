import "./ChatHeaderStyle.scss";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { BsCameraVideo } from "react-icons/bs";
import Context from "../../store/Context";
import { SetShowTabInfo } from "../../store/Actions";
import ModelDetailUser from "../model/ModelDetailUser";
const ChatHeader = () => {
  const { state, depatch } = React.useContext(Context);
  const [openModelUser, setOpenModelUser] = React.useState(false);

  //detructering...
  const { showTabInfo } = state;

  const handleShowTabInfo = () => {
    depatch(SetShowTabInfo(!showTabInfo));
  };

  const handleShowInfo = (params) => {
    setOpenModelUser(true);
  };
  return (
    <div className="chat_header">
      <div className="chat_header-info">
        <Avatar
          className="avt"
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          onClick={() => handleShowInfo()}
        />
        <div className="info_text">
          <span className="info_name">anh nguyen</span>
          <span className="info_hour">truy cập 1 giờ trước</span>
        </div>
      </div>
      <ModelDetailUser
        openModelUser={openModelUser}
        setOpenModelUser={setOpenModelUser}
        friend
      />

      <div className="block_icon">
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
