import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
import MessageForm from "./MessageForm";
import axios from "axios";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;
  const chat = chats && chats[activeChat];
  const update = async(user,lastRead) => {
    const authObject = {
      "Project-ID": "e2bf8d12-ca42-46a0-8f6c-082f54c144e0",
      "User-Name": localStorage.getItem('username'),
      "User-Secret": localStorage.getItem('password'),
    };
    try{
        await axios({method: 'patch',url: `https://api.chatengine.io/chats/${chat.id}/people/`, headers: authObject,data:{'last_read': lastRead}});
    }catch(err){
      console.log(err);
    }
  }
  const renderReadReceipts = (message, isMyMessage) => {
    return chat.people.map((person, index) => {
      if (person.person.username === userName && person.last_read !== chat.last_message.id) {
            update(person.person.username,chat.last_message.id);
      }
      return (
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              backgroundImage: "url(" + person?.person?.avatar + ")",
              float: isMyMessage ? "right" : "left",
            }}
          />
        )
      );
    });
  };
  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;
      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <MyMessage message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
              />
            )}
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };
  if (!chat) return "Loading ... ";
  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: "100px" }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
