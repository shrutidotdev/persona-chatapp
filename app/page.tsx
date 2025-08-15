"use client";
import { useState } from "react";
import PersonaPicker from "./component/PersonaPicker";
import ChatWindow from "./component/ChatWindow";
import { personas } from "./data/personas";
import { Button } from "@/components/ui/button";
import { ChatHeader } from "./component/ChatHeader";

export default function Home() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>("");
  const [showChat, setShowChat] = useState<boolean>(false);

  const handlePersonaSelect = (personaId: string) => {
    console.log("Selected persona ID:", personaId);
    setSelectedPersonaId(personaId);
    setShowChat(true);
  };

  const handleBackToSelector = () => {
    setShowChat(false);
    setSelectedPersonaId("");
  };


  const selectedPersona = personas.find(p => p.id === selectedPersonaId);

  console.log("Available persona IDs:", personas.map(p => p.id));
  console.log("Looking for ID:", selectedPersonaId);
  console.log("Found persona:", selectedPersona);

  return (
    <div className="min-h-screen w-full relative flex justify-center items-center overflow-hidden py-4 px-6">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/bg.jpeg)",
        }}
      />

      <div className="relative z-10 w-full py-5 flex justify-center items-center mx-auto">
        
        {!showChat ? (
          <div className="text-center mb-8">

            <PersonaPicker onPersonaSelect={handlePersonaSelect} />
          </div>
        ) : (
          <div className="backdrop-blur-lg  rounded-3xl p-4  border border-white/20 shadow-2xl w-full">
           
            <div className="text-center ">
              <ChatHeader 
              name={selectedPersona?.name || selectedPersonaId} 
              avatarUrl={selectedPersona?.avatar}
              key={selectedPersona?.id}
              />
              {/* <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
                Chat with {selectedPersona?.name || selectedPersonaId}
              </h2> */}
              <div className="">
                

                {selectedPersona ? (
                  <ChatWindow
                    persona={selectedPersona}
                    onBack={handleBackToSelector}
                  />
                ) : (
                  <div className="text-white p-4">
                    <p>❌ Persona not found!</p>
                    <p>Looking for ID: "{selectedPersonaId}"</p>
                    <p>Available IDs: {personas.map(p => p.id).join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
