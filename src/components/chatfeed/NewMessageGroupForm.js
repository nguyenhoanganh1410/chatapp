import "./NewMessageForm.scss";
import { MdInsertEmoticon } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { GrImage } from "react-icons/gr";
import { useState, useRef } from "react";
import { SearchComponent } from "stipop-react-sdk";
import Context from "../../store/Context";
import { useContext, useEffect } from "react";
import messageApi from "../../api/messageApi";
// import {socket} from '../../store/socketClient';
import addNotification from "react-push-notification";
import io from "socket.io-client";
import conversationApi from "../../api/conversationApi";
// import {init} from '../../store/socketClient';
import { SetIdConversation, SetMessageSent } from "../../store/Actions";

const NewMessageGroupForm = ({
  userChatting,
  idConversation,
  messages,
  setMessages,
  socket,
}) => {
  // const [socket,setSocket] = useState(null);
  const [showStickers, setShowStickers] = useState(false);
  const [focusInput, setFocusInput] = useState(false);
  const { state, depatch } = useContext(Context);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMess, setArrivalMess] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [newMessageSticker, setNewMessageSticker] = useState("");

  const { user, messageSent } = state;
  const inputChooseIMG = useRef();
  //detructering...
  console.log({ user });

  const divMessage = useRef();
  const handleFocus = (params) => {
    divMessage.current.classList.add("booderTop");
  };
  const handleBlur = (params) => {
    divMessage.current.classList.remove("booderTop");
  };

  const handleShowStickers = () => {
    setShowStickers(!showStickers);
  };

  return (
    <div className="new_message" ref={divMessage}>
      <form>
        <input
          onFocus={() => handleFocus()}
          onBlur={(e) => handleBlur(e)}
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          type="text"
          placeholder={"Nhập @, để nhắn tới ..."}
        />
        <span style={{ color: "#333", fontSize: "20px" }} title="Gửi hình ảnh">
          <input
            type="file"
            ref={inputChooseIMG}
            hidden
            //  onChange={changeHandler}
          ></input>
          <GrImage />
          {/* <button onClick={submitFile}>Submit</button> */}
        </span>
        {/* <input type="file" onChange={changeHandler} /> */}

        <span
          style={{ color: "#333" }}
          title="Biểu cảm"
          onClick={() => handleShowStickers()}
          className={showStickers ? "choise" : ""}
        >
          <MdInsertEmoticon />
        </span>
        <span title="Gửi nhanh cảm xúc">
          <FcLike />
        </span>
      </form>
      {showStickers ? (
        <SearchComponent
          className="searchIcons"
          params={{
            apikey: "110a13915f6cb9503c563964f58cee2d",
            userId: user?.uid || Math.random(),
          }}
          //   stickerClick={(url) => handleSendSticker(url)}
        />
      ) : null}
    </div>
  );
};

export default NewMessageGroupForm;
