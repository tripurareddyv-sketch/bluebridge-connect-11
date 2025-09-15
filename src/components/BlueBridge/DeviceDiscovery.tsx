import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Device } from "./BlueBridge";
import { Bluetooth, Smartphone, Waves } from "lucide-react";

interface DeviceDiscoveryProps {
  onDeviceSelect: (device: Device) => void;
}

export const DeviceDiscovery = ({ onDeviceSelect }: DeviceDiscoveryProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredDevices, setDiscoveredDevices] = useState<Device[]>([]);

  // Simulate device discovery
  const startScanning = () => {
    setIsScanning(true);
    setDiscoveredDevices([]);

    const mockDevices: Device[] = [
      {
        id: "1",
        name: "Alex's iPhone",
        distance: "close",
        lastSeen: new Date(),
      },
      {
        id: "2", 
        name: "Samsung Galaxy S23",
        distance: "medium",
        lastSeen: new Date(),
      },
      {
        id: "3",
        name: "OnePlus 11",
        distance: "far",
        lastSeen: new Date(),
      },
    ];

    // Simulate gradual device discovery
    mockDevices.forEach((device, index) => {
      setTimeout(() => {
        setDiscoveredDevices(prev => [...prev, device]);
      }, (index + 1) * 1500);
    });

    // Stop scanning after 6 seconds
    setTimeout(() => {
      setIsScanning(false);
    }, 6000);
  };

  const getSignalStrength = (distance: Device["distance"]) => {
    switch (distance) {
      case "close": return "Strong";
      case "medium": return "Medium";
      case "far": return "Weak";
    }
  };

  const getSignalBars = (distance: Device["distance"]) => {
    const bars = distance === "close" ? 3 : distance === "medium" ? 2 : 1;
    return Array.from({ length: 3 }, (_, i) => (
      <div
        key={i}
        className={`w-1 rounded-full ${
          i < bars 
            ? "bg-connection-success h-4" 
            : "bg-white/30 h-2"
        }`}
      />
    ));
  };

  return (
    <div className="flex-1 p-4">
      <div className="text-center mb-8 mt-8">
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bluetooth className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-white text-2xl font-bold mb-2">Discover Devices</h2>
        <p className="text-white/70 text-sm mb-6">
          Find nearby Android devices to start chatting
        </p>
        
        <Button
          onClick={startScanning}
          disabled={isScanning}
          className="bg-white text-primary hover:bg-white/90 px-8 py-3 font-semibold rounded-xl shadow-glow"
        >
          {isScanning ? (
            <>
              <Waves className="w-4 h-4 mr-2 animate-pulse" />
              Scanning...
            </>
          ) : (
            <>
              <Bluetooth className="w-4 h-4 mr-2" />
              Start Scanning
            </>
          )}
        </Button>
      </div>

      {isScanning && (
        <div className="text-center mb-6">
          <div className="flex justify-center space-x-1 mb-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-8 bg-white/50 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <p className="text-white/70 text-sm">Looking for nearby devices...</p>
        </div>
      )}

      <div className="space-y-3">
        {discoveredDevices.map((device) => (
          <Card
            key={device.id}
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-message"
            onClick={() => onDeviceSelect(device)}
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{device.name}</p>
                  <p className="text-white/70 text-sm">
                    Signal: {getSignalStrength(device.distance)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {getSignalBars(device.distance)}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {discoveredDevices.length === 0 && !isScanning && (
        <div className="text-center text-white/70 mt-12">
          <Bluetooth className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No devices found yet</p>
          <p className="text-sm mt-1">Make sure other devices are discoverable</p>
        </div>
      )}
    </div>
  );
};