"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Search, Trophy, Users, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticipantCard from "@/components/participant-card"
import ParticipantModal from "@/components/participant-modal"
import type { LeaderboardData, Participant } from "@/types"

const ITEMS_PER_PAGE = 20

export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null)
  const [sortBy, setSortBy] = useState<"rank" | "name">("rank")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        const response = await fetch("/leaderboard-data.json")
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`)
        }
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error("Error loading leaderboard data:", error)
        setError(error instanceof Error ? error.message : "Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter and sort participants
  const filteredParticipants = data?.participants
    ?.filter((p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      }
      return (a.rank || 0) - (b.rank || 0)
    }) || []

  // Pagination
  const totalPages = Math.ceil(filteredParticipants.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentParticipants = filteredParticipants.slice(startIndex, endIndex)

  // Generate pagination range
  const getPaginationRange = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-100/20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600 text-sm font-medium">Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-100/20">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to load leaderboard</h2>
          <p className="text-gray-600 mb-4">{error || "Unable to load leaderboard data"}</p>
          <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-100/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-900/10">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </div>
            
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 px-3 py-1 rounded-full">
              <Trophy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {data.analytics.totalParticipants} Participants
              </span>
            </div>
          </div>

          <div className="text-center mt-6">
            <h1 className="text-4xl sm:text-5xl font-black bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Leaderboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
              Track your progress and compete with peers
            </p>
          </div>
        </div>
      </header>

      {/* Controls Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800/50 dark:text-white backdrop-blur-sm transition-all duration-200"
            />
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "rank" | "name")}
              className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800/50 dark:text-white backdrop-blur-sm transition-all duration-200"
              aria-label="filter"
            >
              <option value="rank">Sort by Rank</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Showing {currentParticipants.length} of {filteredParticipants.length} participants
          </p>
          {searchTerm && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchTerm("")}
              className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
            >
              Clear search
            </Button>
          )}
        </div>
      </section>

      {/* Participants Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 gap-3">
          {currentParticipants.map((participant, index) => (
            <ParticipantCard
              key={participant.id}
              participant={participant}
              rank={startIndex + index + 1}
              onClick={() => setSelectedParticipant(participant)}
            />
          ))}
        </div>

        {currentParticipants.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No participants found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {searchTerm
                ? `No results found for "${searchTerm}". Try adjusting your search terms.`
                : "No participants available at the moment."}
            </p>
          </div>
        )}
      </section>

{/* Pagination */}
{totalPages > 1 && (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Mobile: Simple pagination */}
      <div className="flex sm:hidden items-center gap-2 w-full justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="gap-1 flex-1 max-w-32"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <span className="text-sm text-gray-600 dark:text-gray-400 px-4">
          {currentPage} / {totalPages}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="gap-1 flex-1 max-w-32"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Desktop: Full pagination */}
      <div className="hidden sm:flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="gap-2"
        >
          First
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
      </div>

      {/* Page Numbers - Responsive */}
      <div className="hidden sm:flex items-center gap-1 flex-wrap justify-center">
        {getPaginationRange().map((page, index) =>
          page === '...' ? (
            <span key={`dots-${index}`} className="px-2 py-1 text-gray-500 text-sm">
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page as number)}
              className={`min-w-10 h-10 ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {page}
            </Button>
          )
        )}
      </div>

      <div className="hidden sm:flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="gap-2"
        >
          Last
        </Button>
      </div>
    </div>

    <p className="text-center mt-4 text-gray-600 dark:text-gray-400 text-sm">
      Page {currentPage} of {totalPages} • {filteredParticipants.length} total participants
    </p>
  </section>
)}

      {/* Participant Modal */}
      {selectedParticipant && (
        <ParticipantModal 
          participant={selectedParticipant} 
          onClose={() => setSelectedParticipant(null)} 
        />
      )}
    </main>
  )
}