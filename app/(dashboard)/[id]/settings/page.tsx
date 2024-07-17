import Settings from '@/src/components/dashboard/settings/Settings'
import { IBranch } from '@/src/interfaces/branch'
import { BranchService } from '@/src/services/BranchService'

const Page = async ({ params }: { params: { id: string } }) => {
    const { id } = params
    const branch = await BranchService.GetBranchById(parseInt(id))
    return (
        <Settings branch={branch.data as IBranch} />
    )
}

export default Page