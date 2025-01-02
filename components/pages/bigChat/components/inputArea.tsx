"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/context/ChatProvider";
import { SendHorizontal, Paperclip } from 'lucide-react';
import { useState, useRef } from "react";

export default function InputArea() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const { activeChannel } = useChat();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (activeChannel && (text.trim() || files.length > 0)) {
      try {
        const formData = new FormData();
        formData.append('text', text);
        files.forEach(file => formData.append('files', file));

        const response = await fetch(
          `/api/chats/${activeChannel.id}/messages`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        setText("");
        setFiles([]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  return (
    <div className="w-full h-[150px]">
      <div className="w-full h-full rounded-xl bg-primary-sky-blue shadow-[5px_5px_20px_0px_#7BA9EF99,-5px_-5px_20px_0px_#FFFFFF,-5px_-5px_20px_0px_#7BA9EF99_inset,5px_5px_20px_0px_#7BA9EF99_inset]">
        <div className="w-full h-full flex flex-col p-3">
          <div className="flex-1 w-full h-full max-h-[70px]">
            <ScrollArea className="h-[70px]">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-full resize-none outline-none bg-transparent"
                placeholder="Type your message..."
              />
            </ScrollArea>
          </div>

          <div className="w-full flex items-center justify-between">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <Paperclip />
            </button>
            {files.length > 0 && (
              <div className="text-sm text-gray-600">
                {files.length} file(s) selected
              </div>
            )}
            <SendButton onSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SendButton({ onSend }: { onSend: () => void }) {
  return (
    <button
      onClick={onSend}
      className="flex flex-row items-center py-3 px-5 gap-4 shadow-[3px_3px_10px_0px_#789BD399,5px_5px_15px_0px_#00000099_inset,-3px_-3px_10px_0px_#FFFFFF] rounded-xl text-[#ffffff] font-semibold text-nowrap bg-primary-blue"
    >
      <SendHorizontal color="#ffffff" />
      Send
    </button>
  );
}