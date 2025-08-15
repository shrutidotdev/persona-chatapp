"use client";
import { useState } from "react";
import PersonaPicker from "./component/PersonaPicker";
import ChatWindow from "./component/ChatWindow";
import { personas } from "./data/personas";
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
    
    <div className="h-screen w-full relative flex justify-center items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/bg.jpeg)",
        }}
      />

 
      <div className="relative z-10 w-full h-full flex justify-center items-center mx-auto px-6">
        
        {!showChat ? (
          <div className="text-center mb-8">
            <PersonaPicker onPersonaSelect={handlePersonaSelect} />
          </div>
        ) : (
         
          <div className="backdrop-blur-lg rounded-3xl p-4 border border-white/20 shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
           
            <div className="text-center flex-shrink-0">
              <ChatHeader 
                name={selectedPersona?.name || selectedPersonaId} 
                avatarUrl={selectedPersona?.avatar}
                key={selectedPersona?.id}
              />
            </div>
            
           
            <div className="flex-1 min-h-0">
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
        )}
      </div>
    </div>
  );
}
