// component/ChatWindow.tsx
"use client";
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Persona } from '../lib/types';
import axios from 'axios';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'ai';
}

interface ChatWindowProps {
    persona: Persona;
    onBack: () => void;
}

export default function ChatWindow({ persona, onBack }: ChatWindowProps) {
    // ✅ SAFETY CHECK - Return early if no persona
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
            id: '1',
            content: persona.id === "piyush-garg"
                ?
                `Hi! I'm ${persona.name} — ${persona.tunes?.[0] || "system design ka dost"} 😎. Kya banayein aaj? Microservice ya chai?`
                : `Namaste ji! Main ${persona.name} bol raha hoon — ${persona.tunes?.[0] || "chai ready, code steady"}`,

            sender: 'ai'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputMessage,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputMessage;
        setInputMessage('');
        setIsLoading(true);
 try {
            const response = await axios.post('/api/chat', {
                id: persona.id,
                userMessage: currentInput,
            });

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: response.data.reply || 'Sorry, something went wrong.',
                sender: 'ai'
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                content: 'Sorry, I had trouble responding. Try again!',
                sender: 'ai'
            }]);
        }

        setIsLoading(false);
    };

    return (
        <div className="w-full max-w-7xl mx-auto h-screen flex flex-col justify-between">
            {/* <h3 className="text-xl font-bold mb-4 text-gray-800">Chat with {persona.name}</h3> */}

            <div className="space-y-2 mb-4 overflow-y-auto rounded p-2 mt-20">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-xs py-4 px-6 rounded-2xl  ${message.sender === 'user' ? 'bg-black text-white' : ' bg-gradient-to-r from-pink-400  to-black rounded-2xl  text-white'
                            }`}>
                            <p className="text-sm font-semibold tracking-wide leading-6 ">{message.content}</p>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">
                                {persona.id === "piyush-garg"
                                    ? "Sir is architecting the perfect answer..."
                                    : "Sir is sipping chai and thinking..."}
                            </p>

                        </div>
                    </div>
                )}
            </div>

           <div className="flex gap-2 p-4">
                <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask something..."
                    disabled={isLoading}
                    className="flex-1 py-6 text-white rounded-2xl"
                />
                <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className='bg-black py-6 px-6 rounded-2xl hover:bg-purple-600'
                >
                    Send
                </Button>
            </div>
        </div>
    );
}
