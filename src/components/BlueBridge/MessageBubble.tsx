import { Message } from "./BlueBridge";
import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isMe = message.sender === "me";

  const getStatusIcon = () => {
    switch (message.status) {
      case "sent":
        return <Check className="w-3 h-3" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-connection-success" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl p-3 shadow-message ${
          isMe
            ? "bg-chat-sent text-white rounded-br-md"
            : "bg-chat-received text-gray-800 rounded-bl-md"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div className={`flex items-center justify-end gap-1 mt-1 ${
          isMe ? "text-white/70" : "text-gray-500"
        }`}>
          <span className="text-xs">
            {message.timestamp.toLocaleTimeString([], { 
              hour: "2-digit", 
              minute: "2-digit" 
            })}
          </span>
          {isMe && (
            <div className="ml-1">
              {getStatusIcon()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};