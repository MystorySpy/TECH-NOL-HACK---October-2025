// app/dashboard/teacher/layout.tsx
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { TeacherNavbar } from '@/components/dashboard/TeacherNavbar'

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherNavbar />
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}