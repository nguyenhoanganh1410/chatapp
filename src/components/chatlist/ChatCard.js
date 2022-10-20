import * as React from "react";
import Avatar from "@mui/material/Avatar";
import avt from "../../images/av.jpg";
import "./ChatCardStyle.scss";
import { BsThreeDots } from "react-icons/bs";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiArrowRightSLine } from "react-icons/ri";
import { SetIdConversation, SetUserChatting } from "../../store/Actions";
import Contex from "../../store/Context";
import UserService from "../../services/UserService";
import { differenceInHours } from "date-fns";
import useDateLogic from "../../hooks/useDateLogic";

const ChatCard = ({ conversation }) => {
  const { state, depatch } = React.useContext(Contex);
  //custom hook
  const { handleDate } = useDateLogic();
  //detructering...
  const { user, userSearched, idConversation, userChatting } = state;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // console.log(conversation);

  const { inFo, conversations } = conversation;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleShowOption = () => {
    alert("updating...");
  };

  //click 1 conversation -> show chat feed
  const handleShowChat = () => {
    //featch user by id
    UserService.getById(inFo.userIdFriend)
      .then(function (snapshot) {
        // const { users } = snapshot.data();
        // console.log(snapshot.data());

        //set state
        depatch(SetUserChatting(snapshot.data()));
        //set id conversation current
        depatch(SetIdConversation(conversations._id));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
  // const result = differenceInHours(
  //   new Date(),
  //   new Date("2022-10-17T14:30:53.856Z".replace("Z", ""))
  // );
  // console.log(result);
  // //=> 12
  //card_chat card_chat_active
  
  return (
    <div
      className={
        userChatting?.uid === inFo?.userIdFriend
          ? "card_chat card_chat_active"
          : "card_chat"
      }
      onClick={() => handleShowChat()}
    >
      <div className="card_group">
        {inFo?.avatar ? (
          <Avatar className="avt" src={inFo?.avatar} alt={inFo?.firstName} />
        ) : (
          <Avatar
            className="avt"
            style={{ textTransform: "capitalize" }}
            src={inFo?.avatar}
          >
            {inFo?.lastName[0]}
          </Avatar>
        )}
        <div className="card_name">
          <h6 className="">{inFo?.firstName + " " + inFo?.lastName}</h6>
          <p>
            <span>
              {conversations.lastMessage[0].userId === user.uid
                ? "Bạn:"
                : `${inFo?.firstName + " " + inFo?.lastName} : `}{" "}
            </span>
            <span className={conversations.numberUnread ? "active" : ""}>
              {conversations.lastMessage[0].content}
            </span>
          </p>
        </div>
      </div>

      <div className="group_right">
        <div className="card_time">
          {handleDate(
            new Date(),
            new Date(
              `${conversations.lastMessage[0].updatedAt}`.toLocaleString(
                "en-US",
                { timeZone: "Asia/Ho_Chi_Minh" }
              )
            )
          )}
        </div>
        {conversations.numberUnread > 0 ? (
          <span className="numberNotification">
            {conversations.numberUnread}
          </span>
        ) : null}
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

export default ChatCard;
