import * as React from "react";
import "./TabInfomation.scss";
import Avatar from "@mui/material/Avatar";
import { AiOutlineBell } from "react-icons/ai";
import { MdGroupAdd } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";
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
const TabInfomation = () => {
  const { state, depatch } = useContext(Contex);
  const [listImage, setListImage] = useState([]);
  const [files, setFiles] = useState([]);
  console.log(files);
  //detructering...
  const { userChatting, groupChatting, idConversation } = state;

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
      <div className="deleteChat">
        <span>
          <RiDeleteBin3Line />
        </span>
        <p>Xóa lịch xử trò chuyện</p>
      </div>
    </div>
  );
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];
export default TabInfomation;
