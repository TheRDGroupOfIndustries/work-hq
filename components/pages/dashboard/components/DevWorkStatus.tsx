"use client";

import Container from "@/components/reusables/wrapper/Container";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { CustomUser } from "@/lib/types";
import { useSession } from "next-auth/react";
import React from "react";

const formatDuration = (duration: number) => {
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  if (hours > 0) {
    return `${hours} hours ${minutes} minutes`;
  }
  return `${minutes} minutes`;
};

const DevWorkStatus: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;
  //   console.log(user);
  const [status, setStatus] = React.useState<
    "loggedOut" | "loggedIn" | "onBreak"
  >(user?.workStatus || "loggedOut");
  const breakStartTime = localStorage.getItem("breakStartTime")
    ? Number(localStorage.getItem("breakStartTime"))
    : null;

  const handleAction = async (
    action: "login" | "logout" | "break" | "stopBreak"
  ) => {
    if (user?._id) {
      const urlMap: { [key: string]: string } = {
        login: `/api/user/performance/${user._id}/login`,
        logout: `/api/user/performance/${user._id}/logout`,
        break: `/api/user/performance/${user._id}/break`,
        stopBreak: `/api/user/performance/${user._id}/stopBreak`,
      };

      await fetch(urlMap[action], {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    if (action === "login") {
      const loginTime = new Date().toISOString();
      localStorage.setItem("loginTime", loginTime);

      setStatus("loggedIn");
      console.log("Login");
    } else if (action === "logout") {
      setStatus("loggedOut");
    } else if (action === "break") {
      const currentTime = Date.now();
      localStorage.setItem("breakStartTime", currentTime.toString());

      setStatus("onBreak");
      console.log("Taking a break");
    } else if (action === "stopBreak") {
      setStatus("loggedIn");
    }
  };

  const getCurrentDayHours = () => {
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const todayHours = user?.totalSpendHours?.find(
      (entry) => new Date(entry.date).toISOString().split("T")[0] === today
    );
    return todayHours ? todayHours.totalHours : 0;
  };

  const getCurrentDayLoggedInTime = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayHours = user?.totalSpendHours?.find(
      (entry) => new Date(entry.date).toISOString().split("T")[0] === today
    );
    return todayHours ? todayHours.loggedInTime : 0;
  };

  const workStatusMap = {
    loggedOut: {
      title: "NOT LOGGED IN",
      titleColor: "text-orange-400",
      message: "You are not logged in.",
      buttons: [
        {
          label: "Login To Work",
          onClick: async () => await handleAction("login"),
          className: "",
        },
      ],
    },
    loggedIn: {
      title: "LOGGED IN",
      titleColor: "text-[#34C759]",
      message: `You have been working for ${formatDuration(
        getCurrentDayHours()
      )} today since ${new Date(getCurrentDayLoggedInTime()).toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )}. Feeling tired? You can always have a short break.`,
      buttons: [
        {
          label: "Logout from work",
          onClick: async () => {
            console.log("Logout");
            await handleAction("logout");
            setStatus("loggedOut");
          },
          className: "!text-[#ffffff] !bg-[#34C759]",
        },
        {
          label: "Have a break",
          onClick: async () => await handleAction("break"),
          className: "",
        },
        ...(Date.now() -
          new Date(localStorage.getItem("loginTime") || "").getTime() >
        2 * 60 * 60 * 1000
          ? [
              {
                label: "Take a Break",
                onClick: async () => await handleAction("break"),
                className: "",
              },
            ]
          : []),
      ],
    },
    onBreak: {
      title: "HAVING A BREAK AND A KITKAT",
      titleColor: "text-primary-blue",
      message: `You have been working for ${formatDuration(
        getCurrentDayHours()
      )} today since ${new Date(getCurrentDayLoggedInTime()).toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )}. You have been on break for ${formatDuration(
        breakStartTime ? Date.now() - breakStartTime : 0
      )}. Feeling tired? You can always have a short break.`,
      buttons: [
        {
          label: "Logout from work",
          onClick: async () => {
            console.log("Logout");
            await handleAction("logout");
            setStatus("loggedOut");
          },
          className: "!text-[#ffffff] !bg-[#34C759]",
        },
        {
          label: "Stop Break Time",
          onClick: async () => {
            console.log("Stop Break");
            await handleAction("stopBreak");
            setStatus("loggedIn");
          },
          className: "",
        },
      ],
    },
  };

  const currentStatus = workStatusMap[status];

  return (
    <Container>
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col h-full py-5 justify-between">
          <h3 className="uppercase text-base text-dark-gray font-semibold">
            {"Work Status : "}
            <span className={`${currentStatus.titleColor} uppercase`}>
              {currentStatus.title}
            </span>
          </h3>
          <p className="text-[#6A6A6A] text-base font-normal">
            {currentStatus.message}
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          {currentStatus.buttons.map((button, index) => (
            <SquareButton
              key={index}
              onClick={button.onClick}
              className={button.className}
            >
              {button.label}
            </SquareButton>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default DevWorkStatus;
