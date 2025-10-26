// components/confetti.tsx
"use client"

import { useEffect } from "react"

export default function Confetti() {
  useEffect(() => {
    const confettiPieces = 50
    // Use your CSS chart colors for the confetti!
    const colors = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
    ]

    for (let i = 0; i < confettiPieces; i++) {
      const confetti = document.createElement("div")
      confetti.className = "confetti" // This class triggers your CSS animation
      confetti.style.left = Math.random() * 100 + "%"
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)]
      confetti.style.width = Math.random() * 10 + 5 + "px"
      confetti.style.height = Math.random() * 10 + 5 + "px"
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0"
      // Add a random delay to stagger the fall
      confetti.style.animationDelay = Math.random() * 1.5 + "s"
      document.body.appendChild(confetti)

      // Remove the element after the animation finishes
      setTimeout(() => confetti.remove(), 2000) // 1.5s animation + 0.5s buffer
    }
  }, [])

  return null
}