import {
  Analytics,
  Dashboard,
  Messages,
  MyGroup,
  Pack,
  Settings,
  SignIn,
  SignUp,
  VerifyEmail,
} from '@/pages'
import routesPath from '@/utils/routes-path'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const {
  SIGNUP,
  SIGNIN,
  VERIFY_EMAIL,
  DASHBOARD,
  MY_GROUP,
  MESSAGES,
  ANALYTICS,
  PACK,
  SETTINGS,
} = routesPath

export default function AppRoute() {
  return (
    <Suspense>
      <Routes>
        <Route path={SIGNUP} element={<SignUp />} />
        <Route path={SIGNIN} element={<SignIn />} />
        <Route path={VERIFY_EMAIL} element={<VerifyEmail />} />
        <Route path={DASHBOARD} element={<Dashboard />} />
        <Route path={MY_GROUP} element={<MyGroup />} />
        <Route path={MESSAGES} element={<Messages />} />
        <Route path={ANALYTICS} element={<Analytics />} />
        <Route path={PACK} element={<Pack />} />
        <Route path={SETTINGS} element={<Settings />} />
      </Routes>
    </Suspense>
  )
}
