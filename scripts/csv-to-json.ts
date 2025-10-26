import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"

interface ParticipantRow {
  "User Name": string
  "User Email": string
  "Google Cloud Skills Boost Profile URL": string
  "Profile URL Status": string
  "Access Code Redemption Status": string
  "All Skill Badges & Games Completed": string
  "# of Skill Badges Completed": number
  "Names of Completed Skill Badges": string
  "# of Arcade Games Completed": number
  "Names of Completed Arcade Games": string
}

interface Participant {
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

interface Analytics {
  totalParticipants: number
  completedAllBadges: number
  completedArcadeGame: number
  eligibleForSwag: number
  creditsRedeemed: number
}

interface LeaderboardData {
  university: string
  lastUpdated: string
  analytics: Analytics
  participants: Participant[]
}

async function csvToJson() {
  try {
    // Read CSV file from public directory
    const csvPath = path.join(process.cwd(), "public", "data.csv")

    if (!fs.existsSync(csvPath)) {
      console.error("CSV file not found at:", csvPath)
      process.exit(1)
    }

    const fileContent = fs.readFileSync(csvPath, "utf-8")
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as ParticipantRow[]

    const participants: Participant[] = records.map((row, index) => {
      const skillBadgesCompleted = Number.parseInt(row["# of Skill Badges Completed"] as any) || 0
      const arcadeGamesCompleted = Number.parseInt(row["# of Arcade Games Completed"] as any) || 0
      const creditsRedeemed = row["Access Code Redemption Status"]?.toLowerCase() === "yes"
      const allCompleted = row["All Skill Badges & Games Completed"]?.toLowerCase() === "yes"
      const eligibleForSwag = skillBadgesCompleted === 19 && arcadeGamesCompleted > 0

      return {
        id: `participant-${index + 1}`,
        name: row["User Name"] || "Unknown",
        email: row["User Email"] || "",
        profileUrl: row["Google Cloud Skills Boost Profile URL"] || "",
        profileStatus: row["Profile URL Status"] || "Unknown",
        skillBadgesCompleted,
        skillBadgeNames: row["Names of Completed Skill Badges"]
          ? row["Names of Completed Skill Badges"].split(",").map((s) => s.trim())
          : [],
        arcadeGamesCompleted,
        arcadeGameNames: row["Names of Completed Arcade Games"]
          ? row["Names of Completed Arcade Games"].split(",").map((s) => s.trim())
          : [],
        creditsRedeemed,
        allCompleted,
        eligibleForSwag,
      }
    })

    // Calculate analytics
    const analytics: Analytics = {
      totalParticipants: participants.length,
      completedAllBadges: participants.filter((p) => p.skillBadgesCompleted === 19).length,
      completedArcadeGame: participants.filter((p) => p.arcadeGamesCompleted > 0).length,
      eligibleForSwag: participants.filter((p) => p.eligibleForSwag).length,
      creditsRedeemed: participants.filter((p) => p.creditsRedeemed).length,
    }

    // Sort by skill badges completed (descending)
    participants.sort((a, b) => b.skillBadgesCompleted - a.skillBadgesCompleted)

    const leaderboardData: LeaderboardData = {
      university: "Veer Surendra Sai University of Technology - Burla, India",
      lastUpdated: new Date().toISOString(),
      analytics,
      participants,
    }

    // Write JSON file
    const jsonPath = path.join(process.cwd(), "public", "leaderboard-data.json")
    fs.writeFileSync(jsonPath, JSON.stringify(leaderboardData, null, 2))

    console.log("✓ CSV converted to JSON successfully!")
    console.log(`✓ Total participants: ${analytics.totalParticipants}`)
    console.log(`✓ Completed all badges: ${analytics.completedAllBadges}`)
    console.log(`✓ Completed arcade game: ${analytics.completedArcadeGame}`)
    console.log(`✓ Eligible for swag: ${analytics.eligibleForSwag}`)
    console.log(`✓ Credits redeemed: ${analytics.creditsRedeemed}`)
    console.log(`✓ JSON file saved to: ${jsonPath}`)
  } catch (error) {
    console.error("Error converting CSV to JSON:", error)
    process.exit(1)
  }
}

csvToJson()
