// types/application.ts
export interface ApplicationDTO {
  id: string
  type: 'student' | 'teacher'
  status: 'pending' | 'approved' | 'rejected'
  applicationData: {
    name: string
    age: string
    email: string
    // Teacher specific
    university?: string
    subject?: string
    program?: string
    gpa?: string
    experience?: string
    // Student specific  
    gradeLevel?: string
    school?: string
    subjects?: string[]
    goals?: string
    background?: string
  }
  submittedAt: string
  reviewedAt?: string
}