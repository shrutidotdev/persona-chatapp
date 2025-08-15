"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Persona } from "../lib/types";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
}

interface ChatWindowProps {
  persona: Persona;
  onBack: () => void;
}

export default function ChatWindow({ persona, onBack }: ChatWindowProps) {
  if (!persona) {
    return (
      <div className="bg-white rounded-xl p-4 max-w-2xl mx-auto">
        <p className="text-red-500">Error: No persona provided</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    );
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        persona.id === "piyush-garg"
          ? `Hi! I'm ${persona.name} — ${persona.tunes?.[0] || "system design ka dost"} 😎. Kya banayein aaj? Microservice ya chai?`
          : `Namaste ji! Main ${persona.name} bol raha hoon — ${persona.tunes?.[0] || "chai ready, code steady"}`,
      sender: "ai",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post("/api/chat", {
        id: persona.id,
        userMessage: currentInput,
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.reply || "Sorry, something went wrong.",
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "Sorry, I had trouble responding. Try again!",
          sender: "ai",
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Back button */}
      <div className="flex-shrink-0 m-1">
        <Button onClick={onBack} variant="ghost" className="text-white hover:bg-white/20">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Selection
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.sender === "ai" && (
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={persona.avatar || "/placeholder.svg"} alt={persona.name} />
                <AvatarFallback className="bg-white/20 text-white text-sm">
                  {persona.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={`max-w-[70%] p-3 rounded-2xl ${
                message.sender === "user" ? "bg-blue-500 text-white" : "bg-white/20 text-white"
              }`}
            >
              <p className="text-sm ">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(parseInt(message.id)).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 p-3 rounded-lg text-sm text-gray-500">
              {persona.id === "piyush-garg"
                ? "Sir is architecting the perfect answer..."
                : "Sir is sipping chai and thinking..."}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 flex gap-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
        />
        <Button
          onClick={sendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
