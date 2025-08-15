"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { personas } from "@/app/data/personas"

interface PersonaPickerProps {
  onPersonaSelect: (personaId: string) => void
}

export default function PersonaPicker({ onPersonaSelect }: PersonaPickerProps) {
  const [selectedId, setSelectedId] = useState<string>("")

  const handleSelect = (personaId: string) => {
    setSelectedId(personaId)
  }

  const handleStartChat = () => {
    if (selectedId) {
      onPersonaSelect(selectedId)
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-between space-y-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 text-white">
          ☕︎ <span className="">Chai With AI Mentors</span>
        </h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto">
          Choose your coding mentor and start learning with personalized guidance in Hinglish style
        </p>
      </div>

      {/* Persona Cards */}
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {personas.map((persona) => (
            <Card
              key={persona.id}
              onClick={() => handleSelect(persona.id)}
              className={`w-80 bg-white/50 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105`}
            >
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={persona.avatar || "/placeholder.svg"}
                      alt={persona.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-lg font-bold bg-black text-white">
                      {persona.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl font-extrabold text-black">{persona.name}</CardTitle>
                <CardDescription className="text-base font-bold text-gray-600">{persona.title}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Bio */}
                <p className="text-gray-700 leading-relaxed text-center text-sm line-clamp-2">{persona.bio}</p>

                {/* Specialties */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm text-center">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {persona.specialties.slice(0, 3).map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-black/20 text-xs px-2 py-1"
                      >
                        {skill.split("•")[0].trim()}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Platform Info */}
                {persona.platform && (
                  <div className="bg-black text-white rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">📚 {persona.platform.name}</span>
                      <Badge variant="outline" className="bg-white text-black font-bold text-xs">
                        {persona.platform.students} students
                      </Badge>
                    </div>
                  </div>
                )}

                {/*  Tune */}
                <div className="bg-gradient-to-r from-purple-700 via-pink-400 to-purple-500 rounded-lg p-3 border-l-4 border-purple-950">
                  <p className="text-white font-bold italic text-xs line-clamp-2">💭 "{persona.tunes[0]}"</p>
                </div>

              </CardContent>
            </Card>
          ))}
      </div>

      {/* Start Chat Button */}
      {selectedId && (
        <div className="text-center mt-8">
          <Button
            onClick={handleStartChat}
            size="lg"
            className="font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-500 text-white rounded-2xl cursor-pointer py-7 px-10"
          >
            Start Chat with {personas.find((p) => p.id === selectedId)?.name} 
          </Button>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-16">
        <p className="text-white font-bold text-xl">Built with Next.js, TypeScript & shadcn/ui</p>
      </div>
    </div>
  )
}