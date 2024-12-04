"use client";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import Headline from "./components/headline";
import { ROLE } from "@/tempData";
import { useRouter } from "next/navigation";
interface ChatList {
  id: string;
  avatar: string;
  name: string;
  role: string;
  lastMessage: string;
  lastMessageTime: string;
}

const chatList: ChatList[] = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    name: "Liam Smith",
    role: "Developer",
    lastMessage: "Hello",
    lastMessageTime: "2:30 pm",
  },
  {
    id: "2",
    avatar:
      "",
    name: "benjamin",
    role: "Developer",
    lastMessage: "Hello",
    lastMessageTime: "2:30 pm",
  },
  {
    id: "3",
    avatar:
      "",
    name: "vanessa",  
    role: "Developer",
    lastMessage: "Hello", 
    lastMessageTime: "2:30 pm",
  },
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    name: "Liam Smith",
    role: "Developer",
    lastMessage: "Hello",
    lastMessageTime: "2:30 pm",
  },
  {
    id: "2",
    avatar:
      "",
    name: "benjamin",
    role: "Developer",
    lastMessage: "Hello",
    lastMessageTime: "2:30 pm",
  },
  {
    id: "3",
    avatar:
      "",
    name: "vanessa",  
    role: "Developer",
    lastMessage: "Hello", 
    lastMessageTime: "2:30 pm",
  },
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    name: "Liam Smith",
    role: "Developer",
    lastMessage: "Hello",
    lastMessageTime: "2:30 pm",
  },
  {
    id: "2",
    avatar:
      "",
    name: "benjamin",
    role: "Developer",
    lastMessage: "Hello",
    lastMessageTime: "2:30 pm",
  },
  {
    id: "3",
    avatar:
      "",
    name: "vanessa",  
    role: "Developer",
    lastMessage: "Hello", 
    lastMessageTime: "2:30 pm",
  },
];
export default function Chats() {
  return (
    <MainContainer role={ROLE}>
      <Headline role={ROLE}  />
      {chatList.map((chat: ChatList) => (
        <Card key={chat.id} chat={chat} />
      ))}
    </MainContainer>
  );
}

function Card({ chat, key }: { chat: ChatList; key: string }) {
  const navigate = useRouter();
  const onClickHandler = () => {
    navigate.push(`/c/project/something/chats/${chat.id}?name=${chat.name}&role=${chat.role}`);
  };
  return (
    <div key={key} onClick={onClickHandler} className="cursor-pointer w-full py-1 pl-4  hover:shadow-[5px_5px_15px_0px_#789BD399,-5px_-5px_8px_0px_#ffffffcc] rounded-xl grid grid-cols-[minmax(60px,_60px)_1fr_minmax(92px,_100px)] ">
      <div className="flex justify-center items-center">
        <div className="w-[60px] h-[60px] bg-slate-400 rounded-full overflow-hidden">
          {/* <Image src={chat.avatar} className="" alt="" /> */}
        </div>
      </div>

      <div className="flex flex-col py-3  justify-between">
        <h1 className=" text-lg font-semibold text-dark-gray mx-5">
          {chat.name} <span className="font-normal"> {`(${chat.role})`}</span>
        </h1>
        <h4 className="text-base text-dark-gray mx-5">
          {chat.lastMessage}
        </h4>
      </div>

      <div className="flex justify-end items-center mr-5 py-2  ">
        <span className="self-end text-base text-dark-gray ">{chat.lastMessageTime}</span>
      </div>
    </div>
  );
}
