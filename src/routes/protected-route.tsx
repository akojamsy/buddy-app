import { selectIsAuthenticated } from '@/redux/features/auth/authSlice'
import { useAppSelector } from '@/redux/store'
import routesPath from '@/utils/routes-path'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate to={routesPath.SIGNIN} replace state={{ from: location }} />
    )
  }

  return <Outlet />
}
