import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"

interface CSVRow {
  "User Name": string
  "User Email": string
  "Google Cloud Skills Boost Profile URL": string
  "Profile URL Status": string
  "Access Code Redemption Status": string
  "All Skill Badges & Games Completed": string
  "# of Skill Badges Completed": string
  "Names of Completed Skill Badges": string
  "# of Arcade Games Completed": string
  "Names of Completed Arcade Games": string
}

interface Participant {
  id: string
  name: string
  email: string
  profileUrl: string
  profileStatus: string
  accessCodeRedeemed: boolean
  skillBadgesCompleted: number
  completedBadges: string[]
  arcadeGamesCompleted: number
  completedArcadeGames: string[]
  eligibleForSwag: boolean
}

interface LeaderboardData {
  university: string
  lastUpdated: string
  participants: Participant[]
  analytics: {
    totalParticipants: number
    completedAllBadges: number
    completedArcadeGame: number
    eligibleForSwag: number
    creditsRedeemed: number
  }
}

async function convertCSVToJSON(csvFilePath: string, outputPath: string) {
  try {
    // Read CSV file
    const csvContent = fs.readFileSync(csvFilePath, "utf-8")

    // Parse CSV
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    }) as CSVRow[]

    const participants: Participant[] = records.map((row, index) => {
      const skillBadgesCompleted = Number.parseInt(row["# of Skill Badges Completed"] || "0", 10)
      const arcadeGamesCompleted = Number.parseInt(row["# of Arcade Games Completed"] || "0", 10)
      const completedAllBadges = skillBadgesCompleted === 19
      const completedArcade = arcadeGamesCompleted > 0
      const eligibleForSwag = completedAllBadges && completedArcade

      return {
        id: `participant-${index + 1}`,
        name: row["User Name"] || "Unknown",
        email: row["User Email"] || "unknown@example.com",
        profileUrl: row["Google Cloud Skills Boost Profile URL"] || "",
        profileStatus: row["Profile URL Status"] || "Unknown",
        accessCodeRedeemed: row["Access Code Redemption Status"]?.toLowerCase() === "yes",
        skillBadgesCompleted,
        completedBadges: row["Names of Completed Skill Badges"]
          ? row["Names of Completed Skill Badges"].split(",").map((b) => b.trim())
          : [],
        arcadeGamesCompleted,
        completedArcadeGames: row["Names of Completed Arcade Games"]
          ? row["Names of Completed Arcade Games"].split(",").map((g) => g.trim())
          : [],
        eligibleForSwag,
      }
    })

    // Calculate analytics
    const analytics = {
      totalParticipants: participants.length,
      completedAllBadges: participants.filter((p) => p.skillBadgesCompleted === 19).length,
      completedArcadeGame: participants.filter((p) => p.arcadeGamesCompleted > 0).length,
      eligibleForSwag: participants.filter((p) => p.eligibleForSwag).length,
      creditsRedeemed: participants.filter((p) => p.accessCodeRedeemed).length,
    }

    const leaderboardData: LeaderboardData = {
      university: "Veer Surendra Sai University of Technology - Burla, India",
      lastUpdated: new Date().toISOString(),
      participants: participants.sort((a, b) => {
        // Sort by: eligible for swag, then by badges completed, then by arcade games
        if (a.eligibleForSwag !== b.eligibleForSwag) {
          return b.eligibleForSwag ? 1 : -1
        }
        if (a.skillBadgesCompleted !== b.skillBadgesCompleted) {
          return b.skillBadgesCompleted - a.skillBadgesCompleted
        }
        return b.arcadeGamesCompleted - a.arcadeGamesCompleted
      }),
      analytics,
    }

    // Write JSON file
    fs.writeFileSync(outputPath, JSON.stringify(leaderboardData, null, 2))
    console.log(`Successfully converted CSV to JSON: ${outputPath}`)
    console.log(`Total participants: ${analytics.totalParticipants}`)
    console.log(`Eligible for swag: ${analytics.eligibleForSwag}`)
  } catch (error) {
    console.error("Error converting CSV to JSON:", error)
    process.exit(1)
  }
}

// Get file paths from command line arguments or use defaults
const csvPath = process.argv[2] || path.join(process.cwd(), "public", "data.csv")
const outputPath = process.argv[3] || path.join(process.cwd(), "public", "leaderboard-data.json")

convertCSVToJSON(csvPath, outputPath)
