import { ReactNode } from "react"

type TFormHeaderProps = {
    title: string
    subtitle?: string
    emoji?: string
    actionBtn?: ReactNode
}

const FormHeader = ({ title, subtitle, emoji, actionBtn }: TFormHeaderProps) => {
    return (
        <div className='w-full mb-3'>
            <h1 className="text-xl font-medium flex justify-between">
                <span>{title} <span>{emoji}</span></span>
                {actionBtn && <>{actionBtn}</>}
            </h1>
            <h2 className="pt-2">{subtitle}</h2>
        </div>
    )
}

export default FormHeader