import { useState } from "react";
import { useChat } from "@/context/ChatProvider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip } from 'lucide-react';

export default function InputArea() {
  const [text, setText] = useState("");
  const { activeChannel } = useChat();

  const handleSend = async () => {
    if (activeChannel && text.trim()) {
      try {
        await activeChannel.sendMessage({
          text: text.trim(),
        });
        setText("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-background border-t">
      <div className="flex items-end space-x-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-grow"
          rows={1}
        />
        <Button size="icon" variant="ghost" className="flex-shrink-0">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Button onClick={handleSend} className="flex-shrink-0">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}