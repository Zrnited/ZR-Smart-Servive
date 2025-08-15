import { logo } from "../../utils/assets";
import { CiSearch } from "react-icons/ci";
import { BsPlus, BsStars } from "react-icons/bs";
import { history } from "../../utils";
import { FaRegCommentDots } from "react-icons/fa";
import type { ConversationsController } from "../../pages/Chat";
import Loader from "../loader";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import type { UserConversations } from "../../entities";

interface SidebarProps {
  theme: "dark" | "light";
  openAside: boolean;
  setOpenAside: React.Dispatch<React.SetStateAction<boolean>>;
  conversations: ConversationsController;
  formatTimestamp: (timestamp: string) => {
    formattedTime: string;
    formattedDate: string;
  };
  initiateNewChat: () => void;
  fetchConversation: (
    e: string,
    title: string
  ) => Promise<string | number | undefined>;
  initiateLogout: () => void;
  currConvId: string | undefined;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  queries: UserConversations[] | undefined;
}

export default function Sidebar({
  theme,
  openAside,
  setOpenAside,
  conversations,
  formatTimestamp,
  fetchConversation,
  initiateLogout,
  initiateNewChat,
  currConvId,
  setSearchText,
  queries,
}: SidebarProps) {
  return (
    <aside
      className={`fixed h-full top-0 w-[60%] sm:w-[40%] md:static md:w-[330px] md:top-auto md:left-auto px-5 py-10 transition-all ease-in-out delay-100 z-20 ${
        history.length > 5
          ? "overflow-y-scroll activity mb-10"
          : "overflow-auto"
      } ${openAside ? "left-0" : "-left-full"} ${
        theme === "dark"
          ? "bg-[#21251E] text-white"
          : "bg-[#EBEBEB] text-[#2A2A2A]"
      }`}
    >
      <div className={`w-full h-full flex flex-col gap-y-5 relative`}>
        {/* logo */}
        <Link
          to={"/"}
          className="flex flex-row items-center justify-center gap-x-1 text-sm lg:text-base"
        >
          <img
            src={logo}
            alt="logo"
            className="w-auto h-[47px] lg:h-[70px]"
            draggable={false}
          />
          <p
            className={`uppercase transition ease-in-out font-bold delay-100 ${
              theme === "dark" ? "text-[#fefefe]" : "text-[#15411F]"
            }`}
          >
            CHIDI
          </p>
        </Link>
        {/* searchbar */}
        <div className="relative">
          <input
            className={`h-[40px] pl-10 pr-3 rounded-full w-full text-sm md:text-base focus:outline-none ${
              theme === "dark"
                ? "bg-[#292D25] text-white placeholder:text-[#E4E4E4]"
                : "bg-[#E4E4E4] text-[#2A2A2A]"
            }`}
            placeholder="Search"
            name="searchbar"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <CiSearch className="absolute left-3.5 top-3" size={17} />
        </div>
        {/* add new query */}
        <button
          disabled={conversations.loader}
          onClick={initiateNewChat}
          className={`flex flex-row items-center justify-center font-bold w-full text-sm min-h-[52px] rounded-lg cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed ${
            theme == "dark"
              ? "bg-white text-[#15411F]"
              : "bg-[#15411F] text-white"
          }`}
        >
          <BsPlus size={30} />
          <p>Add new query</p>
        </button>
        {/* history sign */}
        <div className="uppercase flex flex-row gap-x-1.5 items-center">
          <BsStars
            size={20}
            className={`${theme === "dark" ? "text-white" : "text-[#15411F]"}`}
          />
          <p
            className={`${theme === "dark" ? "text-white" : "text-[#2A2A2A]"}`}
          >
            history
          </p>
        </div>
        {/* line */}
        <hr
          className={`border w-full ${
            theme === "dark" ? "border-[#b9b9b986]" : "border-[#B9B9B9]"
          }`}
        />
        {/* queries */}
        <div
          className={`flex flex-col gap-y-3 w-full ${
            history.length > 5 && "pb-1"
          }`}
        >
          {!conversations.loader && queries?.length === 0 && (
            <p className="text-sm font-semibold">No queries found.</p>
          )}
          {!conversations.loader &&
            queries?.length !== 0 &&
            queries?.map((chat, index) => {
              return (
                <div
                  onClick={() => {
                    fetchConversation(chat.id, chat.title);
                    setOpenAside(false);
                  }}
                  key={index}
                  className={`flex flex-row gap-x-4 p-1.5 hover:cursor-pointer hover:bg-[#5c5c5c21] rounded-lg transition delay-100 ease-in-out lg:gap-x-2 ${
                    currConvId === chat.id ? "bg-[#5c5c5c21]" : "bg-transparent"
                  }`}
                >
                  <FaRegCommentDots size={22} />
                  <div
                    className={`flex flex-col gap-y-1.5 ${
                      theme === "dark" ? "text-white" : "text-[#333333]"
                    }`}
                  >
                    <h3 className="font-semibold">
                      {chat.title.length > 15
                        ? chat.title.slice(0, 15).concat("...")
                        : chat.title}
                    </h3>
                    <p className="text-xs">{`${
                      formatTimestamp(chat.last_updated).formattedDate
                    } : ${
                      formatTimestamp(chat.last_updated).formattedTime
                    }`}</p>
                  </div>
                </div>
              );
            })}
          {conversations.loader && (
            <div className="h-[350px] flex flex-col gap-y-2 items-center justify-center text-xs">
              <Loader color="white" size={18} />
              <p>Getting messages...</p>
            </div>
          )}
        </div>
        {/* logout */}
        <div
          className={`w-full justify-start flex static py-3 h-full items-end `}
        >
          <div
            onClick={initiateLogout}
            className={`flex w-full items-center capitalize gap-x-2 p-2 rounded-lg hover:cursor-pointer transition ease-in-out delay-100 hover:bg-[#5c5c5c2d]`}
          >
            <AiOutlineLogout />
            <p>logout</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
