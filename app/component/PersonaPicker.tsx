"use client";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { personas } from '@/app/data/personas';

interface PersonaPickerProps {
  onPersonaSelect: (personaId: string) => void;
}

export default function PersonaPicker({ onPersonaSelect }: PersonaPickerProps) {
  const [selectedId, setSelectedId] = useState<string>('');

  const handleSelect = (personaId: string) => {
    setSelectedId(personaId);
  };

  const handleStartChat = () => {
    if (selectedId) {
      onPersonaSelect(selectedId);
    }
  };

  return (
    <div className="min-h-screen mt-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">
            ☕︎ <span className="">
              Chai With AI Mentors
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Choose your coding mentor and start learning with personalized guidance in Hinglish style
          </p>
        </div>

        {/* Persona Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {personas.map((persona) => (
            <Card
              key={persona.id}
              onClick={() => handleSelect(persona.id)}
              className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                selectedId === persona.id 
                  ? 'ring-4 ring-orange-500 shadow-2xl rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 ' 
                  : 'hover:shadow-xl'
              }`}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage 
                      src={persona.avatar} 
                      alt={persona.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {persona.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {persona.name}
                </CardTitle>
                <CardDescription className="text-lg font-medium text-gray-600">
                  {persona.title}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Bio */}
                <p className="text-gray-700 leading-relaxed text-center">
                  {persona.bio}
                </p>

                {/* Specialties */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {persona.specialties.slice(0, 4).map((skill, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                      >
                        {skill.split('•')[0].trim()}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Platform Info */}
                {persona.platform && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">
                        📚 {persona.platform.name}
                      </span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {persona.platform.students} students
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Sample Tune */}
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-4 border-l-4 border-orange-500">
                  <p className="text-gray-700 italic text-sm">
                    💭 "{persona.tunes[0]}"
                  </p>
                </div>

                {/* Selection Indicator */}
                {selectedId === persona.id && (
                  <div className="text-center">
                    <Badge className="bg-orange-500 text-white px-4 py-2 text-sm">
                      ✅ Selected
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Start Chat Button */}
        {selectedId && (
          <div className="text-center">
            <Button 
              onClick={handleStartChat}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Chat with {personas.find(p => p.id === selectedId)?.name} 🚀
            </Button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 bg-black">
          <p>Built with Next.js, TypeScript & shadcn/ui</p>
        </div>
      </div>
    </div>
  );
}
