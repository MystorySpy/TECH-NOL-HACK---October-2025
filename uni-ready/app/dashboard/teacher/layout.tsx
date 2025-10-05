// app/dashboard/teacher/layout.tsx
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { TeacherNavbar } from '@/components/dashboard/TeacherNavbar'

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  
  // Check if user is a teacher
  

//   if (role !== 'teacher') {
//     redirect('/')
//   }
//   console.log('TeacherLayout user role:', role)

  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherNavbar />
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}