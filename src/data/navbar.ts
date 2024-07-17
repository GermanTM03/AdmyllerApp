import { } from '@heroicons/react/24/outline'
import { HomeIcon, ClipboardIcon, ClipboardDocumentListIcon, ChartPieIcon, UserGroupIcon, Cog6ToothIcon, ArrowLeftStartOnRectangleIcon, ChartBarSquareIcon, CalendarDaysIcon, ListBulletIcon } from '@heroicons/react/24/solid'

export interface LinkItem {
    id: number,
    label: string,
    route: string
    icon: any
}

export const START_ITEM: LinkItem = {
    id: 0,
    label: 'Inicio',
    route: '/start',
    icon: HomeIcon
}

export const MENU_ITEMS: LinkItem[] = [
    {
        id: 0,
        label: "Dashboard",
        route: "/dashboard",
        icon: ChartPieIcon
    },
    {
        id: 2,
        label: "Inventario",
        route: "/inventory",
        icon: ListBulletIcon
    },
    {
        id: 3,
        label: "Reportes",
        route: "/orders",
        icon: ClipboardDocumentListIcon
    },
    {
        id: 4,
        label: "Cotizaciones",
        route: "/sales",
        icon: ChartBarSquareIcon
    },
    {
        id: 5,
        label: "Citas",
        route: "/quotes",
        icon: CalendarDaysIcon
    },
    {
        id: 6,
        label: "Empleados",
        route: "/employees",
        icon: UserGroupIcon
    },
    {
        id: 7,
        label: "Configuración",
        route: "/settings",
        icon: Cog6ToothIcon
    },
]

export const BOTTOM_MENU_ITEMS = [
    // {
    //     id: 0,
    //     label: "Configuración",
    //     route: "/dashboard",
    //     icon: Cog6ToothIcon
    // },
    {
        id: 2,
        label: "Salir",
        route: "/home",
        icon: ArrowLeftStartOnRectangleIcon
    },
]
