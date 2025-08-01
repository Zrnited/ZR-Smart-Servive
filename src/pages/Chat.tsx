import { GiHamburgerMenu } from "react-icons/gi";
import { useAppContext } from "../context";
import { IoMdAttach } from "react-icons/io";
import { validateInput } from "../validation";
import { useNavigate } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import IntroMessage from "../components/chat/IntroSection";
import Sidebar from "../components/chat/Sidebar";
import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import ChatBox from "../components/chat/Chat";
import { getConversations } from "../api/conversation/getConversations";
import { getConversation } from "../api/conversation/getConversation";
import { toast } from "sonner";
import type { Messages, UserConversations } from "../entities";
import Loader from "../components/loader";
import { postMessage } from "../api/conversation";

export interface ConversationsController {
  loader: boolean;
  user_conversations: UserConversations[] | undefined;
}

export interface UserConversation {
  loader: boolean;
  msgs: Messages[] | undefined;
}

// type SelectedConversation = {
//   e: string;
//   title: string;
// };

export default function Chat() {
  const navigate = useNavigate();
  const {
    theme,
    accessToken,
    formatTimestamp,
    user,
    setAccessToken,
    setUser,
    thread,
    setThread,
  } = useAppContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userMsgRef: any = useRef(null);
  const [openAside, setOpenAside] = useState<boolean>(false);
  // user convos begins
  const [conversations, setConversations] = useState<ConversationsController>({
    loader: false,
    user_conversations: undefined,
  });
  const [messages, setMessages] = useState<UserConversation>({
    loader: false,
    msgs: undefined,
  });
  //user convos end
  const [currConvId, setCurrConvId] = useState<string>();
  const [isNewChat, setIsNewChat] = useState<boolean>(true);
  const [userMsg, setUserMsg] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [chatTitle, setChatTitle] = useState<string>("New Query");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (userMsgRef.current) userMsgRef.current.value = "";
    if (isNewChat) setIsNewChat(false);
    setIsTyping(true);

    if (accessToken) {
      const data = {
        id: currConvId ? currConvId : null,
        message: userMsg ? userMsg : "",
        file: null,
        voice_note: null,
      };

      const userMessage: Messages = {
        id: currConvId ? currConvId : "",
        sender: "user",
        content: userMsg,
        type: null,
        media_url: null,
        created_at: null,
      };

      setThread((prevState) => {
        return [...prevState, userMessage];
      });

      postMessage(
        data.id,
        data.message,
        data.file,
        data.voice_note,
        accessToken
      )
        .then((resp) => {
          if (resp.status === "success" && resp.data) {
            setCurrConvId(resp.data.conversation_id);
            const assistantMessage: Messages = {
              id: resp.data.conversation_id,
              sender: "ai",
              content: resp.data.reply,
              type: resp.data.type ? resp.data.type : null,
              media_url: resp.data.media_url ? resp.data.media_url : null,
              created_at: resp.data.created_at ? resp.data.created_at : null,
            };
            setThread((prevState) => {
              return [...prevState, assistantMessage];
            });
            setIsTyping(false);
          }
        })
        .catch((error) => {
          setIsTyping(false);
          console.log(error);
          toast.error(error.message ? error.message : "Failed to send message");
        });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateMsg = validateInput(userMsg, "message");
    if (validateMsg !== true) toast.error(validateMsg);
    sendMessage();
  };

  const fetchPrevMsgs = async () => {
    if (!accessToken) return toast.error("Unauthenticated");

    setConversations((prevState) => {
      return {
        ...prevState,
        loader: true,
      };
    });

    await getConversations(accessToken)
      .then((resp) => {
        // console.log(resp);
        if (resp.data)
          setConversations({
            loader: false,
            user_conversations: resp.data,
          });
      })
      .catch((error) => {
        console.log(error);
        setConversations((prevState) => {
          return {
            ...prevState,
            loader: false,
          };
        });
      });
  };

  const fetchConversation = async (e: string, title: string) => {
    if (e === currConvId) return toast.warning("Already set to conversation.");

    setChatTitle(title);

    if (error) setError(false);

    if (!accessToken) return toast.error("Unauthenticated");
    setMessages((prevState) => {
      return {
        ...prevState,
        loader: true,
      };
    });

    await getConversation(e, accessToken)
      .then((resp) => {
        // console.log(resp);
        if (resp.data) {
          setMessages({
            loader: false,
            msgs: resp.data.messages,
          });
          setCurrConvId(resp.data.conversation_id);
        }
        setIsNewChat(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setMessages((prevState) => {
          return {
            ...prevState,
            loader: false,
          };
        });
      });
  };

  const initiateLogout = () => {
    setAccessToken(undefined);
    setUser(undefined);
    navigate("/", { replace: true });
  };

  const initiateNewChat = () => {
    //remove error display
    if (error) setError(false);
    //remove open sidebar
    setOpenAside(false);
    //reveal welcome chat interface
    setIsNewChat(true);
    //reset current chat ID
    setCurrConvId("");
    //reset thread
    if (thread.length > 1) setThread([]);
    setChatTitle("New Query");
  };

  useEffect(() => {
    fetchPrevMsgs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages.msgs) setThread(messages.msgs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.msgs]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread]);

  return (
    <main
      className={`h-screen relative md:flex ${
        theme === "dark" ? "bg-[#1A1D18]" : "bg-white"
      }`}
    >
      {/* sidebar */}
      <Sidebar
        initiateLogout={initiateLogout}
        setOpenAside={setOpenAside}
        fetchConversation={fetchConversation}
        formatTimestamp={formatTimestamp}
        conversations={conversations}
        openAside={openAside}
        theme={theme}
        initiateNewChat={initiateNewChat}
      />
      <div
        onClick={() => setOpenAside(false)}
        className={`absolute w-full h-full bg-[#0A1F0FBD] transition-all ease-in-out delay-75 z-10 md:hidden ${
          openAside ? "left-0" : "-left-full"
        }`}
      />
      <section
        className={`flex flex-col h-full md:w-full transition ease-in-out delay-100 ${
          theme === "dark" ? "text-white" : "text-[#333333]"
        }`}
      >
        <header className="flex flex-row items-center justify-between p-5 lg:mb-2">
          <div className="flex flex-row gap-x-3 items-center">
            <button
              onClick={() => setOpenAside(true)}
              className="cursor-pointer md:hidden"
            >
              <GiHamburgerMenu size={20} />
            </button>
            <h2 className="text-lg font-bold">
              {chatTitle.slice(0, 12).concat("...")}
            </h2>
          </div>
          <div className="flex flex-row gap-x-2 items-center">
            <div
              draggable={false}
              className={`min-w-[30px] max-w-[30px] h-[30px] rounded-full flex items-center justify-center ${
                theme === "dark"
                  ? "bg-white text-[#1A1D18]"
                  : "text-white bg-[#1A1D18]"
              }`}
            >
              <FaUserLarge />
            </div>
            <div className="flex flex-col gap-y-0.5">
              <h3 className="font-semibold">{user?.name}</h3>
              <p className="text-xs capitalize">{user?.role}</p>
            </div>
            {/* <button className="cursor-pointer">
              <BsChevronDown />
            </button> */}
          </div>
        </header>
        {/* chat box */}
        <div className="relative flex flex-col items-center flex-grow">
          {/* new chat welcome message */}
          {isNewChat && !messages.loader && !error && (
            <IntroMessage theme={theme} />
          )}
          {/* chat messages */}
          {!isNewChat && !messages.loader && !error && (
            <ChatBox
              isTyping={isTyping}
              bottomRef={bottomRef}
              theme={theme}
              messages={thread}
            />
          )}
          {/* text input */}
          {messages.loader && (
            <div className="flex-1 w-full h-[300px] flex flex-col gap-y-1 text-sm items-center justify-center lg:text-lg">
              <Loader color="white" size={18} />
              <p>Loading messages...</p>
            </div>
          )}
          {/* error in network */}
          {error && (
            <p className="text-red-700 text-xs text-center lg:text-sm">
              Error in getting messages. <br /> Please click on selected chat to
              reload.
            </p>
          )}
          <form
            onSubmit={handleSubmit}
            className={`rounded-xl py-2 px-5 h-[67px] flex items-center justify-center transition ease-in-out delay-100 ${
              isNewChat
                ? "max-w-[382px] mt-10 w-full"
                : "absolute bottom-3 w-[90%] lg:bottom-5"
            } ${
              theme === "dark"
                ? "bg-[#292D25] text-white"
                : "bg-[#EBEBEB] text-[#333333]"
            } ${messages.loader || error ? "hidden" : "flex"}`}
          >
            <p className="cursor-pointer rotate-30">
              <IoMdAttach size={24} />
            </p>
            <input
              className="rounded-lg focus:outline-none h-full w-full px-3"
              placeholder="| Type message here..."
              name="userMsg"
              ref={userMsgRef}
              onChange={(e) => setUserMsg(e.target.value)}
            />
            <button
              disabled={isTyping}
              className="rotate-45 cursor-pointer disabled:text-[#5c5c5c] disabled:cursor-not-allowed"
            >
              <FiSend size={23} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
