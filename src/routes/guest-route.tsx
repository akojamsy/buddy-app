import { EMAIL_VERIFIED_STORAGE_KEY } from '@/utils/helpers'
import { selectIsAuthenticated } from '@/redux/features/auth/authSlice'
import { useAppSelector } from '@/redux/store'
import routesPath from '@/utils/routes-path'
import { getStorageItem } from '#hooks/use-local-storage'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function GuestRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const location = useLocation()
  const isEmailVerifiedSuccessStep =
    location.pathname === routesPath.VERIFY_EMAIL &&
    Boolean(getStorageItem(EMAIL_VERIFIED_STORAGE_KEY))

  if (isAuthenticated && !isEmailVerifiedSuccessStep) {
    return <Navigate to={routesPath.DASHBOARD} replace />
  }

  return <Outlet />
}
