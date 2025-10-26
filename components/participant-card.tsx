"use client"

import { CheckCircle2, Circle, Mail, Award, Trophy, Star, Zap, ExternalLink } from "lucide-react"
import type { Participant } from "@/types"

interface ParticipantCardProps {
  participant: Participant
  rank: number
  onClick: () => void
}

export default function ParticipantCard({ participant, rank, onClick }: ParticipantCardProps) {
  const skillBadgesCompleted = participant.skillBadgesCompleted || participant.badges || 0
  const arcadeGamesCompleted = participant.arcadeGamesCompleted || (participant.completedArcadeGame ? 1 : 0)
  const creditsRedeemed = participant.accessCodeRedeemed || false
  const completion = (participant.skillBadgesCompleted + participant.arcadeGamesCompleted) / 0.2 || 0

  const getRankColor = (rank: number) => {
    if (rank === 1) return "from-yellow-400 to-yellow-600"
    if (rank === 2) return "from-gray-400 to-gray-600"
    if (rank === 3) return "from-orange-400 to-orange-600"
    return "from-blue-500 to-purple-600"
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🏆"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return `#${rank}`
  }

  return (
    <div
      onClick={onClick}
      className="group p-6 border border-gray-200/60 dark:border-gray-700/60 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800/80 hover:shadow-xl hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4 flex-1">
            {/* Rank Badge */}
            <div className={`shrink-0 w-14 h-14 rounded-2xl bg-linear-to-br ${getRankColor(rank)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
              {getRankIcon(rank)}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg truncate">
                {participant.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                <Mail size={14} className="shrink-0" />
                <span className="truncate">{participant.email}</span>
              </div>
              {participant.qwiklabsId && (
                <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 mt-1">
                  <Zap size={12} />
                  <span>ID: {participant.qwiklabsId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Swag Eligible Badge */}
          {participant.eligibleForSwag && (
            <div className="shrink-0 px-3 py-1 bg-linear-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg transform group-hover:scale-105 transition-transform">
              🎁 Swag Eligible
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span className="font-semibold text-gray-900 dark:text-white">{completion}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-linear-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Badges */}
          <div className="text-center p-3 bg-linear-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-xl border border-amber-200/50 dark:border-amber-700/30">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Award size={18} className="text-amber-600 dark:text-amber-400" />
              <span className="font-bold text-gray-900 dark:text-white text-lg">
                {skillBadgesCompleted}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Badges</p>
          </div>

          {/* Arcade */}
          <div className="text-center p-3 bg-linear-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-700/30">
            <div className="flex items-center justify-center gap-2 mb-1">
              {arcadeGamesCompleted > 0 ? (
                <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Circle size={18} className="text-gray-400 dark:text-gray-600" />
              )}
              <span className="font-bold text-gray-900 dark:text-white text-lg">
                {arcadeGamesCompleted}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Arcade</p>
          </div>

          {/* Credits */}
          <div className="text-center p-3 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200/50 dark:border-blue-700/30">
            <div className="flex items-center justify-center gap-2 mb-1">
              {creditsRedeemed ? (
                <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400" />
              ) : (
                <Circle size={18} className="text-gray-400 dark:text-gray-600" />
              )}
              <span className="font-bold text-gray-900 dark:text-white text-lg">
                {creditsRedeemed ? "Yes" : "No"}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Credits</p>
          </div>
        </div>

        {/* Track Info */}
        {participant.track && (
          <div className="mb-4 p-3 bg-linear-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 rounded-lg border border-gray-200/50 dark:border-gray-600/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Track</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400 text-sm">
                {participant.track}
              </span>
            </div>
          </div>
        )}

        {/* View Details Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
          className="w-full group/btn py-3 px-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          View Details
          <ExternalLink size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  )
}