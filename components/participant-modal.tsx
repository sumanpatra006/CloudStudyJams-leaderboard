"use client"

import { X, ExternalLink, Mail, Award, Gamepad2, Gift } from "@/components/icons"
import type { Participant } from "@/types"

interface ParticipantModalProps {
  participant: Participant
  onClose: () => void
}

export default function ParticipantModal({ participant, onClose }: ParticipantModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto scale-in shadow-elevation-4">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{participant.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="slide-in-up">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h3>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
              <Mail size={18} className="text-blue-600 dark:text-blue-400" />
              <a
                href={`mailto:${participant.email}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {participant.email}
              </a>
            </div>
            {participant.profileUrl && (
              <a
                href={participant.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <ExternalLink size={18} />
                View Google Cloud Profile
              </a>
            )}
          </div>

          {/* Profile Status */}
          <div className="slide-in-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Profile Status</h3>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300">{participant.profileStatus}</p>
            </div>
          </div>

          {/* Skill Badges */}
          <div className="slide-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Award size={20} className="text-yellow-600 dark:text-yellow-400" />
              Skill Badges ({participant.skillBadgesCompleted}/19)
            </h3>
            {participant.skillBadgeNames.length > 0 ? (
              <div className="space-y-2">
                {participant.skillBadgeNames.map((badge, index) => (
                  <div
                    key={index}
                    className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg"
                  >
                    <p className="text-gray-700 dark:text-yellow-100">{badge}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No skill badges completed yet</p>
            )}
          </div>

          {/* Arcade Games */}
          <div className="slide-in-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Gamepad2 size={20} className="text-green-600 dark:text-green-400" />
              Arcade Games ({participant.arcadeGamesCompleted})
            </h3>
            {participant.arcadeGameNames.length > 0 ? (
              <div className="space-y-2">
                {participant.arcadeGameNames.map((game, index) => (
                  <div
                    key={index}
                    className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg"
                  >
                    <p className="text-gray-700 dark:text-green-100">{game}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No arcade games completed yet</p>
            )}
          </div>

          {/* Rewards */}
          <div className="slide-in-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Gift size={20} className="text-purple-600 dark:text-purple-400" />
              Rewards
            </h3>
            <div className="space-y-2">
              <div
                className={`p-3 rounded-lg ${participant.eligibleForSwag ? "bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800" : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"}`}
              >
                <p
                  className={
                    participant.eligibleForSwag
                      ? "text-purple-700 dark:text-purple-300 font-semibold"
                      : "text-gray-700 dark:text-gray-300"
                  }
                >
                  {participant.eligibleForSwag ? "✓ Eligible for Swag" : "✗ Not eligible for swag"}
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${participant.creditsRedeemed ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800" : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"}`}
              >
                <p
                  className={
                    participant.creditsRedeemed
                      ? "text-green-700 dark:text-green-300 font-semibold"
                      : "text-gray-700 dark:text-gray-300"
                  }
                >
                  {participant.creditsRedeemed ? "✓ Credits Redeemed" : "✗ Credits not redeemed"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
