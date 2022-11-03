import * as React from "react";
import "./TabInfomation.scss";
import Avatar from "@mui/material/Avatar";
import { AiOutlineBell } from "react-icons/ai";
import { MdGroupAdd } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";
import { IoExitOutline } from "react-icons/io5";
import { AiOutlineDeleteColumn } from "react-icons/ai";

import { TiAttachmentOutline } from "react-icons/ti";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import love from "../../images/love.jpg";
import Contex from "../../store/Context";
import { useContext } from "react";
import conversationApi from "../../api/conversationApi";
import messageApi from "../../api/messageApi";
import { useState } from "react";
import WordsComponent from "../filecomponent/WordsComponent";
import {
  SetGroupChatting,
  SetIdConversation,
} from "../../store/Actions";

import MemberCard from "../card/MemberCard";

const TabInfomation = ({socket}) => {
  const { state, depatch } = useContext(Contex);
  const [listImage, setListImage] = useState([]);
  const [files, setFiles] = useState([]);
  const [members, setMembers] = useState([]);
  const [leaderId, setLeaderId] = useState("");
  
  //detructering...
  const { userChatting, groupChatting, user, idConversation, idLeaderGroup } =
    state;

  React.useEffect(() => {
    //get list image in the conversation
    const featchFile = async (idConversation, type) => {
      try {
        const response = await messageApi.getMessWithType(idConversation, type);
        if (type === "IMAGE") {
          setListImage(response);
        } else if (type === "APPLICATION") {
          setFiles(response);
        }
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    };

    featchFile(idConversation, "IMAGE");
    featchFile(idConversation, "APPLICATION");

  }, [idConversation]);

  React.useEffect(() => {
    const featchListMember = async (idConversation) => {
      try {
        const response = await conversationApi.getListMember(idConversation);
        setMembers(response.members);
        setLeaderId(response.leaderId);
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    };
    featchListMember(idConversation);
  }, [idConversation]);

  React.useEffect(() => {
    if(socket.current){
      socket.current.on("notifi-kickUser",(data)=>{
        if(data){
          console.log("kick");
          const featchListMember = async (idConversation) => {
            try {
              const response = await conversationApi.getListMember(idConversation);
              setMembers(response.members);
            } catch (error) {
              console.log("Failed to fetch conversation list: ", error);
            }
          };
          featchListMember(idConversation);
        }
      });
    }
    
  }, [idConversation]);

  const handleLeaveGroup = async () => {
    try {
      const response = await conversationApi.leaveGroup(idConversation, user.uid);
      if (response) {
        console.log("leave");
        depatch(SetGroupChatting(null));
        depatch(SetIdConversation(null));

        if(socket.current){
          socket.current.emit("kickUser",{
            idConversation:idConversation,
            // idLeader:user.uid,
            idUserKick:user.uid
          });
        }

      }
    } catch (error) {
      console.log("Failed to fetch conversation list: ", error);
    }
  };

  const handleDeleteAllMess = async () => {
    try {
      const response = await conversationApi.deleteAllMess(idConversation,user.uid);
      if (response) {
        console.log("delete");
        //render list mess

      }
    } catch (error) {
      console.log("Failed to fetch conversation list: ", error);
    }
  }

  const handleDeleteGroup = async () => {
    try {
      const response = await conversationApi.deleteGroup(idConversation);
      if (response) {
        console.log("delete");
        depatch(SetGroupChatting(null));
        depatch(SetIdConversation(null));

        if(socket.current){
          socket.current.emit("kickUser",{
            idConversation:idConversation,
            // idLeader:user.uid,
            // idUserKick:user.uid
          });
        }
      }
    } catch (error) {
      console.log("Failed to fetch conversation list: ", error);
    }
  }


  return (
    <div data-simplebar className="tab_infomation">
      <div>
        <div className="tab_info-header">
          <p>Thông tin hội thoại</p>
        </div>
        <div className="tab_info-content">
          <div className="content_top">
            {userChatting?.avatar ? (
              <Avatar
                className="avatarCustom"
                src={userChatting?.avatar}
                alt={userChatting?.first_name}
              />
            ) : (
              <Avatar
                className="avatarCustom"
                style={{ textTransform: "capitalize" }}
                src={userChatting?.avatar}
              >
                {userChatting?.last_name[0]}
              </Avatar>
            )}

            {groupChatting ? (
              <p style={{ textTransform: "capitalize" }}>
                {groupChatting.name}
              </p>
            ) : (
              <p style={{ textTransform: "capitalize" }}>
                {userChatting?.last_name + " " + userChatting?.first_name}
              </p>
            )}
          </div>
          <div className="content_icons">
            <div className="block_icon">
              <span>
                <AiOutlineBell />
              </span>
              <p>Tắt thông báo</p>
            </div>
            <div className="block_icon">
              <span>
                <TiAttachmentOutline />
              </span>
              <p>Ghim hội thoại</p>
            </div>
            {groupChatting ? (
              <div className="block_icon">
                <span>
                  <MdGroupAdd />
                </span>
                <p>Thêm thành viên</p>
              </div>
            ) : (
              <div className="block_icon">
                <span>
                  <MdGroupAdd />
                </span>
                <p>Tạo nhóm trò chuyện</p>
              </div>
            )}
          </div>
        </div>
        <div className="divide"></div>
        {groupChatting ? (
          <React.Fragment>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  Thành viên nhóm ({members.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {members.map((u, idx) => {
                  return <MemberCard u={u} socket={socket} />;
                })}
              </AccordionDetails>
            </Accordion>
            <div className="divide"></div>
          </React.Fragment>
        ) : null}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Ảnh/ Video</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p
              style={{
                fontWeight: "500",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            >
              ngay 30 thang 10
            </p>
            <ImageList
              sx={{ width: "auto", height: 450 }}
              cols={3}
              rowHeight={150}
              className="imageList"
            >
              {listImage.map((item) => (
                <ImageListItem key={item.content}>
                  <img
                    src={`${item.content}?w=150&h=150&fit=crop&auto=format`}
                    srcSet={`${item.content}?w=150&h=150&fit=crop&auto=format&dpr=2 2x`}
                    alt="erro"
                    loading="lazy"
                    style={{ cursor: "pointer", borderRadius: "6px" }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </AccordionDetails>
        </Accordion>
        <div className="divide"></div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>File</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p
              style={{
                fontWeight: "500",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            >
              ngay 30 thang 10
            </p>
            <ImageList
              sx={{ width: "auto", height: 700 }}
              cols={1}
              rowHeight={150}
            >
              {files.map((item) => (
                <ImageListItem key={item.content}>
                  <WordsComponent mess={item} />
                </ImageListItem>
              ))}
            </ImageList>
          </AccordionDetails>
        </Accordion>
        <div className="divide"></div>
      </div>
      <div className="tab_info-footer">
      
      <div className="deleteChat" onClick={handleDeleteAllMess}>
        <span>
          <RiDeleteBin3Line />
        </span>
        <p>Xóa lịch xử trò chuyện</p>
      </div>
      <div className="leaveChat" onClick={handleLeaveGroup}>
        <span>
          <IoExitOutline />
        </span>
        <p>Rời Nhóm</p>
      </div>
                
      {/* <div className="deleteGroup" onClick={handleDeleteGroup}>
        <span>
          <AiOutlineDeleteColumn />
        </span>
        <p>Giả tán Nhóm</p>
      </div> */}
      {user.uid === leaderId ? (
        <div className="deleteGroup" onClick={handleDeleteGroup}>
        <span>
          <AiOutlineDeleteColumn />
        </span>
        <p>Giả tán Nhóm</p>
      </div>
      ) : null}
      </div>

    </div>
  );
};

export default TabInfomation;
