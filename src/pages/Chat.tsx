/* eslint-disable @typescript-eslint/no-explicit-any */
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppContext } from "../context";
import { IoMdAttach } from "react-icons/io";
import { GiSoundWaves } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { validateInput } from "../validation";
import { useNavigate } from "react-router-dom";
import { FaUserLarge, FaCircleStop } from "react-icons/fa6";
// import RecordRTC, { invokeSaveAsDialog } from "recordrtc";
import RecordRTC from "recordrtc";
import IntroMessage from "../components/chat/IntroSection";
import Sidebar from "../components/chat/Sidebar";
import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
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

interface ImageHandler {
  url: string;
  file: File;
}

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
  const userMsgRef: any = useRef(null);
  const [openAside, setOpenAside] = useState<boolean>(false);
  // user convos variables begins
  const [conversations, setConversations] = useState<ConversationsController>({
    loader: false,
    user_conversations: undefined,
  });
  const [messages, setMessages] = useState<UserConversation>({
    loader: false,
    msgs: undefined,
  });
  //user convos variables end
  const [currConvId, setCurrConvId] = useState<string>();
  const [isNewChat, setIsNewChat] = useState<boolean>(true);
  const [userMsg, setUserMsg] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [chatTitle, setChatTitle] = useState<string>("New Query");
  const [image, setImage] = useState<ImageHandler>();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  //speech recognition variables begins
  const recorderRef = useRef<RecordRTC | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  // const [transcript, setTranscript] = useState('');
  // const [loading, setLoading] = useState(false);
  //speech recognition variables ends

  const sendMessage = async () => {
    if (userMsgRef.current) userMsgRef.current.value = "";
    if (isNewChat) setIsNewChat(false);
    setIsTyping(true);

    if (accessToken) {
      const data = {
        id: currConvId ? currConvId : null,
        message: userMsg ? userMsg : "",
        file: image?.file ? image.file : null,
        voice_note: null,
      };

      const userMessage: Messages = {
        id: currConvId ? currConvId : "",
        sender: "user",
        content: userMsg,
        type: null,
        media_url: image?.url ? image.url : null,
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
            setUserMsg("");
          }
        })
        .catch((error) => {
          setIsTyping(false);
          // console.log(error);
          setUserMsg("");
          toast.error(
            error.response.data.message
              ? error.response.data.message
              : "Failed to send message"
          );
        });

      if (image?.url || image?.file) setImage(undefined);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const systemfile = e.target.files?.[0];
    if (systemfile) {
      const localURL = URL.createObjectURL(systemfile);
      // setImageURL(localURL);
      setImage({
        url: localURL,
        file: systemfile,
      });
    }
  };

  //RECORDING EVENTS
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    streamRef.current = stream;

    const recorder = new RecordRTC(stream, {
      type: "audio",
      sampleRate: 48000,
      checkForInactiveTracks: true,
      mimeType: "audio/wav",
      disableLogs: true,
    });
    recorder.startRecording();
    recorderRef.current = recorder;
    setRecording(true);
  };

  const stopRecording = async () => {
    if (!recorderRef.current) return;
    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current?.getBlob();
      const url = blob ? URL.createObjectURL(blob) : null;
      setAudioUrl(url);
      //call transcribe audio API here if needed

      // Optional: save file or upload blob
      // if (blob) invokeSaveAsDialog(blob, "recording.wav");
    });

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setRecording(false);
  };

  useEffect(() => {
    fetchPrevMsgs();
    userMsgRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      setAudioUrl("");
      recorderRef.current = null;
    }
  }, [audioUrl]);

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
        className={`flex flex-col h-full md:w-full transition ease-in-out delay-100 sm:overflow-hidden ${
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
              <Loader
                color={theme === "dark" ? "white" : "#5c5c5c"}
                size={18}
              />
              <p>Loading messages...</p>
            </div>
          )}
          {/* error in network */}
          {error && (
            <p className="text-red-700 text-xs text-center lg:text-sm px-5">
              Error in getting messages. <br /> Please click on selected chat to
              reload or check your network connection.
            </p>
          )}
          <form
            onSubmit={handleSubmit}
            className={`rounded-xl h-fit flex flex-col gap-y-1 transition ease-in-out delay-100 ${
              isNewChat
                ? "max-w-[382px] mt-10 w-full"
                : "absolute bottom-3 w-[90%] lg:bottom-5"
            } ${
              theme === "dark"
                ? "bg-[#292D25] text-white"
                : "bg-[#EBEBEB] text-[#333333]"
            } ${messages.loader || error ? "hidden" : "flex"}`}
          >
            {!isNewChat && image?.url && (
              <div className="w-[100px] h-auto p-3 relative lg:w-[150px]">
                <img
                  className="w-full h-fit"
                  src={image?.url}
                  draggable={false}
                  alt="img"
                  loading="lazy"
                  decoding="async"
                />
                <button
                  onClick={() => setImage(undefined)}
                  className="absolute top-1 right-0 w-[20px] h-[20px] bg-red-800 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <AiOutlineClose size={14} />
                </button>
              </div>
            )}
            <div className="flex items-center justify-center gap-x-0.5 h-[67px] py-2 px-5">
              <div className="cursor-pointer relative">
                <IoMdAttach size={24} className="rotate-30" />
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 appearance-none opacity-0"
                  maxLength={2 * 1024 * 1024}
                  name="file"
                  onChange={handleImageChange}
                />
              </div>
              {recording ? (
                <div className="flex flex-1 items-center justify-center">
                  <GiSoundWaves size={40} />
                </div>
              ) : (
                <input
                  className="rounded-lg focus:outline-none h-full w-full px-3"
                  placeholder="| Type message here..."
                  name="userMsg"
                  ref={userMsgRef}
                  onChange={(e) => setUserMsg(e.target.value)}
                />
              )}
              <div
                onClick={!recording ? startRecording : stopRecording}
                className="min-w-[30px] max-w-[30px] h-[30px] mr-1 rounded-full flex items-center justify-center text-inherit hover:cursor-pointer hover:bg-[#ffffff09] transition delay-100 ease-in-out"
              >
                {!recording ? (
                  <FaMicrophone size={20} />
                ) : (
                  <FaCircleStop size={20} />
                )}
              </div>
              <button
                disabled={isTyping || !userMsg}
                className="rotate-45 cursor-pointer disabled:text-[#5c5c5c] disabled:cursor-not-allowed"
              >
                <FiSend size={23} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
