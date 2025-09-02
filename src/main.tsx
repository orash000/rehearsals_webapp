import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from 'app'
import { Provider } from 'react-redux'
import { store } from 'services/store'
import { AuthGuard } from 'components/shared/auth-guard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthGuard>
        <App />
      </AuthGuard>
    </Provider>
  </StrictMode>
)