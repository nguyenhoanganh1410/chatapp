import "./MemberCardStyle.scss";
import * as React from "react";
import Contex from "../../store/Context";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDots } from "react-icons/bs";
import conversationApi from "../../api/conversationApi";
import friendApi from "../../api/friendApi";
import { SetListFriend } from "../../store/Actions";
const CardFriend = ({ u }) => {
  const { state, depatch } = React.useContext(Contex);
  

  const { listFriend, user } = state;

  //status is friend
  const [isFriend, setIsFriend] = React.useState(false);

  React.useEffect(() => {
    const featchListMember = async (userId) => {
      try {
        const response = await friendApi.getListFriend(userId);

        //set value global
        depatch(SetListFriend(response));
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    };
    featchListMember(user.uid);
  }, [user]);

  React.useEffect(() => {
    //check isFriend or not
    console.log("userEffect ");
    const newArr = listFriend.map((val) => {
      return val.userId;
    });
    if (newArr.includes(u.uid)) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }
  });

  //xu ly ket ban in here
  const handleSendAddFriend = () => {
    //call api add friend
    //add socket
  };
  return (
    <div
      className="users_member"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "8px",
          cursor: "pointer",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {u?.avaUser ? (
            <Avatar
              className="avatar"
              src={u?.avatar}
              alt={u?.last_name}
              style={{ width: "36px", height: "36px" }}
            />
          ) : (
            <Avatar
              className="avatar"
              style={{
                textTransform: "capitalize",
                width: "36px",
                height: "36px",
              }}
              src={u?.avatar}
            >
              {u?.last_name[0]}
            </Avatar>
          )}
          <div style={{ marginLeft: "8px", textAlign: "start" }}>
            <p
              style={{
                textTransform: "capitalize",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {u?.first_name + " " + u?.last_name}
            </p>
          </div>
        </div>
        {isFriend ? (
          <span>Bạn bè</span>
        ) : (
          <Button
            variant="outlined"
            style={{ fontSize: "12px" }}
            onClick={() => handleSendAddFriend()}
          >
            Kết bạn
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardFriend;
