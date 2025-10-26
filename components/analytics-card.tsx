import type { ReactNode } from "react"

interface AnalyticsCardProps {
  icon: ReactNode
  label: string
  value: number
  /** Can be one of the predefined colors or any valid CSS color (hex, rgb, hsl, etc.) */
  color?: "blue" | "yellow" | "green" | "red" | "purple" | string
}

// Tailwind-based theme color classes
const colorClasses: Record<string, string> = {
  blue: "bg-chart-1/10 border-chart-1/20 text-chart-1",
  yellow: "bg-chart-3/10 border-chart-3/20 text-chart-3",
  green: "bg-chart-4/10 border-chart-4/20 text-chart-4",
  red: "bg-chart-2/10 border-chart-2/20 text-chart-2",
  purple: "bg-chart-5/10 border-chart-5/20 text-chart-5",
}

export default function AnalyticsCard({
  icon,
  label,
  value,
  color = "blue",
}: AnalyticsCardProps) {
  const isCustomColor = !(color in colorClasses)

  return (
    <div
      className={`relative p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center
                  backdrop-blur-md border border-white/10 transition-all duration-300
                  hover:scale-[1.03] hover:shadow-2xl hover:shadow-white/5
                  bg-gradient-to-br from-white/[0.04] to-white/[0.08]
                  ${!isCustomColor ? colorClasses[color] : ""} slide-in-up`}
      style={{
        animationDelay: `${Math.random() * 0.3}s`,
        ...(isCustomColor
          ? {
              backgroundColor: `${color}20`, // soft tinted background
              borderColor: `${color}40`,
              color: color,
            }
          : {}),
      }}
    >
      {/* Subtle glow ring */}
      <div
        className="absolute inset-0 rounded-2xl opacity-30 blur-xl"
        style={{
          background: isCustomColor
            ? `radial-gradient(circle at top, ${color}40 0%, transparent 80%)`
            : "",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-3 text-4xl">{icon}</div>
        <div className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {value}
        </div>
        <div className="text-sm mt-2 text-center font-medium opacity-80">
          {label}
        </div>
      </div>
    </div>
  )
}
