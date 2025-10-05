'use client'
import { useState, useEffect } from 'react'
import { ApplicationDTO } from '@/types/applicationDTO'

interface PendingApplicationsProps {}

export function PendingApplications({}: PendingApplicationsProps) {
  const [applications, setApplications] = useState<ApplicationDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/applications')
      
      if (!response.ok) {
        throw new Error('Failed to fetch applications')
      }
      
      const data = await response.json()
      setApplications(data.applications)
    } catch (err) {
      setError('Failed to load applications')
      console.error('Error fetching applications:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (applicationId: string) => {
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}/approve`, {
        method: 'POST',
      })

      console.log('Approve response:', response)

      if (response.ok) {
        // Remove from local state
        setApplications(prev => prev.filter(app => app.id !== applicationId))
        // Or refresh the entire list:
        // fetchApplications()
      } else {
        throw new Error('Failed to approve application')
      }
    } catch (err) {
      alert('Failed to approve application')
      console.error('Error approving application:', err)
    }
  }

  const handleReject = async (applicationId: string) => {
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}/reject`, {
        method: 'POST',
      })

      if (response.ok) {
        setApplications(prev => prev.filter(app => app.id !== applicationId))
      } else {
        throw new Error('Failed to reject application')
      }
    } catch (err) {
      alert('Failed to reject application')
      console.error('Error rejecting application:', err)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
        <p className="text-red-700">{error}</p>
        <button 
          onClick={fetchApplications}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg pt-6">
      <div className="p-4 border-b border-[#FF7E70]">
        <h2 className="text-xl font-semibold">Pending Applications</h2>
        <p className="text-gray-600 text-sm">
          {applications.length} application(s) waiting for review
        </p>
      </div>
      
      <div className="p-4">
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600">
              No pending applications to review.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <ApplicationCard 
                key={application.id}
                application={application}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Sub-component for individual application cards
function ApplicationCard({ 
  application, 
  onApprove, 
  onReject 
}: { 
  application: ApplicationDTO
  onApprove: (id: string) => void
  onReject: (id: string) => void
}) {
  return (
    <div className="shadow-lg rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">
            {application.applicationData.name}
          </h3>
          <p className="text-gray-600">{application.applicationData.email}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          application.type === 'teacher' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {application.type}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p><strong>Age:</strong> {application.applicationData.age}</p>
          {application.type === 'teacher' && (
            <>
              <p><strong>University:</strong> {application.applicationData.university}</p>
              <p><strong>Subject:</strong> {application.applicationData.subject}</p>
              <p><strong>Program:</strong> {application.applicationData.program}</p>
            </>
          )}
          {application.type === 'student' && (
            <>
              <p><strong>Grade Level:</strong> {application.applicationData.gradeLevel}</p>
              <p><strong>Subjects:</strong> {application.applicationData.subjects?.join(', ')}</p>
              <p><strong>Goals:</strong> {application.applicationData.goals}</p>
              <p><strong>Background:</strong> {application.applicationData.background}</p>
            </>
          )}
        </div>
        <div>
          <p><strong>Submitted:</strong> {new Date(application.submittedAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <button 
          onClick={() => onApprove(application.id)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Approve
        </button>
        <button 
          onClick={() => onReject(application.id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Reject
        </button>
      </div>
    </div>
  )
}