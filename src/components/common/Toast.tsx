'use client'
import { useTheme } from "next-themes";
import { ButtonHTMLAttributes, FormEvent } from "react";
import { toast } from "sonner";
import { CheckIcon, InformationCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Icon } from "@tremor/react";
type Props = {
    toastId: string | number;
    title: string;
    description: string;
    btnText?: string;
    onClick?: (e: FormEvent) => void;
    onDismiss?: Function;
    status?: "success" | "info" | "warning" | "danger";
};

export default function Toast({
    toastId,
    title,
    description,
    btnText,
    onClick,
    onDismiss,
    status = "info", // Default to "info" status if not provided
}: Props) {
    const { theme } = useTheme();

    const handleClose = () => {
        onDismiss?.();
        toast.dismiss(toastId);
    };
    const handleClick = (e: FormEvent<Element>) => {
        onClick?.(e)
        toast.dismiss(toastId);
    }
    // Define the icon and background color based on the status
    const iconColor = theme === "dark" ? "white" : "black";
    const iconBgColor = {
        success: "bg-green-500",
        info: "bg-blue-500",
        warning: "bg-yellow-500",
        danger: "bg-red-500",
    }[status];
    const icon = {
        success: CheckIcon,
        info: InformationCircleIcon,
        warning: ExclamationTriangleIcon,
        danger: XCircleIcon,
    }[status];
    return (
        <>
            <div
                className={`flex flex-col p-4 ${iconBgColor} dark:${iconBgColor} opacity-90  shadow-md hover:shadow-lg rounded-tremor-default z-50`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Icon className={`text-white`} color="cyan" icon={icon} size={"md"} tooltip={status} />
                        <div className="flex flex-col ml-3">
                            <div className="font-medium leading-none text-white">{title}</div>
                            <p className="text-sm text-white dark:text-white leading-none mt-1">
                                {description}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {onClick && (
                            <div>
                                <button
                                    onClick={handleClick}
                                    className={`px-2 py-2 w-fit whitespace-nowrap text-sm shadow-sm hover:shadow-lg font-medium border-2 text-white rounded-md ${status === "danger" ? "border-red-500" : `border-${status}-500`
                                        }`}
                                >
                                    {btnText}
                                </button>
                            </div>

                        )}
                        <button
                            onClick={handleClose}
                            className="text-white ml-2 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
