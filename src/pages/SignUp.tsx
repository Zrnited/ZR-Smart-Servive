import { Link } from "react-router-dom";
import { useAppContext } from "../context";
import { useNavigate } from "react-router-dom";
import { logo, image5, bottomImage } from "../utils/assets";
import { validateEmail, validateNames, validatePassword } from "../validation";
import { useState } from "react";
import type { SignupForm } from "../entities";
import { toast } from "sonner";
import { signup } from "../api/onboarding";
import Loader from "../components/loader";

export default function SignUp() {
  const { theme } = useAppContext();
  const navigate = useNavigate();

  const [signUpForm, setSignUpForm] = useState<SignupForm>({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setSignUpForm((pV) => {
      return {
        ...pV,
        [name]: value,
      };
    });
  };

  const signUpUser = async () => {
    setLoading(true);
    signup(
      signUpForm.firstname,
      signUpForm.lastname,
      signUpForm.email,
      signUpForm.role,
      signUpForm.password,
      signUpForm.password_confirmation
    )
      .then((resp) => {
        toast.success(resp.message ? resp.message : "Signup successful");
        setLoading(false);
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error.message ? error.message : "Signup failed");
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //validate email, first name, last name and password
    if (signUpForm.password !== signUpForm.password_confirmation) {
      return toast.error("Password mismatched");
    }

    const checkEmail = validateEmail(signUpForm.email);
    if (checkEmail !== true) return toast.error(checkEmail);

    const checkfirstname = validateNames(signUpForm.firstname);
    if (checkfirstname !== true) return toast.error(checkfirstname);

    const checklastname = validateNames(signUpForm.lastname);
    if (checklastname !== true) return toast.error(checklastname);

    const checkPassword = validatePassword(signUpForm.password);
    if (checkPassword !== true) return toast.error(checkPassword);

    console.log(signUpForm);
    signUpUser();
  };

  return (
    <main
      className={`h-fit transition ease-in-out delay-100 ${
        theme === "dark" ? "bg-[#1A1D18]" : "bg-white"
      }`}
    >
      <div className="relative flex flex-col w-full h-full">
        {/* white cartoon */}
        <div className="absolute left-0 top-28">
          <img
            src={image5}
            draggable={false}
            alt="img"
            className="w-[100px] h-auto md:w-[250px] lg:w-[350px]"
          />
        </div>
        {/* form */}
        <div className="h-full flex flex-col justify-between py-10 items-center">
          <div className="flex flex-col gap-y-0.5 items-center">
            <img
              src={logo}
              draggable={false}
              alt="logo"
              className="w-[80px] h-auto lg:w-[130px]"
            />
            <p
              className={`uppercase text-lg transition ease-in-out delay-100 lg:text-xl ${
                theme === "dark" ? "text-white" : "text-[#15411F]"
              }`}
            >
              <span className="font-semibold">smart</span>service
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="z-10 flex flex-col gap-y-5 w-full text-center p-6 md:max-w-[461px] lg:max-w-[600px]"
          >
            <h2
              className={`text-lg transition ease-in-out delay-100 font-semibold ${
                theme === "dark" ? "text-white" : "text-[#333333]"
              }`}
            >
              Signup to our Smart Service AI
            </h2>
            {/* firstname and lastname */}
            <div className="flex flex-row gap-x-3 w-full">
              {/* firstname */}
              <input
                className={`border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] ${
                  theme === "dark"
                    ? "placeholder:text-[#B9B9B9] text-[#B9B9B9]"
                    : "placeholder:text-[#5C5C5C] text-[#333333]"
                }`}
                type="text"
                name="firstname"
                placeholder="Firstname"
                onChange={handleChange}
              />
              {/* lastname */}
              <input
                className={`border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] ${
                  theme === "dark"
                    ? "placeholder:text-[#B9B9B9] text-[#B9B9B9]"
                    : "placeholder:text-[#5C5C5C] text-[#333333]"
                }`}
                type="text"
                name="lastname"
                placeholder="Lastname"
                onChange={handleChange}
              />
            </div>
            {/* email */}
            <input
              className={`border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] ${
                theme === "dark"
                  ? "placeholder:text-[#B9B9B9] text-[#B9B9B9]"
                  : "placeholder:text-[#5C5C5C] text-[#333333]"
              }`}
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            {/* role */}
            <input
              className={`border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] ${
                theme === "dark"
                  ? "placeholder:text-[#B9B9B9] text-[#B9B9B9]"
                  : "placeholder:text-[#5C5C5C] text-[#333333]"
              }`}
              type="text"
              name="role"
              placeholder="Position/Office"
              onChange={handleChange}
            />
            {/* password */}
            <input
              className={`border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] ${
                theme === "dark"
                  ? "placeholder:text-[#B9B9B9] text-[#B9B9B9]"
                  : "placeholder:text-[#5C5C5C] text-[#333333]"
              }`}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {/* confirm pass */}
            <input
              className={`border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] ${
                theme === "dark"
                  ? "placeholder:text-[#B9B9B9] text-[#B9B9B9]"
                  : "placeholder:text-[#5C5C5C] text-[#333333]"
              }`}
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <button
              disabled={
                !signUpForm.email ||
                !signUpForm.firstname ||
                !signUpForm.lastname ||
                !signUpForm.password ||
                !signUpForm.password_confirmation ||
                !signUpForm.role ||
                loading
              }
              className="bg-[#15411F] rounded-lg h-[50px] text-white font-semibold w-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed flex flex-row items-center justify-center gap-x-2 lg:h-[64px]"
            >
              {loading && <Loader size={20} color="white" />}
              <p>{loading ? "Registering..." : "Sign Up"}</p>
            </button>
            <div className="text-center">
              <p
                className={`text-sm transition ease-in-out delay-100 font-semibold lg:text-base ${
                  theme === "dark" ? "text-white" : "text-[#2B2B2B]"
                }`}
              >
                Already have an account?{" "}
                <Link
                  className={`hover:underline ${
                    theme === "dark" ? "text-white" : "text-[#15411F]"
                  }`}
                  to={"/login"}
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
          <p
            className={`text-sm text-center font-medium ${
              theme === "dark" ? "text-white" : "text-[#2A2A2A]"
            }`}
          >
            Copyright © 2025. All Rights Reserved.
          </p>
        </div>
        {/* colorful dots */}
        <div className="absolute right-0 bottom-0">
          <img
            src={bottomImage}
            draggable={false}
            alt="img"
            className="w-[200px] h-auto md:w-[350px] lg:w-[500px]"
          />
        </div>
      </div>
    </main>
  );
}
