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

import { iconsTouch } from "../../data/Data";
import Contex from "../../store/Context";
import messageApi from "../../api/messageApi";
import { useState } from "react";
import { SetIdMessageDeletedWithMe } from "../../store/Actions";
import WordsComponent from "../filecomponent/WordsComponent";
import useCheckFile from "../../hooks/useCheckFile";

//status : 0 binh thuong, 1 thu hoi, 2 bi xoa
const Message = ({ isLastMessage, status, mess, socket }) => {
  const { state, depatch } = React.useContext(Contex);
  //detructering...
  const { userChatting, idConversation, user, statusMessage } = state;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [showIcons, setShowIcons] = React.useState(false);

  const [me, setMe] = React.useState(false);

  const { checkUrlIsDocx } = useCheckFile();

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

  React.useEffect(() => {
    if (user.uid === mess.userId) {
      setMe(true);
    } else {
      setMe(false);
    }

    //if user.id co trong mang deletedByUserIds -> khong render this message
    // if(mess.deletedByUserIds.includes(user.uid)){
    //   setDeleted(true)
    // }
  }, []);

  //click hide/show list icon
  const handleToggle = () => {
    setShowIcons(!showIcons);
  };
  //console.log("id meesss --->" + mess._id);
  const handleReMessage = () => {
    handleClose();
    // console.log("id meesss --->" + mess._id);
    //call api thu hoi tin nhan
    const reMessage = async () => {
      try {
        const response = await messageApi.reMess(mess._id);
        console.log("thu hoi id meesss --->" + mess._id);
        socket.current.emit("reMessage", {
          idMessage: mess._id,
          idCon: idConversation,
        });

        //

        // const { data, info, friendStatus, size, totalPages } = response;
        // //console.log(response);

        // if (response) {
        //   setMessages(data[0].messages);
        // }
        // setStatusLoadMessage(false)
      } catch (error) {
        console.log("Failed to remove message: ", error);
      }
    };

    reMessage();
  };

  const deleteMessageWithMe = () => {
    handleClose();
    const deleteMess = async () => {
      try {
        console.log("delete with me id meesss --->" + mess._id);
        depatch(SetIdMessageDeletedWithMe(mess._id));
        const response = await messageApi.deleteMessage(mess._id, user.uid);
      } catch (error) {
        console.log("Failed to remove message: ", error);
      }
    };

    deleteMess();
  };

  return (
    <>
      {!mess?.deletedByUserIds?.includes(user.uid) ? (
        <>
          <div
            className="message"
            style={me ? { flexDirection: "row-reverse" } : null}
          >
            {me ? (
              <React.Fragment>
                {user?.avatar ? (
                  <Avatar
                    className="avatar"
                    src={user?.avatar}
                    alt={user?.first_name}
                  />
                ) : (
                  <Avatar
                    className="avatar"
                    style={{ textTransform: "capitalize" }}
                    src={user?.avatar}
                  >
                    {user?.last_name[0]}
                  </Avatar>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {userChatting?.avatar ? (
                  <Avatar
                    className="avatar"
                    src={userChatting?.avatar}
                    alt={userChatting?.first_name}
                  />
                ) : (
                  <Avatar
                    className="avatar"
                    style={{ textTransform: "capitalize" }}
                    src={userChatting?.avatar}
                  >
                    {userChatting?.last_name[0]}
                  </Avatar>
                )}
              </React.Fragment>
            )}
            {mess.isDeleted ? (
              <div
                className="massage_text"
                style={me ? { backgroundColor: "#e5efff" } : {}}
              >
                <p className="textMess" style={{ color: "#abb4bc" }}>
                  Tin nhắn đã được thu hồi
                </p>
                <p className="timeMess">
                  {" "}
                  {new Date(mess.createdAt)
                    .toLocaleString("en-US", {
                      timeZone: "Asia/Ho_Chi_Minh",
                    })
                    .slice(11, 23)}
                </p>
              </div>
            ) : (
              <>
                {mess.type === "IMAGE" ? (
                  <div className="messImg">
                    <img src={mess.content} alt="image" />
                  </div>
                ) : (
                  <div
                    className={
                      mess.content.includes("https://img.stipop.io")
                        ? "message_text bg-trans"
                        : `${
                            mess.type === "APPLICATION"
                              ? "message_text cssFileDocx"
                              : "message_text"
                          }`
                      // <>
                      //   {mess.type === "APPLICATION"
                      //     ? "message_text cssFileDocx"
                      //     : "message_text"}
                      // </>
                    }
                    style={me ? { backgroundColor: "#e5efff" } : {}}
                  >
                    {mess.content.includes("https://img.stipop.io") ? (
                      <div className="messSticker">
                        <img src={mess.content} alt="image" />
                        <p className="timeMessSticker">
                          {new Date(mess.createdAt)
                            .toLocaleString("en-US", {
                              timeZone: "Asia/Ho_Chi_Minh",
                            })
                            .slice(11, 23)}
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* <p className="textMess">{mess.content}</p> */}

                        {mess.type === "APPLICATION" ? (
                          <WordsComponent mess={mess} />
                        ) : (
                          <p className="textMess">{mess.content}</p>
                        )}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="timeMess">
                            {new Date(mess.createdAt)
                              .toLocaleString("en-US", {
                                timeZone: "Asia/Ho_Chi_Minh",
                              })
                              .slice(11, 23)}
                          </p>
                          {isLastMessage && mess?.userId === user?.uid ? (
                            <p
                              style={{
                                fontSize: "12px",
                                textTransform: "capitalize",
                                marginLeft: "8px",
                              }}
                              className="timeMess"
                            >
                              {statusMessage}
                            </p>
                          ) : null}
                        </div>
                        <div className="icon_list">
                          {showIcons ? (
                            <div
                              className="icons_react"
                              style={me ? { right: "50%" } : { left: "50%" }}
                            >
                              {iconsTouch.map((icon) => {
                                return (
                                  <img
                                    key={icon.id}
                                    src={icon.url}
                                    alt="icon.name"
                                    className="icon_face"
                                  />
                                );
                              })}
                            </div>
                          ) : null}

                          <span
                            className="icon_react"
                            style={!me ? { right: "20px" } : {}}
                            onClick={() => handleToggle()}
                          >
                            <AiOutlineLike />
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
            {status === 1 ? null : (
              <>
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
                    <MenuItem
                      style={{ color: "#E64848" }}
                      onClick={() => handleReMessage()}
                    >
                      <span style={{ fontSize: "16px", marginRight: "6px" }}>
                        <IoReloadOutline />
                      </span>
                      Thu hồi tin nhắn
                    </MenuItem>
                  ) : null}

                  <MenuItem onClick={() => deleteMessageWithMe()}>
                    <span style={{ color: "#E64848" }}>
                      <span style={{ fontSize: "16px", marginRight: "6px" }}>
                        <AiOutlineDelete />
                      </span>
                      Xóa ở phía tôi
                    </span>
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        </>
      ) : null}{" "}
    </>
  );
};

export default Message;
