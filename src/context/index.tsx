/* eslint-disable react-refresh/only-export-components */
// src/context/MyContext.tsx
import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { format } from "date-fns";
import type { Messages, User } from "../entities";

// Define the interface for your context
interface MyContextType {
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
  accessToken: string | undefined;
  setAccessToken: Dispatch<SetStateAction<string | undefined>>;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  user: User | undefined;
  formatTimestamp: (timestamp: string) => {
    formattedTime: string;
    formattedDate: string;
  };
  thread: Messages[];
  setThread: Dispatch<SetStateAction<Messages[]>>;
}

const defaultContextValue: MyContextType = {
  theme: "light",
  setTheme: () => {},
  accessToken: undefined,
  setAccessToken: () => {},
  setUser: () => {},
  user: undefined,
  formatTimestamp: (timestamp: string) => {
    const formattedDate = format(new Date(timestamp), "MMMM d, yyyy");
    const formattedTime = format(new Date(timestamp), "hh:mm a");
    return {
      formattedTime,
      formattedDate,
    };
  },
  thread: [],
  setThread: () => {},
};

const MyContext = createContext<MyContextType>(defaultContextValue);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  //theme controller

  const [theme, setTheme] = useState<"dark" | "light">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [accessToken, setAccessToken] = useState<string>();
  const [user, setUser] = useState<User>();
  const [thread, setThread] = useState<Messages[]>([]);

  //format time
  const formatTimestamp = (
    timestamp: string
  ): { formattedTime: string; formattedDate: string } => {
    const formattedDate = format(timestamp, "MMMM d, yyyy");
    const formattedTime = format(timestamp, "hh:mm a");
    return {
      formattedTime,
      formattedDate,
    };
  };

  const value = {
    theme,
    setTheme,
    accessToken,
    setAccessToken,
    user,
    setUser,
    formatTimestamp,
    thread,
    setThread,
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("light");
    }
  });

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a MyContextProvider");
  }
  return context;
};
