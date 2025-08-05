import { Link } from "react-router-dom";
import { useAppContext } from "../context";
import { useNavigate } from "react-router-dom";
import { logo, image5, bottomImage } from "../utils/assets";
import { useState, useEffect } from "react";
import type { LoginForm } from "../entities";
import Loader from "../components/loader";
import { login } from "../api/onboarding";
import { toast } from "sonner";

export default function Login() {
  const { theme, setAccessToken, setUser, user } = useAppContext();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [hasSignedIn, setHasSignedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const signInUser = async () => {
    setLoading(true);
    login(loginForm.email, loginForm.password)
      .then((resp) => {
        //authenticate user
        setAccessToken(resp.data.token ? resp.data.token : undefined);
        // update user
        if (resp.data.user) setUser(resp.data.user);
        toast.success(resp.message ? resp.message : "Login successful");
        setLoading(false);
        //to navigate to chat page
        setHasSignedIn(true);
      })
      .catch((error) => {
        setLoading(false);
        // console.log(error);
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : "Login failed"
        );
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      signInUser();
    }
  };

  useEffect(() => {
    if (hasSignedIn && user?.id)
      navigate(`/c/user${user?.id}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSignedIn]);

  return (
    <main
      className={`h-screen transition ease-in-out delay-100 ${
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
            loading="lazy"
            decoding="async"
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
            <Link
              to={"/"}
              className={`uppercase text-lg transition ease-in-out delay-100 lg:text-xl ${
                theme === "dark" ? "text-white" : "text-[#15411F]"
              }`}
            >
              <span className="font-semibold">smart</span>service
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            className="z-10 flex flex-col gap-y-5 w-full text-center p-6 md:max-w-[461px]"
          >
            <h2
              className={`text-lg transition ease-in-out delay-100 font-semibold ${
                theme === "dark" ? "text-white" : "text-[#333333]"
              }`}
            >
              Login to Smart Service AI
            </h2>
            <div className="flex flex-col gap-y-5">
              {/* email */}
              <input
                className={`border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] ${
                  theme === "dark"
                    ? "placeholder:text-[#B9B9B9] text-[#B9B9B9]"
                    : "placeholder:text-[#5C5C5C] text-[#333333]"
                }`}
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
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
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div className="text-end">
              <p
                className={`text-sm transition ease-in-out delay-100 font-semibold cursor-not-allowed ${
                  theme === "dark" ? "text-white" : "text-[#2B2B2B]"
                }`}
              >
                Forgot password?
              </p>
            </div>
            <button
              disabled={loading || !loginForm.email || !loginForm.password}
              className="bg-[#15411F] rounded-lg h-[50px] text-white font-semibold w-full cursor-pointer flex flex-row items-center gap-x-2 justify-center disabled:bg-[#5c5c5c] disabled:cursor-not-allowed lg:h-[64px]"
            >
              {loading && <Loader size={20} color="white" />}
              <p>{loading ? "Logging in..." : "Continue"}</p>
            </button>
            {/* <div className="text-center">
              <p
                className={`text-sm transition ease-in-out delay-100 font-semibold cursor-not-allowed lg:text-base ${
                  theme === "dark" ? "text-white" : "text-[#2B2B2B]"
                }`}
              >
                Don't have an account yet?{" "}
                <Link
                  className={` hover:underline ${
                    theme === "dark" ? "text-white" : "text-[#15411F]"
                  }`}
                  to={"/signup"}
                >
                  Sign up here
                </Link>
              </p>
            </div> */}
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
