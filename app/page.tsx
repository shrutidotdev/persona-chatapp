"use client";
import { useState } from "react";
import PersonaPicker from "./component/PersonaPicker";
import ChatWindow from "./component/ChatWindow";
import { personas } from "./data/personas";

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
    <div className="min-h-screen w-full relative flex justify-center items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/bg.jpeg)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto p-6">
        {!showChat ? (
          <div className="text-center mb-8">
           
            <PersonaPicker onPersonaSelect={handlePersonaSelect} />
          </div>
        ) : (
          <div className="min-h-screen backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <button
              onClick={handleBackToSelector}
              className="mb-6 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 text-white border border-white/30 shadow-lg"
            >
              ← Back to Mentor Selection
            </button>
            <div className="text-center mt-20">
              <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
                Chat with {selectedPersona?.name || selectedPersonaId}
              </h2>
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
