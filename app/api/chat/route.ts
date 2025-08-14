import { NextRequest, NextResponse } from "next/server";
import { personas } from "@/app/data/personas";
import { chatLLM, Tone } from "@/app/lib/llm"; 
import { Persona } from "@/app/lib/types";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, tone, userMessage, temperature = 0.7 } = body;
        
    
        if (!id || !userMessage) {
            return NextResponse.json({
                error: 'Missing persona id or user input message'
            }, { status: 400 });  
        }

        
        const persona: Persona | undefined = personas.find(p => p.id === id);
        
        if (!persona) {
            return NextResponse.json({ 
                error: `Persona not found. Available IDs: ${personas.map(p => p.id).join(', ')}` 
            }, { status: 404 });
        }

        
        const reply = await chatLLM(persona, (tone as Tone) || 'default', userMessage, temperature);
        
        return NextResponse.json({ reply });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({
            error: 'Failed to generate response'
        }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: "API is working!" });
}
