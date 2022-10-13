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

const HomePage = () => {
  const { state, depatch } = React.useContext(Contex);

  //detructering...
  const { userChatting, showAlert, user, showTabInfo, indexTab } = state;

  // It is a hook imported from 'react-i18next'
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("homepage");
  }, []);
  return (
    <React.Fragment>
      <TabBarComponent />
      <ChatList />
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
    </React.Fragment>
  );
};

export default HomePage;
