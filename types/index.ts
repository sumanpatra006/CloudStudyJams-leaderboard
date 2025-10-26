export interface Participant {
  id: string
  name: string
  email: string
  qwiklabsId: string
  track: string
  completion: number
  badges: number
  lastUpdated: string
  rank?: number
  profileUrl?: string
  completedAllBadges?: boolean
  completedArcadeGame?: boolean
  eligibleForSwag?: boolean
  // Add these properties for the modal
  skillBadgesCompleted: number
  arcadeGamesCompleted: number
  accessCodeRedeemed?: boolean
  profileStatus?: string
  completedBadges?: string[]
  completedArcadeGames?: string[]
}

export interface Analytics {
  totalParticipants: number
  completedAllBadges: number
  completedArcadeGame: number
  eligibleForSwag: number
  creditsRedeemed: number
}

export interface LeaderboardData {
  university: string
  lastUpdated: string
  analytics: Analytics
  participants: Participant[]
}
