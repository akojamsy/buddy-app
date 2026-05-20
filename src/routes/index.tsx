import { SignIn } from '@/pages'
import routesPath from '@/utils/routes-path'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const { SIGNIN } = routesPath

export default function AppRoute() {
  return (
    <Suspense>
      <Routes>
        <Route path={SIGNIN} element={<SignIn />} />
      </Routes>
    </Suspense>
  )
}
