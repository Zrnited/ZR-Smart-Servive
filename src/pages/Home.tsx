import { BsArrowRight } from "react-icons/bs";
import {
  logo,
  logoCircle,
  heroImage,
  lightModeImg,
  darkModeImg,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
} from "../utils/assets";
import { whySmartService } from "../utils";
import { useAppContext } from "../context";
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import GetStartedBtn from "../components/homepage/GetStartedBtn";
import { FaRobot } from "react-icons/fa6";
export default function Home() {
  const { theme, setTheme, user } = useAppContext();
  return (
    <main
      className={`transition ease-in-out delay-100 ${
        theme === "dark" ? "bg-[#1B1B1B]" : "bg-[#FEFEFE]"
      }`}
    >
      {/* header */}
      <header
        className={`p-3 fixed top-0 right-0 left-0 z-20 lg:flex lg:justify-center transition ease-in-out delay-100 ${
          theme === "dark" ? "bg-[#1b1b1b]" : "bg-[#fefefe]"
        }`}
      >
        <nav className="flex items-center justify-between w-full px-1 lg:max-w-[1440px] lg:px-10">
          <div className="flex flex-row items-center gap-x-1 text-sm lg:text-base">
            <img
              src={logo}
              alt="logo"
              className="w-auto h-[47px] lg:h-[70px]"
              draggable={false}
            />
            <p
              className={`uppercase transition ease-in-out delay-100 ${
                theme === "dark" ? "text-[#fefefe]" : "text-[#154411F]"
              }`}
            >
              <span className="font-semibold">smart</span>service
            </p>
          </div>
          <div className="flex items-center gap-x-3 text-sm lg:text-base lg:gap-x-10">
            {/* desktop */}
            <button
              onClick={() => {
                if (theme === "dark") {
                  setTheme("light");
                } else {
                  setTheme("dark");
                }
              }}
              className={`capitalize font-semibold cursor-pointer transition ease-in-out delay-100 hidden sm:block focus:outline-none ${
                theme === "dark" ? "text-[#fefefe]" : "text-[#15411F]"
              }`}
            >
              {theme === "dark" ? "light mode" : "dark mode"}
            </button>
            {/* mobile */}
            <button
              onClick={() => {
                if (theme === "dark") {
                  setTheme("light");
                } else {
                  setTheme("dark");
                }
              }}
              className={`capitalize font-semibold cursor-pointer transition ease-in-out delay-100 sm:hidden focus:outline-none ${
                theme === "dark" ? "text-[#fefefe]" : "text-[#15411F]"
              }`}
            >
              {theme === "dark" ? (
                <MdLightMode size={22} />
              ) : (
                <MdDarkMode size={22} />
              )}
            </button>
            <Link
              to={"/login"}
              className={`flex-row items-center gap-x-1 text-white px-3 py-3 rounded-lg bg-[#15411F] cursor-pointer lg:px-8 ${
                user ? "hidden" : "flex"
              }`}
            >
              <p>Sign in</p>
              <BsArrowRight className="font-semibold" />
            </Link>
            <Link
              className={`${
                theme === "dark" ? "text-white" : "text-[#1b1b1b]"
              } ${user ? "block" : "hidden"}`}
              to={`/c/user${user?.id}`}
            >
              <FaRobot size={30} />
            </Link>
          </div>
        </nav>
      </header>
      {/* herosection */}
      <section
        className={`relative mt-16 px-5 pt-10 pb-10 flex flex-col items-center gap-y-2 text-sm lg:gap-y-4 transition ease-in-out delay-100 lg:pb-0 ${
          theme === "dark"
            ? "lg:mt-20 lg:bg-[linear-gradient(to_bottom,_#1b1b1b_0%,_#1b1b1b_70%,_#15411f46_100%)]"
            : "lg:mt-24 lg:bg-[linear-gradient(to_bottom,_#fefefe_0%,_#fefefe_70%,_#15411f46_100%)]"
        }`}
      >
        <h2
          className={`uppercase font-semibold lg:text-base transition ease-in-out delay-100 ${
            theme === "dark" ? "text-[#fefefe]" : "text-[#15411F]"
          }`}
        >
          meet abia smartservice AI
        </h2>
        <h3
          className={`font-bold text-2xl text-center lg:text-5xl lg:max-w-[563px] transition ease-in-out delay-100 ${
            theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
          }`}
        >
          Your intelligent public service assistant
        </h3>
        <div className="flex flex-col gap-4 items-center md:flex-row lg:gap-5">
          <div
            className={`h-[49px] w-[183px] text-[#C35114] text-sm rounded-full capitalize font-semibold flex items-center justify-center lg:w-[189px] lg:h-[41px] transition ease-in-out delay-100 ${
              theme === "dark" ? "bg-[#353535]" : "bg-[#EFDED580]"
            }`}
          >
            <p>transforming work</p>
          </div>
          <div
            className={`h-[49px] w-[183px] text-[#5B8211] text-sm rounded-full capitalize font-semibold flex items-center justify-center lg:w-[189px] lg:h-[41px] transition ease-in-out delay-100 ${
              theme === "dark" ? "bg-[#353535]" : "bg-[#DBEFD580]"
            }`}
          >
            <p>empowering service</p>
          </div>
          <div
            className={`h-[49px] w-[183px] text-[#1A35A3] text-sm rounded-full capitalize font-semibold flex items-center justify-center lg:w-[189px] lg:h-[41px] transition ease-in-out delay-100 ${
              theme === "dark" ? "bg-[#353535]" : "bg-[#D5E1EF80]"
            }`}
          >
            <p>enhancing productivity</p>
          </div>
        </div>
        <p
          className={`text-center text-sm mt-3 font-medium max-w-[698px] md:max-w-[500px] lg:max-w-[698px] lg:text-base lg:font-semibold transition ease-in-out delay-100 ${
            theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
          }`}
        >
          SMART SERVICE is a powerful AI-powered assistant purpose-built to
          support Abia State public servants with their day-to-day
          administrative tasks. Whether it’s drafting memos, generating
          insightful reports, performing data analysis, or managing civil
          service correspondence, SMARTSERVICE does it all — efficiently and
          accurately.
        </p>
        <GetStartedBtn />
        {/* hero floating image */}
        <img
          src={heroImage}
          draggable={false}
          alt="icon"
          className="absolute right-0 top-24 w-[150px] sm:top-10 sm:w-[250px] lg:w-[380px] lg:-top-10 xl:w-[400px]"
        />
        {/* hero image */}
        <img
          src={theme === "dark" ? darkModeImg : lightModeImg}
          draggable={false}
          alt="image"
          className="w-[1000px] h-auto mt-10 hidden lg:block"
        />
      </section>
      {/* what we do */}
      <section className="p-5 w-full flex flex-col items-center">
        <h1
          className={`font-bold text-center text-xl lg:my-10 md:text-2xl lg:text-4xl ${
            theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
          }`}
        >
          What SmartService can do.
        </h1>
        <div className="mt-5 w-fit xl:px-10">
          {/* first two */}
          <div className="flex flex-col gap-8 justify-center items-center md:flex-row md:gap-5 xl:gap-10">
            <div
              className={`transition ease-in-out delay-100 relative min-w-[320px] max-w-[350px] h-[310px] sm:h-[372px] rounded-2xl md:w-[318px] md:h-[400px] lg:max-w-max lg:w-[490px] lg:h-[572px] overflow-hidden ${
                theme === "dark" ? "bg-[#2D3135]" : "bg-[#E4F1FF]"
              }`}
            >
              <div
                className={`transition ease-in-out delay-100 p-5 flex flex-col gap-y-1 items-center text-center md:p-10 lg:p-20 lg:gap-y-5 ${
                  theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
                }`}
              >
                <h4 className="text-lg font-semibold lg:text-4xl">
                  Draft and respond to memos
                </h4>
                <p className="text-sm lg:text-base">
                  Automatically generate well-structured memos, reply with the
                  right tone and format, and ensure alignment with civil service
                  standards.
                </p>
              </div>
              <img
                src={image1}
                alt="image"
                draggable={false}
                className="absolute -right-2 -bottom-7"
              />
            </div>
            <div
              className={`transition ease-in-out delay-100 relative min-w-[320px] max-w-[350px] h-[310px] sm:h-[372px] rounded-2xl md:w-[318px] md:h-[400px] lg:max-w-max lg:w-[490px] lg:h-[572px] overflow-hidden ${
                theme === "dark" ? "bg-[#28282C]" : "bg-[#E4E7FF]"
              }`}
            >
              <div
                className={`transition ease-in-out delay-100 p-5 flex flex-col gap-y-1 items-center text-center md:p-10 lg:p-20 lg:gap-y-5 ${
                  theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
                }`}
              >
                <h4 className="text-lg font-semibold lg:text-4xl">
                  Analyses documents and reports.
                </h4>
                <p className="text-sm lg:text-base">
                  Upload any document - SmartService can analyze, summarize, and
                  extract key insights instantly.
                </p>
              </div>
              <img
                src={image2}
                alt="image"
                draggable={false}
                className="absolute -right-2 -bottom-7 w-[250px] lg:-bottom-3 lg:right-0 lg:w-[400px]"
              />
            </div>
          </div>
          {/* middle */}
          <div className="mt-5 flex justify-center w-full">
            <div
              className={`transition ease-in-out delay-100 relative min-w-[320px] max-w-[350px] h-[310px] sm:h-[372px] rounded-2xl md:h-[280px] md:max-w-[10000px] md:w-full lg:w-full overflow-hidden ${
                theme === "dark" ? "bg-[#383631]" : "bg-[#FAF1E3]"
              }`}
            >
              <div
                className={`transition ease-in-out delay-100 p-5 flex flex-col gap-y-1 items-center text-center md:p-10 md:items-start md:text-left lg:p-20 lg:gap-y-5 ${
                  theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
                }`}
              >
                <h4 className="text-lg font-semibold lg:text-4xl md:w-[50%]">
                  Generate Official letters
                </h4>
                <p className="text-sm lg:text-base md:w-[50%]">
                  Need to request for approval, resources, or personnel?
                  SmartService creates formal request letters in seconds.
                </p>
              </div>
              <img
                src={image3}
                alt="image"
                draggable={false}
                className="absolute -right-2 -bottom-7 md:w-[400px] lg:w-[500px]"
              />
            </div>
          </div>
          {/* last two */}
          <div className="mt-5 flex flex-col gap-8 justify-center items-center md:flex-row md:gap-5 xl:gap-10">
            <div
              className={`transition ease-in-out delay-100 relative min-w-[320px] max-w-[350px] h-[310px] sm:h-[372px] rounded-2xl md:w-[318px] md:h-[400px] lg:max-w-max lg:w-[490px] lg:h-[572px] overflow-hidden ${
                theme === "dark" ? "bg-[#2F2E30]" : "bg-[#F5E9FB]"
              }`}
            >
              <div
                className={`transition ease-in-out delay-100 p-5 flex flex-col gap-y-1 items-center text-center md:p-10 lg:p-20 lg:gap-y-5 ${
                  theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
                }`}
              >
                <h4 className="text-lg font-semibold lg:text-4xl">
                  Determine Officer Seniority
                </h4>
                <p className="text-sm lg:text-base">
                  Input names and ranks, and ABIPA will instantly determine the
                  seniority hierarchy across departments.
                </p>
              </div>
              <img
                src={image6}
                alt="image"
                draggable={false}
                className="absolute -right-2 -bottom-7"
              />
            </div>
            <div
              className={`transition ease-in-out delay-100 relative min-w-[320px] max-w-[350px] h-[310px] sm:h-[372px] rounded-2xl md:w-[318px] md:h-[400px] lg:max-w-max lg:w-[490px] lg:h-[572px] overflow-hidden ${
                theme === "dark" ? "bg-[#241E1E]" : "bg-[#FFE4E4]"
              }`}
            >
              <div
                className={`transition ease-in-out delay-100 p-5 flex flex-col gap-y-1 items-center text-center md:p-10 lg:p-20 lg:gap-y-5 ${
                  theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
                }`}
              >
                <h4 className="text-lg font-semibold lg:text-4xl">
                  Automate Routine Admin Tasks
                </h4>
                <p className="text-sm lg:text-base">
                  Schedule updates, draft circulars, format reports - all
                  streamlined to save time and eliminate errors.
                </p>
              </div>
              <img
                src={image4}
                alt="image"
                draggable={false}
                className="absolute right-2 bottom-3 w-[300px] lg:-bottom-3 lg:right-0 lg:w-[500px]"
              />
            </div>
          </div>
        </div>
        <div className="my-5">
          <GetStartedBtn />
        </div>
      </section>
      {/* why smart service section */}
      <section
        className={`transition ease-in-out delay-100 flex ${
          theme === "dark"
            ? "bg-[#1D211B] text-white"
            : "bg-[#EDF0EC] text-[#333333]"
        }`}
      >
        <img
          src={image5}
          draggable={false}
          alt="img"
          className="w-[450px] h-fit hidden lg:block"
        />
        <div className="flex flex-col gap-y-5 p-10 lg:max-w-[700px] xl:ml-24">
          <div
            className={`flex flex-col gap-y-3 items-center text-center p-3 lg:gap-y-5 lg:items-start lg:text-start`}
          >
            <h4 className="text-2xl font-semibold lg:text-4xl">
              Why SmartService?
            </h4>
            <p className="text-base font-medium lg:text-lg">
              SMART SERVICE is a powerful AI-powered assistant purpose-built to
              support Abia State public servants with their day-to-day
              administrative tasks.
            </p>
          </div>
          <div className="flex flex-col gap-y-5">
            {whySmartService.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`border transition delay-100 ease-in-out rounded-lg p-4 text-inherit flex flex-col gap-y-2 ${
                    theme === "dark"
                      ? "bg-[#252A23] border-[#15411F]"
                      : "bg-white border-[#DADADA]"
                  }`}
                >
                  <h3 className="font-semibold lg:text-xl">{item.title}</h3>
                  <p className="text-sm lg:text-base">{item.info}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* footer */}
      <footer>
        <div
          className={`transition ease-in-out delay-100 relative ${
            theme === "dark" ? "bg-[#080D05]" : "bg-inherit"
          }`}
        >
          <div
            className={`flex flex-col gap-y-3 items-center text-center p-6 transition ease-in-out delay-100 md:absolute md:left-3 md:top-3 md:z-10 md:w-[466px] md:items-start md:text-start lg:w-[566px] lg:left-10 lg:top-10 ${
              theme === "dark" ? "text-[#FFFFFF]" : "text-[#333333]"
            }`}
          >
            <h4 className="text-xl font-semibold lg:text-4xl">
              Build to empower every officer
            </h4>
            <p className="text-sm font-medium lg:text-lg">
              Whether you're a senior director, head of department, or
              administrative officer, SmartService is designed to make your work
              smoother and more productive.
            </p>
            <GetStartedBtn />
          </div>
          <img
            src={image7}
            alt="img"
            draggable={false}
            className={`w-full h-auto transition ease-in-out delay-100 ${
              theme === "dark" ? "opacity-20" : "opacity-100"
            }`}
          />
        </div>
        <div className="relative h-fit bg-[#102F17] px-5 text-xs flex items-center justify-between py-2 md:py-5 md:text-sm">
          <p className="w-[135px] text-white text-center md:w-fit">
            Copyright © 2025. All Rights Reserved.
          </p>
          <p className="w-1/2 text-white text-center lg:w-fit">
            Brought to you by : The Office of the Head of Service, Abia State.
          </p>
          <img
            src={logoCircle}
            draggable={false}
            alt="logo"
            className="w-[49px] h-[49px] absolute left-[40%] -top-10 md:w-[80px] md:h-[80px] md:left-[30%] lg:w-[108px] lg:h-[108px] lg:-top-24 lg:left-auto lg:right-10 xl:right-32"
          />
        </div>
      </footer>
    </main>
  );
}
