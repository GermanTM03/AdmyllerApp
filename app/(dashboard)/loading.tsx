import React from 'react'

const Loading = () => {
    return (
        <div className="h-screen flex items-center justify-center z-50">
            <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 rounded-full animate-pulse bg-slate-950 dark:bg-slate-50"></div>
                <div className="w-3 h-3 rounded-full animate-pulse bg-slate-950 dark:bg-slate-50"></div>
                <div className="w-3 h-3 rounded-full animate-pulse bg-slate-950 dark:bg-neutral-50"></div>
            </div>
        </div>
    )
}

export default Loading