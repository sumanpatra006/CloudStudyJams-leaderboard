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
  Clock,
  Calendar,
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
  const [isVisible, setIsVisible] = useState(false)

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

  // Animation trigger
  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-100/20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4285F4]"></div>
          <p className="mt-4 text-gray-600 text-sm font-medium">
            Loading Cloud Study Jams data...
          </p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-100/20">
        <p className="text-red-500 font-medium bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-red-200">
          Failed to load leaderboard data. Please refresh.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-100/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-900/10">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        {/* Header Section */}
        <div className={`max-w-4xl mx-auto text-center mb-16 lg:mb-24 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200/60 dark:border-blue-800/60 shadow-sm hover:shadow-md transition-shadow duration-300">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300 tracking-wide">
              Google Cloud Skills Boost
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight">
              <span className="bg-linear-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] bg-clip-text text-transparent">
                Cloud Study Jams 2025
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 font-semibold">
              Veer Surendra Sai University of Technology, Burla
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 px-4">
            Explore the world of Google Cloud with hands-on labs, earn skill
            badges, and compete with your peers. Track your university's progress
            in this exciting global program designed to accelerate your cloud
            learning journey!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <Link href="/leaderboard">
              <Button className="h-12 px-8 rounded-xl bg-linear-to-r from-[#4285F4] to-[#3367D6] hover:from-[#3367D6] hover:to-[#2851C5] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 group">
                <Trophy className="w-5 h-5" />
                View Leaderboard
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a
              href="https://docs.google.com/spreadsheets/d/1yTPHQ4FkNghhx4bc8arij1ZyChFnQxRTxPUwDN3PgMk/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="h-12 px-8 rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-blue-950/30 text-blue-700 dark:text-blue-300 font-semibold flex items-center gap-3 group transition-all duration-300"
              >
                <FileText className="w-5 h-5" />
                Syllabus & Resources
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        </div>

        {/* Countdown Section */}
        {timeLeft && (
          <div className={`max-w-2xl mx-auto mb-20 lg:mb-28 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center gap-3 mb-6 text-gray-700 dark:text-gray-300">
              <Clock className="w-5 h-5" />
              <span className="text-lg font-semibold">Program Deadline Countdown</span>
            </div>
            
            <div className="grid grid-cols-4 gap-3 sm:gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl shadow-lg p-6">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-linear-to-b from-white to-gray-50/80 dark:from-gray-800 dark:to-gray-700/80 shadow-inner"
                >
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Section */}
        <div className={`max-w-7xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Section Header */}
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Live University Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Real-time insights from the Cloud Study Jams dashboard
            </p>
          </div>

          {/* Analytics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            <AnalyticsCard
              label="Total Participants"
              value={data.analytics.totalParticipants}
              color="#4285F4"
              icon={<Users className="w-6 h-6" />}
            />
            <AnalyticsCard
              label="Credits Redeemed"
              value={data.analytics.creditsRedeemed}
              color="#EA4335"
              icon={<CreditCard className="w-6 h-6" />}
            />
            <AnalyticsCard
              label="All Badges Completed"
              value={data.analytics.completedAllBadges}
              color="#FBBC05"
              icon={<Trophy className="w-6 h-6" />}
            />
            <AnalyticsCard
              label="Arcade Completed"
              value={data.analytics.completedArcadeGame}
              color="#34A853"
              icon={<Gamepad2 className="w-6 h-6" />}
            />
            <AnalyticsCard
              label="Eligible for Swag"
              value={data.analytics.eligibleForSwag}
              color="#9C27B0"
              icon={<Gift className="w-6 h-6" />}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className={`mt-20 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              Last updated: {new Date(data.lastUpdated).toLocaleString()}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                GDG On Campus VSSUT
              </span>
            </p>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
              Empowering students to learn, build, and grow with Google Cloud ☁️
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}