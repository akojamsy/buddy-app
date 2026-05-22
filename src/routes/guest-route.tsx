import { selectIsAuthenticated } from '@/redux/features/auth/authSlice'
import { useAppSelector } from '@/redux/store'
import routesPath from '@/utils/routes-path'
import { Navigate, Outlet } from 'react-router-dom'

export function GuestRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={routesPath.DASHBOARD} replace />
  }

  return <Outlet />
}
