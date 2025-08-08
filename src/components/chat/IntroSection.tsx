import { chidi } from "../../utils/assets";

interface IntroMessageProps {
  theme: "dark" | "light";
}

export default function IntroMessage({ theme }: IntroMessageProps) {
  return (
    <div
      className={`flex flex-col gap-y-3 items-center w-full px-10 lg:px-0 lg:max-w-[550px] ${
        theme === "dark" ? "text-white" : "text-[#333333]"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-y-0.5 text-sm lg:text-base">
        <img
          src={chidi}
          alt="logo"
          className="w-auto h-[60px] rounded-full lg:h-[100px]"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
        {/* <p
          className={`uppercase transition ease-in-out delay-100 ${
            theme === "dark" ? "text-[#fefefe]" : "text-[#15411F]"
          }`}
        >
          <span className="font-semibold">smart</span>service
        </p> */}
      </div>
      <h3 className="font-bold text-lg lg:text-2xl">Hello! I'm Chidi👋</h3>
      <p className="text-sm text-center mt-4 lg:text-base">
        I'm here to help you draft memos, generate reports, analyze documents,
        determine officer seniority, and handle other administrative tasks — all
        in seconds. Just type your request to get started!
      </p>
    </div>
  );
}
