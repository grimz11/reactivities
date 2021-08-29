import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './app/layout/App'
import { store, StoreContext } from './app/stores/store'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
  ,
  document.getElementById('root')
)

reportWebVitals()
