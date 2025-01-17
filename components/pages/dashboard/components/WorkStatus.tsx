import Container from "@/components/reusables/wrapper/Container";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import React from "react";

export function WorkStatusNotLoggedIn() {
  // const { data: session } = useSession();
  // const user = session?.user as CustomUser;

  // const workStatus = user?.workStatus || "loggedOut";
  return (
    <Container>
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col h-full py-5 justify-between">
          <h3 className="uppercase text-base text-dark-gray font-semibold">
            {"Work Status : "}
            <span className="text-orange-400 uppercase">NOT LOGGED IN</span>
          </h3>
          <p className="text-[#6A6A6A] text-base font-normal">
            {"You are not logged in."}
          </p>
        </div>

        <div className="flex flex-row items-center gap-5">
          <SquareButton
            onClick={() => {
              console.log("Login");
            }}
          >
            Login To Work
          </SquareButton>
        </div>
      </div>
    </Container>
  );
}
export function WorkStatusLoggedIn() {
  return (
    <Container>
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col h-full py-5 justify-between ">
          <h3 className="uppercase text-base text-dark-gray font-semibold">
            {"Work Status : "}
            <span className="text-[#34C759] uppercase">LOGGED IN</span>
          </h3>
          <p className="text-[#6A6A6A] text-base font-normal">
            {`You have been working for 1 hours 3 minutes 24 seconds since 09:43 AM. Feeling tired? You can always have a short break.`}
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          <SquareButton
            onClick={() => {
              console.log("Login");
            }}
            className="!text-[#ffffff] !bg-[#34C759]"
          >
            Logout from work
          </SquareButton>
          <SquareButton
            onClick={() => {
              console.log("Login");
            }}
          >
            Have a break
          </SquareButton>
        </div>
      </div>
    </Container>
  );
}

export function WorkStatusOnBreak() {
  return (
    <Container>
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col h-full py-5 justify-between">
          <h3 className="uppercase text-base text-dark-gray font-semibold">
            {"Work Status : "}
            <span className="text-primary-blue C">
              Having A Break and a kitkat
            </span>
          </h3>
          <p className="text-[#6A6A6A] text-base font-normal">
            {`You have been working for 1 hours 3 minutes 24 seconds since 09:43 AM. Feeling tired? You can always have a short break.`}
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          <SquareButton
            onClick={() => {
              console.log("Login");
            }}
            className="!text-[#ffffff] !bg-[#34C759]"
          >
            Logout from work
          </SquareButton>
          <SquareButton
            onClick={() => {
              console.log("Login");
            }}
          >
            Stop Break Time
          </SquareButton>
        </div>
      </div>
    </Container>
  );
}
