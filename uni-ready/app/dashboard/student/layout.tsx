// app/dashboard/teacher/layout.tsx
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { StudentNavbar } from '@/components/dashboard/StudentNavbar'

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar />
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}