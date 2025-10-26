"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Search } from "@/components/icons"
import ParticipantCard from "@/components/participant-card"
import ParticipantModal from "@/components/participant-modal"
import type { LeaderboardData, Participant } from "@/types"

const ITEMS_PER_PAGE = 20

export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null)

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 dark:text-red-400">Error loading leaderboard data</p>
      </div>
    )
  }

  // Filter participants based on search
  const filteredParticipants = data.participants.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Pagination
  const totalPages = Math.ceil(filteredParticipants.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentParticipants = filteredParticipants.slice(startIndex, endIndex)

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-2 mb-4 font-medium"
          >
            <ChevronLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{filteredParticipants.length} participants</p>
        </div>
      </header>

      {/* Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-600" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-12 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </section>

      {/* Participants Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 gap-4">
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
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No participants found</p>
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page = i + 1
                if (totalPages > 5 && currentPage > 3) {
                  page = currentPage - 2 + i
                }
                if (page > totalPages) return null
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-900"
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <p className="text-center mt-4 text-gray-600 dark:text-gray-400 text-sm">
            Page {currentPage} of {totalPages}
          </p>
        </section>
      )}

      {/* Participant Modal */}
      {selectedParticipant && (
        <ParticipantModal participant={selectedParticipant} onClose={() => setSelectedParticipant(null)} />
      )}
    </main>
  )
}
