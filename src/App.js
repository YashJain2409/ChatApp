import { ChatEngine } from "react-chat-engine";
import "./App.css";
import  ChatFeed  from './components/ChatFeed';

const App = () => {
    return <ChatEngine 
        height="100vh"
        projectID="e2bf8d12-ca42-46a0-8f6c-082f54c144e0"
        userName="yashsj24"
        userSecret="123123"
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
    />
}

export default App;