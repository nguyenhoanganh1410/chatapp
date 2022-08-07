import React from "react";
import ChatFeed from "../components/chatfeed/ChatFeed";
import ChatList from "../components/chatlist/ChatList";
import TabBarComponent from "../components/TabBarComponent";
import ModelUpdateUser from "../components/model/ModelUpdateUser";
const HomePage = () => {
  return (
    <React.Fragment>
      <TabBarComponent />
      <ChatList />
      <ChatFeed />

      <ModelUpdateUser />
    </React.Fragment>
  );
};

export default HomePage;
