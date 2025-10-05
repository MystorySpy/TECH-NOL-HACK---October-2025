// app/dashboard/teacher/page.tsx
'use client'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Teacher {
  _id: string
  name: string
  subject: string
  university: string
  approved: boolean
  students: string[]
}

interface Batch {
  _id: string
  name: string
  subject: string
  description: string
  students: string[]
  resources: any[]
  createdAt: string
}

export default function TeacherDashboard() {
  const { user } = useUser()
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [batches, setBatches] = useState<Batch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeacherData() {
      try {
        const [teacherRes, batchesRes] = await Promise.all([
          fetch('/api/teachers/me'),
          fetch('/api/teachers/batches')
        ])

        if (teacherRes.ok) {
          const teacherData = await teacherRes.json()
          setTeacher(teacherData.teacher)
        }

        if (batchesRes.ok) {
          const batchesData = await batchesRes.json()
          setBatches(batchesData.batches)
        }
      } catch (error) {
        console.error('Error fetching teacher data:', error)
      } finally {
        setLoading(false)
      }
    }
    if (user) {
      fetchTeacherData()
    }
  }, [user])

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!teacher) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">
            Profile Not Found
          </h2>
          <p className="text-yellow-700">
            We couldn't find your teacher profile. Please contact support.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {teacher.name}!
        </h1>
        <p className="text-gray-600">
          {teacher.approved 
            ? "Ready to teach? Manage your batches and students below."
            : "Your application is under review. You'll be able to create batches once approved."
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-lg">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-semibold text-gray-900">{teacher.students.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-lg">📚</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Batches</p>
              <p className="text-2xl font-semibold text-gray-900">{batches.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-lg">🎯</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Subject</p>
              <p className="text-2xl font-semibold text-gray-900">{teacher.subject}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {teacher.approved && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            href="/dashboard/teacher/batches/new"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">➕</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Batch</h3>
            <p className="text-gray-600 text-sm">
              Start a new batch and invite students to join your class
            </p>
          </Link>

          <Link 
            href="/dashboard/teacher/batches"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">📁</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">My Batches</h3>
            <p className="text-gray-600 text-sm">
              Manage your existing batches and add learning materials
            </p>
          </Link>

        </div>
      )}

      {/* Recent Batches */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Batches</h2>
          <Link 
            href="/dashboard/teacher/batches"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All
          </Link>
        </div>
        
        {batches.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Batches Yet</h3>
            <p className="text-gray-600 mb-4">
              {teacher.approved 
                ? "Create your first batch to get started with teaching."
                : "You'll be able to create batches once your application is approved."
              }
            </p>
            {teacher.approved && (
              <Link 
                href="/dashboard/teacher/batches/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Create Your First Batch
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {batches.slice(0, 3).map((batch) => (
              <Link 
                key={batch._id}
                href={`/dashboard/teacher/batches/${batch._id}`}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{batch.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{batch.subject}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{batch.students.length} students</span>
                  <span>{batch.resources.length} resources</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}