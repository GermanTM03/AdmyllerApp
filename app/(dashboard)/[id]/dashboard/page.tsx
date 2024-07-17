import Dashboard from '@/src/components/dashboard/Dashboard'
import { BranchService } from '@/src/services/BranchService'
import React from 'react'

const page = async () => {
    // const branches = await BranchService.GetBranchs()
    // console.log(branches)
    return (
        // <Dashboard branches={branches.data ?? []} />
        <div>Dashbooard</div>
    )
}

export default page