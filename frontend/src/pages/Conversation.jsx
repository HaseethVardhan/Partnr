import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const Conversation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const textareaRef = useRef(null);

  const userId = searchParams.get("userId");

  useEffect(() => {
    const fetchMessages = async () => {};
    fetchMessages();
  });

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] overflow-auto">
      <div className="flex flex-row items-center justify-between px-4 py-10">
        <div className="flex flex-row items-center gap-3">
          <img
            onClick={() => navigate(-1)}
            className="h-5 w-6 object-contain"
            src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748781336/Vector_5_labewm.png"
          />
          <div className="font-poppins font-[500] text-2xl  text-white">
            <div
              onClick={() => {
                navigate(`/user-profile?userId=${userId}`);
              }}
              className="flex flex-row items-center"
            >
              <div className="flex flex-row items-center justify-start">
                <img
                  className="h-11 w-11 rounded-full object-cover"
                  src="https://www.zmo.ai/wp-content/uploads/2024/03/Activity-options-for-AI-face-generator.webp"
                />
              </div>
              <div className="px-4">Adrian</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === user._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === user._id
                      ? authUser.profilePic || "/avatar.png"
                      : userId.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 w-full">
        <form
          onSubmit={() => {}}
          className="flex items-center gap-2 min-h-10 border-1 border-[#aaaaaa] rounded-xl px-2 py-2"
        >
          <div className="flex-1 flex gap-2">
            <textarea
              ref={textareaRef}
              className="w-full text-white rounded-lg focus:outline-none resize-none overflow-hidden font-inter max-h-[150px]"
              placeholder="Type a message..."
              rows={1}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (textareaRef.current) {
                  textareaRef.current.style.height = "auto";
                  textareaRef.current.style.height =
                    textareaRef.current.scrollHeight + "px";
                }
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-sm btn-circle"
            disabled={!text.trim()}
          >
            <img
              className="w-5 h-5 brightness-0 invert-100"
              src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1749994052/send-fept9s28oheau3ys9l4ce_xroh8n.webp"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Conversation;
