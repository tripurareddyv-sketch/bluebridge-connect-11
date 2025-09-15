import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Device, Message } from "./BlueBridge";
import { MessageBubble } from "./MessageBubble";
import { Send, ArrowLeft } from "lucide-react";

interface ChatInterfaceProps {
  device: Device;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onDisconnect: () => void;
}

export const ChatInterface = ({ 
  device, 
  messages, 
  onSendMessage, 
  onDisconnect 
}: ChatInterfaceProps) => {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simulate receiving messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === "me") {
        // Simulate a response after 2-4 seconds
        const timeout = setTimeout(() => {
          const responses = [
            "Hey! Got your message 👋",
            "That's awesome!",
            "Thanks for reaching out",
            "How's everything going?",
            "Nice to connect via BlueBridge!",
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          
          // Add this as a received message (simulate)
          const receivedMessage: Message = {
            id: Date.now().toString(),
            text: randomResponse,
            timestamp: new Date(),
            sender: "them",
            status: "delivered",
          };
          // This would normally come from the parent component
        }, Math.random() * 2000 + 2000);

        return () => clearTimeout(timeout);
      }
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDisconnect}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <p className="text-white font-medium">{device.name}</p>
            <p className="text-white/70 text-xs">Connected via Bluetooth</p>
          </div>
          <div className="w-2 h-2 bg-connection-success rounded-full"></div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-white/70 mt-8">
            <p>Start your conversation with {device.name}</p>
            <p className="text-sm mt-1">All messages are encrypted and private</p>
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white/10 backdrop-blur-sm border-t border-white/20 p-4">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-xl"
          />
          <Button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="bg-white text-primary hover:bg-white/90 rounded-xl px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};