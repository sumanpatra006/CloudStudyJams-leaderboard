export interface Participant {
  id: string
  name: string
  email: string
  profileUrl: string
  profileStatus: string
  skillBadgesCompleted: number
  skillBadgeNames: string[]
  arcadeGamesCompleted: number
  arcadeGameNames: string[]
  creditsRedeemed: boolean
  allCompleted: boolean
  eligibleForSwag: boolean
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
