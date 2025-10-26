// app/page.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Trophy,
  ArrowRight,
  Sparkles,
  Users,
  Gamepad2,
  Gift,
  CreditCard,
  FileText,
} from "lucide-react"
import confetti from "canvas-confetti"
import AnalyticsCard from "@/components/analytics-card"
import type { LeaderboardData } from "@/types"

// Countdown helper
function getTimeLeft() {
  const targetDate = new Date("2025-11-19T17:00:00")
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Home() {
  const [data, setData] = useState<LeaderboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  // Confetti on load
  useEffect(() => {
    const duration = 1800
    const end = Date.now() + duration
    const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"]
    ;(function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    })()
  }, [])

  // Timer refresh
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/leaderboard-data.json")
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error("Error loading leaderboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4285F4]"></div>
          <p className="mt-4 text-muted-foreground text-sm">
            Loading Cloud Study Jams data...
          </p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-red-500 font-medium">
          Failed to load leaderboard data. Please refresh.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFF] via-[#E8F0FE]/50 to-[#FFFFFF] dark:from-background dark:to-[#0B132B] flex flex-col items-center text-center">
      <div className="container mx-auto px-6 py-20 sm:py-24 relative z-10">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC] shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wide">
            Google Cloud Skills Boost
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] bg-clip-text text-transparent">
          Cloud Study Jams 2025
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 font-semibold mb-5">
          Veer Surendra Sai University of Technology, Burla
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-14 leading-relaxed">
          Explore the world of Google Cloud with hands-on labs, earn skill
          badges, and compete with your peers. Track your university’s progress
          in this exciting global program designed to accelerate your cloud
          learning journey!
        </p>

        {/* Countdown */}
        {timeLeft && (
          <div className="mb-16">
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4 block">
              Program Deadline Countdown
            </span>
            <div className="flex justify-center gap-6 sm:gap-10 bg-white/60 dark:bg-[#1E1E1E]/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg px-10 py-6">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center w-20 sm:w-24"
                >
                  <span className="text-4xl font-bold text-[#1A73E8]">
                    {item.value}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400 mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <Link href="/leaderboard">
            <Button className="h-12 px-6 rounded-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              View Leaderboard
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <a
            href="https://docs.google.com/spreadsheets/d/1yTPHQ4FkNghhx4bc8arij1ZyChFnQxRTxPUwDN3PgMk/edit?gid=0#gid=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="h-12 px-6 rounded-full border-[#D2E3FC] hover:bg-[#E8F0FE] text-[#1A73E8] font-semibold flex items-center gap-2 transition-all duration-300"
            >
              <FileText className="w-5 h-5" />
              Syllabus & Resources
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </div>

        {/* Analytics Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Live University Analytics
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time insights from the Cloud Study Jams dashboard
          </p>
        </div>

        {/* Analytics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-6xl mx-auto">
          <AnalyticsCard
            label="Total Participants"
            value={data.analytics.totalParticipants}
            color="#4285F4"
            icon={<Users className="w-7 h-7" />}
          />
          <AnalyticsCard
            label="Credits Redeemed"
            value={data.analytics.creditsRedeemed}
            color="#EA4335"
            icon={<CreditCard className="w-7 h-7" />}
          />
          <AnalyticsCard
            label="All Badges Completed"
            value={data.analytics.completedAllBadges}
            color="#FBBC05"
            icon={<Trophy className="w-7 h-7" />}
          />
          <AnalyticsCard
            label="Arcade Completed"
            value={data.analytics.completedArcadeGame}
            color="#34A853"
            icon={<Gamepad2 className="w-7 h-7" />}
          />
          <AnalyticsCard
            label="Eligible for Swag"
            value={data.analytics.eligibleForSwag}
            color="#9C27B0"
            icon={<Gift className="w-7 h-7" />}
          />
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>
            Last updated: {new Date(data.lastUpdated).toLocaleString()} |{" "}
            <span className="font-medium text-[#1A73E8]">
              GDG On Campus VSSUT
            </span>
          </p>
          <p className="mt-1">
            Empowering students to learn, build, and grow with Google Cloud ☁️
          </p>
        </footer>
      </div>
    </div>
  )
}
