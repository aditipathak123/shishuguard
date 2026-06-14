"use client"

import { MessageCircle } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../components/ui/tooltip"

export default function Chatbot() {
  const router = useRouter()
  const pathname = usePathname()

  const [showButton, setShowButton] = useState(true)

  useEffect(() => {
    if (pathname === "/ShishuGuardAi") {
      setShowButton(false)
    } else {
      setShowButton(true)
    }
  }, [pathname])

  if (!showButton) return null

  const handleOpenChat = () => {
    router.push("/ShishuGuardAi")
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleOpenChat}
            className="fixed bottom-6 right-6 z-50 
            bg-gradient-to-r from-pink-500 to-rose-500 
            hover:scale-110 hover:shadow-xl
            text-white p-3 rounded-full 
            transition-all duration-300 ease-in-out 
            flex items-center justify-center"
            aria-label="Open AI Assistant"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </TooltipTrigger>

        <TooltipContent side="left">
          Talk to Smart Baby Assistant 💬
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}