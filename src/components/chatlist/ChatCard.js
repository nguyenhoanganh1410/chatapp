import * as React from "react";
import Avatar from "@mui/material/Avatar";
import avt from "../../images/av.jpg";
import "./ChatCardStyle.scss";
const ChatCard = () => {
  return (
    <div className="card_chat">
      <div className="card_group">
        <Avatar className="avt" alt="Remy Sharp" src={avt} />
        <div className="card_name">
          <h6>Nguyen Hoang Anh</h6>
          <p>
            <span>Bạn: </span>
            <span>8 hahha</span>
          </p>
        </div>
      </div>
      <div className="card_time">31 phút</div>
    </div>
  );
};

export default ChatCard;
