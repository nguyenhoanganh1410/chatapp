import * as React from "react";
import "./TabInfomation.scss";
import Avatar from "@mui/material/Avatar";
import { AiOutlineBell } from 'react-icons/ai';
import { MdGroupAdd } from 'react-icons/md';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { TiAttachmentOutline } from 'react-icons/ti';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const TabInfomation = () => {
  return (
    <div className="tab_infomation">
      <div>
      <div className="tab_info-header">
        <p>Thông tin hội thoại</p>
      </div>
      <div className="tab_info-content">
        <div className="content_top">
          <Avatar className="avatarCustom" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <p>Anh nguyen</p>
        </div>
        <div className="content_icons">
          <div className="block_icon">
            <span><AiOutlineBell /></span>
            <p>Tắt thông báo</p>
          </div>
          <div className="block_icon">
            <span><TiAttachmentOutline /></span>
            <p>Ghim hội thoại</p>
          </div>
          <div className="block_icon">
            <span><MdGroupAdd /></span>
            <p>Tạo nhóm trò chuyện</p>
          </div>
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
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
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
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <div className="divide"></div>
      </div>
      <div className="deleteChat">
        <span><RiDeleteBin3Line /></span>
        <p>Xóa lịch xử trò chuyện</p>
      </div>
    </div>
  );
};

export default TabInfomation;
