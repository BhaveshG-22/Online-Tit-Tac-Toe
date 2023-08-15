import React, { useEffect, useState } from "react";
import cryptoRandomString from "crypto-random-string";
import { Loader } from "../components/loader";
import Main from "./main";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:2008/");

export const Home = () => {
  const [showMain, setShowMain] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [chatId, setChatId] = useState("");
  const [inputId, setInputId] = useState("");

  const handelStartChat = () => {
    const RandomChatId = cryptoRandomString({
      length: 10,
      type: "alphanumeric",
    });

    if (
      window.confirm(`Share this ID with the other invitee: ${RandomChatId}`)
    ) {
      setShowLoader(true);

      setTimeout(async () => {
        console.log("in setztimeout");
        const RoomData = {
          id: RandomChatId,
        };
        await socket.emit("SetRoom", RoomData);
        setShowLoader(false);
        setShowMain(true);
      }, 1000);
    } else {
      console.log("clicked cancel");
    }
  };

  useEffect(() => {
    socket.on("InvalidRoom", (Msg) => {
      setShowMain(false);
      alert(Msg.Msg);
      console.log(Msg.Msg);
    });
  }, [socket]);

  return showLoader ? (
    <Loader />
  ) : showMain ? (
    <Main Room={chatId} socket={socket} />
  ) : (
    <div className="border border-4 border-primary p-3 pt-4 rounded">
      <label htmlFor="IdInput">Enter Chat ID: </label>
      <br />
      <input
        className="IdInput"
        onChange={(e) => {
          console.warn(e.target.value);
          setInputId(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setTimeout(async () => {
            await socket.emit("SetRoom", {
              id: inputId,
            });
            setChatId(inputId);
            setShowMain(true);
          }, 1000);
        }}
      >
        @
      </button>
      <div className="d-flex justify-content-center">
        <h2>OR</h2>
      </div>
      <div className="d-flex justify-content-center">
        <button onClick={handelStartChat} style={{ width: "100%" }}>
          Start Chat!
        </button>
      </div>
    </div>
  );
};
