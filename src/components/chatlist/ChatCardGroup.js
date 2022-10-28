import * as React from "react";
import Avatar from "@mui/material/Avatar";
import avt from "../../images/av.jpg";
import "./ChatCardStyle.scss";
import { BsThreeDots } from "react-icons/bs";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiArrowRightSLine } from "react-icons/ri";
import AvatarGroup from "@mui/material/AvatarGroup";
import { SetGroupChatting, SetUserChatting } from "../../store/Actions";
import Contex from "../../store/Context";
const ChatCardGroup = ({ status }) => {
  const { state, depatch } = React.useContext(Contex);
  const { groupChatting, userChatting, user } = state;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleShowOption = () => {
    alert("updating...");
  };

  const handleGroupChat = () => {
    //delete user chatting
    depatch(SetUserChatting(null));
    depatch(SetGroupChatting("group"));
  };
  return (
    <div className="card_chat" onClick={() => handleGroupChat()}>
      <div className="card_group">
        {/* <div className="group_avatar">
          <Avatar className="avt group_avatar" alt="Remy Sharp" src={avt} />
          <Avatar className="avt group_avatar" alt="Remy Sharp" src={avt} />
          <Avatar className="avt group_avatar" alt="Remy Sharp" src={avt} />
          <Avatar className="avt" alt="4" />
        </div> */}

        <AvatarGroup max={4} className="group_avatar">
          <div>
            <Avatar className="avt avatar_item" alt="Remy Sharp" src={avt} />
            <Avatar className="avt avatar_item" alt="Remy Sharp" src={avt} />
          </div>
          <AvatarGroup max={2}>
            <Avatar className="avt avatar_item" alt="Remy Sharp" src={avt} />
            <Avatar className="avt avatar_item" alt="Remy Sharp" src={avt} />
            <Avatar className="avt avatar_item" alt="Remy Sharp" src={avt} />
          </AvatarGroup>
        </AvatarGroup>

        <div className="card_name">
          <h6 className="">Cong nghe moi</h6>
          <p>
            <span>Bạn: </span>
            <span className={status ? "active" : ""}>8 hahha</span>
          </p>
        </div>
      </div>

      <div className="group_right">
        <div className="card_time">31 phút</div>
        {status ? <span className="numberNotification">2</span> : null}
        <span
          className="threeDot"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <BsThreeDots />
        </span>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          style={{ display: "flex", justifyContent: "space-between" }}
          onClick={handleClose}
        >
          Phân loại <RiArrowRightSLine />
        </MenuItem>
        <MenuItem onClick={handleClose}>Thêm vào nhóm</MenuItem>
        <MenuItem onClick={handleClose}>Ẩn trò chuyện</MenuItem>
        <Divider />
        <MenuItem style={{ color: "#E64848" }} onClick={handleClose}>
          Xóa hội thoại
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ChatCardGroup;
