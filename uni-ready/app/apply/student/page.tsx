// app/apply/student/page.tsx
'use client'
import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 
  'English', 'History', 'Geography', 'Computer Science',
  'Economics', 'Business', 'Psychology', 'Art',
  'Music', 'Test Prep', 'French'
];

const LEARNING_STYLES = [
  'Visual (learn by seeing)',
  'Auditory (learn by hearing)',
  'Kinesthetic (learn by doing)',
  'Reading/Writing (learn by reading and writing)',
  'Mixed/Adaptable'
];

export default function StudentApplicationPage() {
  const { user } = useUser()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [formData, setFormData] = useState({
    // Personal Information
    name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
    age: '',
    email: user?.emailAddresses[0]?.emailAddress || '',
    
    // School Information
    gradeLevel: '',
    
    // Academic Information
    subjects: [] as string[],
    goals: '',
    background: '',
    learningStyle: '',
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => {
      const newSubjects = prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
      
      return { ...prev, subjects: newSubjects }
    })
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
          type: 'student',
          applicationData: formData,
        }),
      })

      if (response.ok) {
        // Update user role in Clerk
        await user?.update({
          unsafeMetadata: { 
            role: 'student',
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
  <div className="min-h-screen bg-gray-50 pt-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--accent, #FA8072)' }}>Student Application</h1>
          <p className="text-gray-600 mb-8">
            Complete your profile to find the perfect teacher for you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--accent, #FA8072)' }}>Personal Information</h2>
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
                    min="13"
                    max="19"
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

            {/* School Information */}
            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--accent, #FA8072)' }}>School Information</h2>
                <div>
                  <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700 mb-2">
                    Grade Level *
                  </label>
                  <select
                    id="gradeLevel"
                    value={formData.gradeLevel}
                    onChange={(e) => handleInputChange('gradeLevel', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Grade</option>
                    <option value="9">9th Grade</option>
                    <option value="10">10th Grade</option>
                    <option value="11">11th Grade</option>
                    <option value="12">12th Grade</option>
                  </select>
                </div>
            </section>

            {/* Academic Information */}
            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--accent, #FA8072)' }}>Academic Information</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Subjects You Need Help With * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {SUBJECTS.map(subject => (
                    <label key={subject} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.subjects.includes(subject)}
                        onChange={() => handleSubjectToggle(subject)}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Goals *
                </label>
                <textarea
                  id="goals"
                  value={formData.goals}
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="What are your academic goals? What do you hope to achieve with tutoring?..."
                />
              </div>

              <div className="mb-6">
                <label htmlFor="background" className="block text-sm font-medium text-gray-700 mb-2">
                  Background *
                </label>
                <textarea
                  id="background"
                  value={formData.background}
                  onChange={(e) => handleInputChange('background', e.target.value)}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="What is your academic background? What makes you an ideal candidate for our mission?..."
                />
              </div>

              <div>
                <label htmlFor="learningStyle" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Learning Style
                </label>
                <select
                  id="learningStyle"
                  value={formData.learningStyle}
                  onChange={(e) => handleInputChange('learningStyle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select your preferred learning style</option>
                  {LEARNING_STYLES.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
            </section>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white py-3 px-4 rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'var(--accent, #FA8072)' }}
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Student Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}