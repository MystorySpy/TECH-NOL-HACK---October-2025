import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-start justify-center pt-28 px-6">
      <div className="w-full max-w-md">
        <SignIn />
      </div>
    </div>
  )
}