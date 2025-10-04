// app/sign-up/[[...sign-up]]/page.tsx
'use client'
import { SignUp, useSignUp } from '@clerk/nextjs'
import { useState } from 'react'

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Role Selection */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
            Join as a...
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setSelectedRole('student')}
              className={`p-4 border-2 rounded-lg text-center transition-colors ${
                selectedRole === 'student'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              <div className="text-2xl mb-2">🎓</div>
              <div className="font-semibold">Student</div>
              <div className="text-sm mt-1">Looking for guidance</div>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('teacher')}
              className={`p-4 border-2 rounded-lg text-center transition-colors ${
                selectedRole === 'teacher'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              <div className="text-2xl mb-2">👨‍🏫</div>
              <div className="font-semibold">Teacher</div>
              <div className="text-sm mt-1">Want to volunteer</div>
            </button>
          </div>

          {/* Hidden input to pass role to Clerk */}
          <input type="hidden" name="role" value={selectedRole} />
        </div>

        {/* Clerk Sign-Up Form */}
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "shadow-lg rounded-2xl",
            }
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl={`/apply/${selectedRole}`}
        />
      </div>
    </div>
  )
}