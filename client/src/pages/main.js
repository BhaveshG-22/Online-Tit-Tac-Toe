import React, { useEffect, useState } from "react";
import ChatUI from "../components/chatUI";

export default function Main(props) {
  const [Messages, setMessages] = useState([
    { id: 1, text: "Hello there!", isUser: true },
    { id: 2, text: "Hi! How can I help you?", isUser: false },
  ]);

  const handleBtn = (input) => {
    const MsgData = {
      Msg: input,
      Room: props.Room,
      randomlyCreated: props.randomlyCreated,
      id: props.Room,
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), text: input, isUser: true },
    ]);

    props.socket.emit("Msg", MsgData);
  };

  useEffect(() => {
    props.socket.on("Msg", (Msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: Msg, isUser: false },
      ]);
    });
  }, [props.socket]);

  return (
    <div className="App">
      <div>
        <ChatUI Messages={Messages} handleBtn={handleBtn} />
      </div>
    </div>
  );
}
