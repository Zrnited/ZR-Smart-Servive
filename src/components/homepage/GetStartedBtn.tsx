import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function GetStartedBtn() {
  return (
    <Link
      to={"/login"}
      className="flex flex-row items-center gap-x-1 text-white px-3 py-3 rounded-lg bg-[#15411F] cursor-pointer mt-5 animate-pulse focus:outline-none hover:animate-none lg:text-lg lg:py-5 lg:px-8"
    >
      <p>Get started today!</p>
      <BsArrowRight className="font-semibold" />
    </Link>
  );
}
