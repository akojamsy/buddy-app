import { SignIn, SignUp, Dashboard } from '@/pages'
import routesPath from '@/utils/routes-path'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const { SIGNUP, SIGNIN, DASHBOARD } = routesPath

export default function AppRoute() {
  return (
    <Suspense>
      <Routes>
        <Route path={SIGNUP} element={<SignUp />} />
        <Route path={SIGNIN} element={<SignIn />} />
        <Route path={DASHBOARD} element={<Dashboard />} />
      </Routes>
    </Suspense>
  )
}
