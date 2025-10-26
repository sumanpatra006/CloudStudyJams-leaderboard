"use client"

import { X, ExternalLink, Mail, Award, Gamepad2, Gift, Calendar, Zap, Star, CheckCircle, Circle } from "lucide-react"
import type { Participant } from "@/types"

interface ParticipantModalProps {
  participant: Participant
  onClose: () => void
}

export default function ParticipantModal({ participant, onClose }: ParticipantModalProps) {
  // Safe property access with fallbacks
  const skillBadgesCompleted = participant.skillBadgesCompleted || participant.badges || 0
  const arcadeGamesCompleted = participant.arcadeGamesCompleted || (participant.completedArcadeGame ? 1 : 0)
  const creditsRedeemed = participant.accessCodeRedeemed || false
  const profileStatus = participant.profileStatus || "Active"
  const skillBadgeNames = participant.completedBadges || []
  const arcadeGameNames = participant.completedArcadeGames || []
  const completion = (participant.skillBadgesCompleted + participant.arcadeGamesCompleted) / 0.2 || 0

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const getCompletionColor = (completion: number) => {
    if (completion >= 80) return "from-green-500 to-emerald-600"
    if (completion >= 50) return "from-yellow-500 to-amber-600"
    if (completion >= 25) return "from-orange-500 to-red-500"
    return "from-gray-400 to-gray-600"
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-8 duration-300 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {participant.rank || "?"}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{participant.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{participant.track}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 hover:scale-110"
            aria-label="cancel"
          >
            <X size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Progress Overview */}
          <div className="bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-5 border border-blue-200/50 dark:border-blue-700/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Overall Progress</h3>
              <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {completion}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className={`h-3 rounded-full bg-linear-to-r ${getCompletionColor(completion)} transition-all duration-1000 ease-out`}
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
              </div>
              <a
                href={`mailto:${participant.email}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors break-all"
              >
                {participant.email}
              </a>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Qwiklabs ID</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-mono">{participant.qwiklabsId}</p>
            </div>
          </div>

          {/* Profile Status & Last Updated */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-4 border border-green-200/50 dark:border-green-700/30">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Status</h3>
              </div>
              <p className="text-green-700 dark:text-green-300 font-semibold">{profileStatus}</p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-4 border border-purple-200/50 dark:border-purple-700/30">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Last Updated</h3>
              </div>
              <p className="text-purple-700 dark:text-purple-300">
                {new Date(participant.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Skill Badges */}
          <div className="bg-linear-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-xl p-5 border border-amber-200/50 dark:border-amber-700/30">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skill Badges</h3>
              <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                {skillBadgesCompleted}
              </span>
            </div>
            
            {skillBadgeNames.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {skillBadgeNames.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-amber-200/30 dark:border-amber-700/20"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Circle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400">No skill badges completed yet</p>
              </div>
            )}
          </div>

          {/* Arcade Games */}
          <div className="bg-linear-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-xl p-5 border border-emerald-200/50 dark:border-emerald-700/30">
            <div className="flex items-center gap-3 mb-4">
              <Gamepad2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Arcade Games</h3>
              <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                {arcadeGamesCompleted}
              </span>
            </div>
            
            {arcadeGameNames.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {arcadeGameNames.map((game, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-emerald-200/30 dark:border-emerald-700/20"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{game}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Circle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400">No arcade games completed yet</p>
              </div>
            )}
          </div>

          {/* Rewards & Eligibility */}
          <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-5 border border-purple-200/50 dark:border-purple-700/30">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rewards & Eligibility</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                participant.eligibleForSwag 
                  ? "bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-300 dark:border-green-600" 
                  : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
              }`}>
                <div className="flex items-center gap-3">
                  {participant.eligibleForSwag ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className={`font-semibold ${
                    participant.eligibleForSwag 
                      ? "text-green-700 dark:text-green-300" 
                      : "text-gray-600 dark:text-gray-400"
                  }`}>
                    Swag Eligible
                  </span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                creditsRedeemed
                  ? "bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-300 dark:border-blue-600" 
                  : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
              }`}>
                <div className="flex items-center gap-3">
                  {creditsRedeemed ? (
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className={`font-semibold ${
                    creditsRedeemed 
                      ? "text-blue-700 dark:text-blue-300" 
                      : "text-gray-600 dark:text-gray-400"
                  }`}>
                    Credits Redeemed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Link */}
          {participant.profileUrl && (
            <div className="text-center">
              <a
                href={participant.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <ExternalLink size={18} />
                View Google Cloud Profile
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}