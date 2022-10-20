import React, { useEffect } from "react";
import ChatFeed from "../components/chatfeed/ChatFeed";
import ChatList from "../components/chatlist/ChatList";
import TabBarComponent from "../components/TabBarComponent";
import ModelUpdateUser from "../components/model/ModelUpdateUser";
import { useTranslation } from "react-i18next";
import Alert from "@mui/material/Alert";
import Contex from "../store/Context";
import TabInfomation from "../components/chatfeed/TabInfomation";
import ListRequestComponent from "../components/friend/ListRequestComponent";
import HomeComponent from "../components/Home/HomeComponent";
import ModelShowListImage from "../components/model/ModelShowListImage";
import {io} from 'socket.io-client';


const socket = io("https://13.228.206.211", {
  transports: ["websocket"]
});
const HomePage = () => {
  //width, height of current screen
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  console.log(dimensions);
  const { state, depatch } = React.useContext(Contex);

  //detructering...
  const { userChatting, showAlert, user, showTabInfo, indexTab } = state;


  // It is a hook imported from 'react-i18next'
  const { t } = useTranslation();


  if(user!=null) {
    console.log("user",user);
    socket.emit('start',user );
    
  }


  // useEffect(() => {
  //   document.title = t("homepage");
  // }, []);
  // React.useEffect(() => {
  //   function handleResize() {
  //     setDimensions({
  //       height: window.innerHeight,
  //       width: window.innerWidth,
  //     });
  //   }
  //   window.addEventListener("resize", handleResize);
  // }, [dimensions]);
  return (
    <React.Fragment>
      <TabBarComponent />
      {dimensions.width < 800 ? null : <ChatList />}
      {indexTab === 0 ? (
        <React.Fragment>
          {userChatting ? (
            <div
              style={
                showTabInfo
                  ? {
                      display: "grid",
                      gridTemplateColumns: "1.95fr 1.05fr",
                      flexGrow: "1",
                    }
                  : {
                      display: "grid",

                      flexGrow: "1",
                    }
              }
              className="chat_main"
            >
              <ChatFeed />
              {showTabInfo ? <TabInfomation /> : null}
            </div>
          ) : (
            <HomeComponent />
          )}
        </React.Fragment>
      ) : (
        <ListRequestComponent />
      )}

      <ModelUpdateUser />
      {showAlert && (
        <Alert
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            backgroundColor: "rgba(0,0,0,0.7)",
            transform: "translate(-50%, -50%)",
            color: "white",
          }}
          severity="success"
        >
          Cập nhật thông tin thành công.
        </Alert>
      )}
      {/* <ModelShowListImage /> */}
    </React.Fragment>
  );
};

export default HomePage;
