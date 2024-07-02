import { Card } from '@tremor/react'
import React from 'react'

type Props = {
    item: {
        id: number
        name: string
        closed: number
        inProgress: number
    }
}

const WorkshopCard = ({ item }: Props) => {
    return (
        <Card className='h-64 flex flex-col justify-between cursor-pointer hover:shadow-md duration-150'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl'>{item.name}</h1>
                <div className='h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center text-white'>
                    WS
                </div>
            </div>
            <div className='flex items-center justify-between' >
                <p className='text-xs'><span className='text-xl'>{item.inProgress} </span> EN CURSO</p>
                <p className='text-xs'><span className='text-xl'>{item.closed} </span>CERRADOS</p>
            </div>
        </Card>
    )
}

export default WorkshopCard