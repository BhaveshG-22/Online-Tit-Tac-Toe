import React, { useState, useEffect, useRef } from "react";
import "./ChatUI.css"; // Your custom CSS file for any additional styling

// const ChatUI = (props) => {
//   const [MSGinput, setMSGInput] = useState("");
//   const [messages, setMessages] = useState([]);

//   // Update messages when props.Messages changes
//   useEffect(() => {
//     setMessages(props.Messages);
//   }, [props.Messages]);

//   const sendMessage = () => {
//     if (MSGinput.trim() === "") return; // Prevent sending empty messages

//     const newMessage = { id: Date.now(), text: MSGinput, isUser: true };

//     // Logic to send the message via socket (you can implement this)
//     // Example: props.socket.emit("sendMessage", newMessage);

//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setMSGInput(""); // Clear the input field after sending
//   };

//   console.log(messages);
//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <h2>Chat App</h2>
//       </div>
//       <div className="chat-messages">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`message ${
//               message.isUser ? "user-message" : "other-message"
//             }`}
//           >
//             <p>{message.text}</p>
//           </div>
//         ))}
//       </div>
//       <div className="message-input">
//         <input
//           type="text"
//           value={MSGinput}
//           onChange={(e) => setMSGInput(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={() => {
//             sendMessage();
//             props.handleBtn(MSGinput);
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// const ChatUI = (props) => {
//   const [MSGinput, setMSGInput] = useState("");

//   const sendMessage = () => {
//     if (MSGinput.trim() === "") return; // Prevent sending empty messages

//     props.handleBtn(MSGinput);
//     setMSGInput(""); // Clear the input field after sending
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <h2>Chat App</h2>
//       </div>
//       <div className="chat-messages">
//         {props.Messages.map(
//           (
//             message // Use props.Messages here
//           ) => (
//             <div
//               key={message.id}
//               className={`message ${
//                 message.isUser ? "user-message" : "other-message"
//               }`}
//             >
//               <p>{message.text}</p>
//             </div>
//           )
//         )}
//       </div>
//       <div className="message-input">
//         <input
//           type="text"
//           value={MSGinput}
//           onChange={(e) => setMSGInput(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={() => {
//             // sendMessage();
//             if (MSGinput.trim() === "") return;
//             props.handleBtn(MSGinput);
//             setMSGInput("");
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// const ChatUI = (props) => {
//   const [MSGinput, setMSGInput] = useState("");

//   const sendMessage = () => {
//     if (MSGinput.trim() === "") return; // Prevent sending empty messages

//     props.handleBtn(MSGinput);
//     setMSGInput(""); // Clear the input field after sending
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <h2>Chat App</h2>
//       </div>
//       <div className="chat-messages">
//         {props.Messages.map((message) => (
//           <div
//             key={message.id}
//             className={`message ${
//               message.isUser ? "user-message" : "other-message"
//             }`}
//           >
//             <p>{message.text}</p>
//           </div>
//         ))}
//       </div>
//       <div className="message-input">
//         <input
//           type="text"
//           value={MSGinput}
//           onChange={(e) => setMSGInput(e.target.value)}
//           onKeyDown={handleKeyPress} // Handle key press event
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={() => {
//             sendMessage();
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }; // works fine except scroll bottom

const ChatUI = (props) => {
  const [MSGinput, setMSGInput] = useState("");
  const chatMessagesRef = useRef(null); // Create a ref for chat messages container

  const sendMessage = () => {
    if (MSGinput.trim() === "") return; // Prevent sending empty messages

    props.handleBtn(MSGinput);
    setMSGInput(""); // Clear the input field after sending
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat messages container
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [props.Messages]); // Scroll when Messages array updates

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat App</h2>
      </div>
      <div className="chat-messages" ref={chatMessagesRef}>
        {props.Messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.isUser ? "user-message" : "other-message"
            }`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={MSGinput}
          onChange={(e) => setMSGInput(e.target.value)}
          onKeyDown={handleKeyPress} // Handle key press event
          placeholder="Type your message..."
        />
        <button
          onClick={() => {
            sendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatUI;
