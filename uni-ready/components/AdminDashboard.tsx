"use client"

import { useState } from "react"
import { PendingApplications } from "./PendingApplications"

const AdminDashboard = () => {
  
  return (
    <div className="space-y-6">
        <PendingApplications />
    </div>
  )
}

export default AdminDashboard