import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { AiOutlineLike, AiOutlineDelete } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FaRegCopy } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdFormatQuote } from "react-icons/md";
import avt from "../../images/av.jpg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import copy from "copy-to-clipboard";

const Message = ({ me, type }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [copyText, setCopyText] = React.useState("");

  const copyToClipboard = () => {
    copy(copyText);
    handleClose();
  };

  return (
    <div
      className="message"
      style={me ? { flexDirection: "row-reverse" } : null}
    >
      <Avatar
        className="avatar"
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
      />
      {type === "image" ? (
        <div className="messImg">
          <img src={avt} alt="image" />
        </div>
      ) : (
        <div className="message_text">
          <p className="textMess">buổi chiều tràn đầy năng lượng nhé ❤️</p>
          <p className="timeMess">13:33</p>
          <div className="icon_list">
            {/* <div className="icons_react">
            <span>
              {" "}
              <AiOutlineLike />
            </span>
            <span>
              <FcLike />
            </span>
          </div> */}
            <span className="icon_react">
              <AiOutlineLike />
            </span>
          </div>
        </div>
      )}

      <div className="option">
        <span
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          title="Thêm"
        >
          <BiDotsHorizontalRounded />
        </span>
        <span title="Trả lời">
          <MdFormatQuote />
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
        <MenuItem onClick={copyToClipboard}>
          <span style={{ fontSize: "16px", marginRight: "6px" }}>
            <FaRegCopy />
          </span>
          Copy tin nhắn
        </MenuItem>
        <Divider />
        {me ? (
          <MenuItem style={{ color: "#E64848" }} onClick={handleClose}>
            <span style={{ fontSize: "16px", marginRight: "6px" }}>
              <IoReloadOutline />
            </span>
            Thu hồi tin nhắn
          </MenuItem>
        ) : null}

        <MenuItem onClick={handleClose}>
          <span style={{ color: "#E64848" }}>
            <span style={{ fontSize: "16px", marginRight: "6px" }}>
              <AiOutlineDelete />
            </span>
            Xóa ở phía tôi
          </span>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Message;
