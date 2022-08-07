import "./ChatFeedStyle.scss";
import ChatHeader from "./ChatHeader";
import NewMessageForm from "./NewMessageForm";

const ChatFeed = () => {
  return (
    <div className="chat_feed">
      <ChatHeader />

      <NewMessageForm />
    </div>
  );
};
export default ChatFeed;
