import { usePathname } from "next/navigation"

export const getPageName = () => {
    const pathName = usePathname()
    const path = pathName.split('/')[2]
    switch (path) {
        case 'dashboard':
            return 'Dashboard'
        case 'inventory':
            return 'Inventario'
        case 'orders':
            return 'Reportes'
        case 'sales':
            return 'Cotizaciones'
        case 'quotes':
            return 'Citas'
        case 'employees':
            return 'Empleados'
        case 'settings':
            return 'Configuración de la sucursal'
        default:
            return 'Inicio'
    }
}