'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Mock credentials - in a real app, these would be handled securely on the server
const MOCK_CREDENTIALS = {
  HOD: { username: 'hod', password: 'hod123' },
  MENTOR: { username: 'mentor', password: 'mentor123' },
  STUDENT: { username: 'student', password: 'student123' }
}

type Role = 'HOD' | 'MENTOR' | 'STUDENT'

export default function Page() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()
  

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!selectedRole) {
      setError('Please select a role')
      return
    }

    const credentials = MOCK_CREDENTIALS[selectedRole]
    if (username === credentials.username && password === credentials.password) {
      // Navigate to dashboard based on role
      router.push(`/${selectedRole.toLowerCase()}/dashboard`)
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      {/* Translucent white overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-70"></div>
      
      {/* Main content */}
      <div className="relative min-h-screen flex items-center justify-center py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Image 
              src="/DRAIT.jpg" 
              alt="Dr. Ambedkar Institute of Technology Logo" 
              width={100} 
              height={100}
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-[#37474F] mb-2">
              Dr. AMBEDKAR INSTITUTE OF TECHNOLOGY
            </h1>
            <p className="text-sm text-gray-600">
              Outer Ring Road, Malathahalli, Bengaluru-560056, Karnataka, India
            </p>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-[#37474F] mb-8">
            STUDENT MENTORING SYSTEM
          </h2>

          {/* Role Selection */}
          <div className="flex justify-center gap-4 mb-8">
            {(['HOD', 'MENTOR', 'STUDENT'] as const).map((role) => (
              <button
                key={role}
                className={`px-8 py-2 rounded ${
                  selectedRole === role 
                    ? 'bg-[#37474F] text-white' 
                    : 'bg-[#5C6BC0] text-white hover:bg-[#37474F]'
                }`}
                onClick={() => setSelectedRole(role)}
                type="button"
              >
                {role}
              </button>
            ))}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6 max-w-sm mx-auto">
            <div>
              <input
                type="text"
                placeholder="USERNAME"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                className="text-black w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="text-black w-full p-2 border rounded"
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-center text-sm">
                {error}
              </div>
            )}
            
            {/* Use the Link component here for the button link */}
            {/*<Link href="/student-mentor-allocation"></Link>*/}
              <button
                type="submit" 
                className="w-full bg-[#37474F] text-white hover:bg-[#455A64] py-2 rounded"
              >
                LOGIN
              </button>
            
          </form>
        </div>
      </div>
    </div>
  )
}
