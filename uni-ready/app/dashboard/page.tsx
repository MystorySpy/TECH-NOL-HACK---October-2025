// app/dashboard/page.tsx
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export default async function Dashboard() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  await dbConnect()
  
  // Get user role from MongoDB
  const userRecord = await User.findOne({ clerkUserId: user.id })
  const role = userRecord?.role

  // Redirect based on MongoDB role
  if (role === 'student') {
    redirect('/dashboard/student')
  } else if (role === 'teacher') {
    redirect('/dashboard/teacher')
  } else if (role === 'admin') {
    redirect('/dashboard/admin')
  }

  // If no role or unknown role, show generic dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Uni-Ready!
          </h1>
          <p className="text-gray-600 mb-6">
            {!role 
              ? "Please complete your application to get started."
              : "Your account is being set up. Please check back soon."
            }
          </p>
          {!role && (
            <a 
              href="/apply"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700"
            >
              Complete Application
            </a>
          )}
        </div>
      </div>
    </div>
  )
}