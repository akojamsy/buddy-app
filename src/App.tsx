import { BrowserRouter } from 'react-router-dom'
import AppRoute from './routes'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { Toaster } from 'sonner'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <AppRoute />
            <Toaster richColors position='top-right' closeButton />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
