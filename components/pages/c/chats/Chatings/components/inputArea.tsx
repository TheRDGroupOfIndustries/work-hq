"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { EditorContent } from "./EditorContent";
import Toolbar from "./toolbar";

export default function InputArea() {
  const [text, setText] = useState("");
  console.log(text);

  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  const handleFormat = (command: string) => {
    document.execCommand(command, false);
    // Toggle format in active formats
    setActiveFormats((prev) => {
      const newFormats = new Set(prev);
      if (newFormats.has(command)) {
        newFormats.delete(command);
      } else {
        newFormats.add(command);
      }
      return newFormats;
    });
  };

  const checkFormat = () => {
    const formats = [
      "bold",
      "italic",
      "underline",
      "justifyLeft",
      "justifyCenter",
      "justifyRight",
      "insertUnorderedList",
    ];
    const active = new Set(
      formats.filter((format) => document.queryCommandState(format))
    );
    setActiveFormats(active);
  };

  return (
    <div className="w-full h-[150px] ">
      <div className="w-full h-full rounded-xl bg-primary-sky-blue shadow-[5px_5px_20px_0px_#7BA9EF99,-5px_-5px_20px_0px_#FFFFFF,-5px_-5px_20px_0px_#7BA9EF99_inset,5px_5px_20px_0px_#7BA9EF99_inset] ">
        <div className="w-full h-full flex flex-col p-3">
          <div className="flex-1 w-full h-full max-h-[70px]">
            <ScrollArea className="h-[70px]">
              <EditorContent
                onTextChange={setText}
                onFormatCheck={checkFormat}
              />
            </ScrollArea>
          </div>

          <div className=" w-full flex items-center justify-between ">
            <div className="flex-1 h-full w-full flex items-center">
              <Toolbar
                handleFormat={handleFormat}
                activeFormats={activeFormats}
              />
            </div>

            <SendButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function SendButton() {
  return (
    <div className=" w-full mt-auto  flex flex-row items-center justify-end">
      <button className="flex flex-row items-center py-3 px-5 gap-4 shadow-[3px_3px_10px_0px_#789BD399,5px_5px_15px_0px_#00000099_inset,-3px_-3px_10px_0px_#FFFFFF] rounded-xl text-[#ffffff] font-semibold text-nowrap bg-primary-blue">
        <SendHorizontal color="#ffffff" />
        Send
      </button>
    </div>
  );
}
