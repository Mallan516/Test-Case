import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, CreditCard, Menu, Map } from "lucide-react";

export default function BusAppWireframe() {
  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-lg bg-white">
      {/* Header with Menu and App Name */}
      <div className="flex justify-between items-center mb-4">
        <Menu className="w-6 h-6" />
        <h1 className="text-xl font-bold">Mobility</h1>
      </div>
      
      {/* Map Section */}
      <div className="relative w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
        <Map className="w-12 h-12 text-gray-500" />
        <p className="absolute bottom-2 text-sm text-gray-600">Map for Bus Stops & Places</p>
      </div>

      {/* Travel Options */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {["M", "C", "A", "B"].map((option) => (
          <Button key={option} className="bg-blue-500 text-white">{option}</Button>
        ))}
      </div>

      {/* Payment Cards */}
      <Card className="mb-4">
        <CardContent className="flex flex-col space-y-2 p-4">
          <h2 className="text-lg font-semibold">Payment Methods</h2>
          <div className="grid grid-cols-2 gap-2">
            {["Aadhaar Card", "VISA Card", "Digital Card", "Pass"].map((card) => (
              <Button key={card} variant="outline" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> {card}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Features */}
      <div className="text-center text-gray-600 text-sm">
        <p>"I am in a few steps waiting for the bus stop."</p>
        <p className="mt-2">Discount Vouchers | Keyboard Support</p>
      </div>
    </div>
  );
}