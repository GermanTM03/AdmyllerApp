import Dashboard from '@/src/components/dashboard/Dashboard'
import DashboardButton from '@/src/components/dashboard/DashboardButton'
import AddBranch from '@/src/components/dashboard/funciones/AddBranchs'
import React from 'react'

const page = () => {
  return (
    <div>

    <Dashboard/>
    <AddBranch/>
    </div>

  )
}

export default page