import Start from '@/src/components/dashboard/start/Start'
import { BranchService } from '@/src/services/BranchService'
import React from 'react'

const Page = async () => {
    const branches = await BranchService.GetBranchs()
    return (
        <Start branches={branches.data ?? []} />
    )
}

export default Page