import { BsStars } from "react-icons/bs";
import type { Messages } from "../../entities";
import { chidi } from "../../utils/assets";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Loader from "../loader";

interface ChatBoxProps {
  messages: Messages[];
  theme: "dark" | "light";
  bottomRef: React.RefObject<HTMLDivElement | null>;
  isTyping: boolean;
}

export default function ChatBox({
  theme,
  messages,
  bottomRef,
  isTyping,
}: ChatBoxProps) {
  return (
    <div className="flex-1 w-full space-y-2 overflow-y-auto max-h-[79vh] activity px-5 pb-8 sm:max-h-[74vh] lg:px-6 lg:pt-5 lg:pb-5 lg:max-h-[72vh] lg:space-y-5">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex text-sm lg:text-base ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`p-3 rounded-lg max-w-full lg:max-w-[80%] ${
              msg.sender === "user"
                ? `${
                    theme === "dark"
                      ? "bg-[#303A2D80] text-white"
                      : "bg-[#D7E8D380] text-[#333333]"
                  }`
                : `${theme === "dark" ? "text-white" : "text-[#333333]"}`
            }`}
          >
            <div
              className={
                msg.sender === "ai"
                  ? "flex flex-col gap-y-3 w-full mb-3"
                  : "hidden"
              }
            >
              <div className="flex flex-row gap-x-2 items-center">
                <img
                  src={chidi}
                  alt="img"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="w-[35px] h-[35px] rounded-full lg:w-[40px] lg:h-[40px]"
                />
                <p className="text-lg">Chidi</p>
                <BsStars
                  size={18}
                  color={theme === "dark" ? "white" : "#15411F"}
                />
              </div>
              <hr className="border-none h-[0.2px] bg-[#b9b9b957]" />
            </div>
            {msg.media_url && (
              <img
                src={msg.media_url}
                alt="img"
                draggable={false}
                className="w-[300px] mb-2 rounded-lg md:w-[250px] lg:w-[300px]"
                loading="lazy"
                decoding="async"
              />
            )}
            <MarkdownPreview
              style={{ backgroundColor: "transparent", color: "inherit" }}
              source={msg.content}
            />
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start w-full text-xs md:text-sm">
          <div className="flex gap-x-2 items-center">
            <Loader color="white" size={15} />
            <p>Smart Service is typing...</p>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
