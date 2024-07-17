import React from 'react'
import BranchForm from '../branches/BranchForm'
import { IBranch } from '@/src/interfaces/branch'

type Props = {
    branch: IBranch
}

const Settings = ({ branch }: Props) => {
    return (
        <section >
            <BranchForm data={branch} isEdit />
        </section>
    )
}

export default Settings