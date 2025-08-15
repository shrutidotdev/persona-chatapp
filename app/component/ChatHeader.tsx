import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Phone, Video, MoreVertical } from "lucide-react"

interface ChatHeaderProps {
  name: string
  status?: string
  avatarUrl?: string
  onVideoCall?: () => void
  onVoiceCall?: () => void
  onMenu?: () => void
}

export function ChatHeader({
  name,
  status = "",
  avatarUrl,
  onVideoCall,
  onVoiceCall,
  onMenu
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 rounded-t-2xl bg-black sticky top-0 z-10">
      {/* Left: Avatar + Name + Status */}
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
            <p className="">{name}</p>
          <span className="font-light text-xs text-left">
          {/* {status && <span className="text-xs text-white">{status}</span>} */}
           Online
          </span>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={onVideoCall}>
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onVoiceCall}>
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onMenu}>
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
