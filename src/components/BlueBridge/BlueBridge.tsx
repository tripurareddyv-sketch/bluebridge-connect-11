import { useState } from "react";
import { DeviceDiscovery } from "./DeviceDiscovery";
import { ChatInterface } from "./ChatInterface";
import { ConnectionStatus } from "./ConnectionStatus";

export type Device = {
  id: string;
  name: string;
  distance: "close" | "medium" | "far";
  lastSeen: Date;
};

export type Message = {
  id: string;
  text: string;
  timestamp: Date;
  sender: "me" | "them";
  status: "sent" | "delivered" | "read";
};

type AppState = "discovery" | "connecting" | "connected";

export const BlueBridge = () => {
  const [appState, setAppState] = useState<AppState>("discovery");
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleDeviceSelect = (device: Device) => {
    setConnectedDevice(device);
    setAppState("connecting");
    
    // Simulate connection process
    setTimeout(() => {
      setAppState("connected");
    }, 2000);
  };

  const handleDisconnect = () => {
    setConnectedDevice(null);
    setAppState("discovery");
    setMessages([]);
  };

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      sender: "me",
      status: "sent",
    };
    setMessages(prev => [...prev, newMessage]);

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: "delivered" }
            : msg
        )
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto max-w-md h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">B</span>
              </div>
              <h1 className="text-white text-xl font-bold">BlueBridge</h1>
            </div>
            <ConnectionStatus status={appState} />
          </div>
          {connectedDevice && (
            <div className="mt-2 text-white/80 text-sm">
              Connected to {connectedDevice.name}
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {appState === "discovery" && (
            <DeviceDiscovery onDeviceSelect={handleDeviceSelect} />
          )}
          
          {appState === "connecting" && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
                <p className="text-lg font-medium">Connecting to {connectedDevice?.name}...</p>
                <p className="text-white/70 text-sm mt-1">Make sure Bluetooth is enabled on both devices</p>
              </div>
            </div>
          )}
          
          {appState === "connected" && connectedDevice && (
            <ChatInterface
              device={connectedDevice}
              messages={messages}
              onSendMessage={handleSendMessage}
              onDisconnect={handleDisconnect}
            />
          )}
        </main>
      </div>
    </div>
  );
};