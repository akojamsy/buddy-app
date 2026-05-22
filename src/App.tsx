import { BrowserRouter } from 'react-router-dom'
import AppRoute from './routes'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoute />
          <Toaster richColors position='top-right' closeButton />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
