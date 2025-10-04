// app/apply/teacher/page.tsx
'use client'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 
  'English', 'History', 'Geography', 'Computer Science',
  'Economics', 'Business', 'Psychology', 'Art',
  'Music', 'Foreign Languages', 'Test Prep'
];


export default function TeacherApplicationPage() {
  const { user } = useUser()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Information
    name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
    age: '',
    email: user?.emailAddresses[0]?.emailAddress || '',
    
    // University Information
    university: '',
    program: '',
    year: '',
    gpa: '',
    
    // Teaching Information
    subject: '',
    experience: '',
    teachingStyle: '',
    bio: '',
    
    // Availability
    availability: '',
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'teacher',
          applicationData: formData,
        }),
      })

      if (response.ok) {
        // Update user role in Clerk
        await user?.update({
          unsafeMetadata: { 
            role: 'teacher',
            approved: false,
            applicationSubmitted: true
          }
        })
        
        router.push('/application-submitted')
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Application error:', error)
      alert('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Application</h1>
          <p className="text-gray-600 mb-8">
            Complete your profile to start volunteering as a teacher.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    id="age"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    required
                    min="18"
                    max="35"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </section>

            {/* University Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">University Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
                    University *
                  </label>
                  <input
                    type="text"
                    id="university"
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your university"
                  />
                </div>

                <div>
                  <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
                    Program/Major *
                  </label>
                  <input
                    type="text"
                    id="program"
                    value={formData.program}
                    onChange={(e) => handleInputChange('program', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Computer Science"
                  />
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Year *
                  </label>
                  <select
                    id="year"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                    <option value="5th+">5th Year+</option>
                    <option value="Graduate">Graduate Student</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 mb-2">
                    GPA *
                  </label>
                  <input
                    type="number"
                    id="gpa"
                    value={formData.gpa}
                    onChange={(e) => handleInputChange('gpa', e.target.value)}
                    required
                    step="0.1"
                    min="0"
                    max="4.0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 3.5"
                  />
                </div>
              </div>
            </section>

            {/* Teaching Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Teaching Information</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject You Want to Teach *
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select a subject</option>
                    {SUBJECTS.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Teaching/Tutoring Experience *
                  </label>
                  <textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Describe any previous teaching, tutoring, or mentoring experience..."
                  />
                </div>

                <div>
                  <label htmlFor="teachingStyle" className="block text-sm font-medium text-gray-700 mb-2">
                    Teaching Style/Approach
                  </label>
                  <textarea
                    id="teachingStyle"
                    value={formData.teachingStyle}
                    onChange={(e) => handleInputChange('teachingStyle', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="How do you prefer to teach? (e.g., visual, hands-on, discussion-based)..."
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                    Bio/Introduction
                  </label>
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Tell students a bit about yourself and why you want to teach..."
                  />
                </div>
              </div>
            </section>

            {/* Availability */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Availability</h2>
              <p className="text-sm text-gray-600 mb-4">
                How many hours a week do you think you could dedicate to our cause? 
              </p>
              
              <div className="overflow-x-auto">
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <textarea
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    rows={1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="2-5 hours per week recommended"
                  />
              </div>
            </section>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Teacher Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}