"use client";
import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        <SignUp 
        />
      </div>
    </div>
  )
}

export default page