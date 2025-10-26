"use client"

import { CheckCircle2, Circle, Mail, Award } from "@/components/icons"
import type { Participant } from "@/types"

interface ParticipantCardProps {
  participant: Participant
  rank: number
  onClick: () => void
}

export default function ParticipantCard({ participant, rank, onClick }: ParticipantCardProps) {
  return (
    <div
      onClick={onClick}
      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-elevation-2 hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer fade-in bg-white dark:bg-gray-900 hover-lift"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
            {rank}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{participant.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <Mail size={14} />
              {participant.email}
            </div>
          </div>
        </div>
        {participant.eligibleForSwag && (
          <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded">
            Swag Eligible
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Award size={16} className="text-yellow-600 dark:text-yellow-400" />
            <span className="font-bold text-gray-900 dark:text-white">{participant.skillBadgesCompleted}</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Badges</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            {participant.arcadeGamesCompleted > 0 ? (
              <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />
            ) : (
              <Circle size={16} className="text-gray-400 dark:text-gray-600" />
            )}
            <span className="font-bold text-gray-900 dark:text-white">{participant.arcadeGamesCompleted}</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Arcade</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            {participant.creditsRedeemed ? (
              <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />
            ) : (
              <Circle size={16} className="text-gray-400 dark:text-gray-600" />
            )}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Credits</p>
        </div>
      </div>

      <button
        onClick={onClick}
        className="w-full mt-4 px-3 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-sm font-semibold rounded transition-colors"
      >
        View Details
      </button>
    </div>
  )
}
