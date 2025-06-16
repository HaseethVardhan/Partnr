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
  const [otheruser, setOtherUser] = useState();
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(true);

  const textareaRef = useRef(null);
  const messageEndRef = useRef(null);

  const userId = searchParams.get("userId");

  useEffect(() => {
    setLoading(true);
    const fetchMessages = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/message/load-conversation`,
        {
          userId
        },{
                headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
        });

        console.log(response)
        setOtherUser(response.data.data.conversation.otherUser)
        const conversation = response.data.data.conversation;
        const user =
          conversation.user1._id !== response.data.data.conversation.otherUser._id
            ? conversation.user1
            : conversation.user2;
        setUser(user);
        setMessages(response.data.data.conversation.chats)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  },[refresh]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/message/new-text`,{
        text,
        userId
      },{
                headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
      });
      console.log(response)
    } catch (error) {
      console.log(error)
    }finally{
      setText('');
      setRefresh(!refresh);
      textareaRef.current.style.height = "auto";
      setLoading(false);
    }
  }

  const formatMessageTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  }

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] overflow-auto">
      {loading && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center backdrop-blur-3xl justify-center z-50">
                <Trefoil
                  size="40"
                  stroke="4"
                  strokeLength="0.15"
                  bgOpacity="0.3"
                  speed="1.4"
                  color="#8b5cf6"
                />
              </div>
            )}
            {error !== null && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 px-10 bg-[#1a1a1a]">
                <p className="text-[#aaaaaa] font-inter font-[500] text-lg">
                  {error}
                </p>
              </div>
            )}
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
                  src={otheruser?.profilePicture}
                />
              </div>
              <div className="px-4">{otheruser?.fullname.firstname.charAt(0).toUpperCase()+otheruser?.fullname.firstname.slice(1).toLowerCase()+" "+otheruser?.fullname.lastname.charAt(0).toUpperCase()+otheruser?.fullname.lastname.slice(1).toLowerCase()}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex-col overflow-y-auto space-y-4">
        {messages.length === 0 &&
              <p className="text-center text-[#aaaaaa] mt-10">No messages yet.</p>
        }
        {messages.map((message) => (
          <div
            key={message._id}
            ref={messageEndRef}
            className={`flex items-end mb-2 px-4 ${message.senderId === otheruser._id ? "justify-start" : "justify-end"}`}
          >
            {message.senderId === otheruser._id && (
              <img
                src={otheruser?.profilePicture}
                alt="profile"
                className="w-8 h-8 rounded-full mr-2 object-cover border border-[#333]"
              />
            )}
            <div className={`max-w-xs md:max-w-md break-words`}>
              <div
                className={`rounded-2xl px-4 py-2 shadow-md ${
                  message.senderId === otheruser._id
                    ? "bg-violet-600 text-white rounded-br-none"
                    : "bg-[#232323] text-[#eaeaea] rounded-bl-none"
                }`}
              >
                <span className="block font-inter text-base">{message.text}</span>
                <span className="block text-xs text-gray-400 text-right mt-1">
                  {formatMessageTime(message.createdAt)}
                </span>
              </div>
            </div>
            {message.senderId === user._id && (
              <img
                src={user?.profilePicture}
                alt="profile"
                className="w-8 h-8 rounded-full ml-2 object-cover border border-[#333]"
              />
            )}
          </div>
        ))}
      </div>
      <div className="p-4 mb-3 w-full">
        <form
          onSubmit={(e) => {submitHandler(e)}}
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
