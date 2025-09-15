import { Bluetooth, BluetoothConnected, Loader2 } from "lucide-react";

interface ConnectionStatusProps {
  status: "discovery" | "connecting" | "connected";
}

export const ConnectionStatus = ({ status }: ConnectionStatusProps) => {
  const getStatusDisplay = () => {
    switch (status) {
      case "discovery":
        return {
          icon: <Bluetooth className="w-4 h-4" />,
          color: "text-white/70",
          text: "Searching",
        };
      case "connecting":
        return {
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
          color: "text-connection-pending",
          text: "Connecting",
        };
      case "connected":
        return {
          icon: <BluetoothConnected className="w-4 h-4" />,
          color: "text-connection-success",
          text: "Connected",
        };
    }
  };

  const { icon, color, text } = getStatusDisplay();

  return (
    <div className={`flex items-center gap-1 ${color} text-sm`}>
      {icon}
      <span className="hidden sm:inline">{text}</span>
    </div>
  );
};