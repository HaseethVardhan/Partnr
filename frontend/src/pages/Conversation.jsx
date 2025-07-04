import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const Conversation = () => {
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get("conversationId");
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [otherUser, setOtherUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState({});
  const [replyTo, setReplyTo] = useState(null);

  const textareaRef = useRef(null);
  const messageEndRef = useRef(null);
  const containerRef = useRef(null);
  const prevScrollHeight = useRef(0);

  const fetchConversationMeta = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/message/conversation-meta/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setOtherUser(res.data.data.otherUser);
      setCurrentUser(res.data.data.currentUser);
      setConnected(res.data.data.connected);
    } catch (err) {
      console.error("Meta fetch failed", err);
    }
  };

  const fetchMessages = async () => {
    if (!hasMore || loading) return;
    setLoading(true);

    const container = containerRef.current;
    setIsPaginating(true);
    prevScrollHeight.current = container.scrollHeight;

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/message/load-conversation/${conversationId}?page=${page}&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const newMessages = response.data.data;
      setMessages((prev) => [...newMessages, ...prev]);
      if (newMessages.length < 20) setHasMore(false);
      else setPage((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    // setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/message/new-text`,
        {
          text,
          conversationId,
          receiverId: otherUser._id,
          replyTo: replyTo?._id || null,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const savedMessage = response.data.data;

      setText("");
      setReplyTo(null);
      textareaRef.current.style.height = "auto";
      
      if (socket) {
        socket.emit("send_message", {
          ...savedMessage,
          // clientSentAt: Date.now(),
        });
      }
      // setMessages((prev) => [...prev, savedMessage]);

    } catch (err) {
      console.error(err);
    } finally {
      // setTimeout(() => {
      //   messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      // }, 0);
      // setLoading(false);
    }
  };

  const formatMessageTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const onInputChange = (e) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", { conversationId, senderId: currentUser._id });
    }

    // Debounce stop_typing
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit("stop_typing", { conversationId, senderId: currentUser._id });
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    fetchConversationMeta();
    fetchMessages();
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (container.scrollTop === 0 && hasMore && !loading) {
        fetchMessages();
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore, page]);

  useEffect(() => {
    const container = containerRef.current;
    if (isPaginating && container && page > 1) {
      const newScrollHeight = container.scrollHeight;
      container.scrollTop = newScrollHeight - prevScrollHeight.current;
      setIsPaginating(false); // ✅ Reset after done
    } else {
      // Scroll to bottom for normal new message case
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!socket || !conversationId) return;

    socket.emit("join_conversation", conversationId);

    const handleReceiveMessage = (message) => {
      // const total = Date.now() - message.clientSentAt;
      // console.log(total);

      const exists = messages.some((msg) => msg._id === message._id);
      if (message.conversationId === conversationId && !exists) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket, conversationId]);

  useEffect(() => {
    if (!socket || !conversationId || !otherUser?._id) return;

    const handleTyping = ({ senderId }) => {
      if (senderId !== currentUser._id) {
        setTypingUsers((prev) => ({ ...prev, [senderId]: true }));
      }
    };

    const handleStopTyping = ({ senderId }) => {
      setTypingUsers((prev) => {
        const updated = { ...prev };
        delete updated[senderId];
        return updated;
      });
    };

    socket.on("typing", handleTyping);
    socket.on("stop_typing", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stop_typing", handleStopTyping);
    };
  }, [socket, conversationId, currentUser?._id, otherUser]);

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] overflow-auto select-none">
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
      {/* {error !== null && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 px-10 bg-[#1a1a1a]">
          <p className="text-[#aaaaaa] font-inter font-[500] text-lg">
            {error}
          </p>
        </div>
      )} */}
      <div className="flex flex-row items-center justify-between px-4 py-4">
        <div className="flex flex-row items-center gap-3">
          <img
            onClick={() => navigate(-1)}
            className="h-5 w-6 object-contain"
            src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748781336/Vector_5_labewm.png"
          />
          <div className="font-poppins font-[500] text-2xl  text-white">
            <div
              onClick={() => {
                navigate(`/user-profile?userid=${otherUser?._id}`);
              }}
              className="flex flex-row items-center"
            >
              <div className="flex flex-row items-center justify-start">
                <img
                  className="h-11 w-11 rounded-full object-cover"
                  src={otherUser?.profilePicture}
                />
              </div>
              <div className="px-4">
                {otherUser?.fullname.firstname.charAt(0).toUpperCase() +
                  otherUser?.fullname.firstname.slice(1).toLowerCase() +
                  " " +
                  otherUser?.fullname.lastname.charAt(0).toUpperCase() +
                  otherUser?.fullname.lastname.slice(1).toLowerCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex-1 flex-col overflow-y-auto space-y-4 scrollbar-hidden"
      >
        {messages.length === 0 && (
          <p className="text-center text-[#aaaaaa] mt-10">No messages yet.</p>
        )}
        {messages.map((message, idx) => (
          <div
            key={message._id + idx}
            ref={idx === messages.length - 1 ? messageEndRef : null}
            onContextMenu={(e) => {
              e.preventDefault();
              setReplyTo(message);
            }}
            className={`fade-in-message flex items-end mb-2 px-4 ${
              message.senderId === otherUser?._id
                ? "justify-start"
                : "justify-end"
            }`}
          >
            {message.senderId === otherUser?._id && (
              <img
                src={otherUser?.profilePicture}
                alt="profile"
                className="w-8 h-8 rounded-full mr-2 object-cover border border-[#333]"
              />
            )}
            <div className={`max-w-xs md:max-w-md break-words`}>
              <div
                className={`rounded-2xl px-4 py-2 shadow-md 
                  "select-none"
                  ${
                    message.senderId === otherUser?._id
                      ? "bg-violet-600 text-white rounded-br-none"
                      : "bg-[#232323] text-[#eaeaea] rounded-bl-none"
                  }`}
              >
                {message.replyTo && (
                  <div className="text-sm text-gray-400 border-l-2 border-gray-600 pl-2 mb-1">
                    {message.replyTo.senderId === currentUser?._id
                      ? "You"
                      : otherUser?.fullname.firstname}
                    : {message.replyTo.text}
                  </div>
                )}
                <span className="block font-inter text-base">
                  {message.text}
                </span>
                <span className="block text-xs text-gray-300 text-right mt-1">
                  {formatMessageTime(message.createdAt)}
                </span>
              </div>
            </div>
            {message.senderId === currentUser?._id && (
              <img
                src={currentUser?.profilePicture}
                alt="profile"
                className="w-8 h-8 rounded-full ml-2 object-cover border border-[#333]"
              />
            )}
          </div>
        ))}
      </div>
      {typingUsers[otherUser?._id] && (
        <div className="flex items-center gap-1 px-4 pb-2 h-6">
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-[bounce_1.2s_ease-in-out_infinite] [animation-delay:0s]"></span>
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-[bounce_1.2s_ease-in-out_infinite] [animation-delay:0.2s]"></span>
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-[bounce_1.2s_ease-in-out_infinite] [animation-delay:0.4s]"></span>
        </div>
      )}

      <div className="p-4 mb-3 w-full">
        {connected === true ? (
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="flex items-center gap-2 min-h-10 border-1 border-[#aaaaaa] rounded-xl px-2 py-2"
          >
            <div className="flex-1 flex gap-2">
              {replyTo && (
                <div className="flex justify-between items-center px-2 py-1 bg-[#2a2a2a] border-l-4 border-violet-500 rounded-md mb-2 text-sm text-gray-300">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">
                      {replyTo.senderId === currentUser._id
                        ? "You"
                        : otherUser?.fullname.firstname}
                    </span>
                    <span className="truncate max-w-[200px]">
                      {replyTo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => setReplyTo(null)}
                    className="text-gray-400 hover:text-red-400 text-xl ml-3"
                  >
                    &times;
                  </button>
                </div>
              )}
              <textarea
                ref={textareaRef}
                className="w-full text-white rounded-lg focus:outline-none resize-none overflow-hidden font-inter max-h-[150px] select-all"
                placeholder="Type a message..."
                rows={1}
                value={text}
                onChange={(e) => {
                  onInputChange(e);
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
        ) : (
          <p className="text-[#aaaaaa] font-inter font-[400]">
            You cannot text eachother since both are not connected.
          </p>
        )}
      </div>
    </div>
  );
};

export default Conversation;
