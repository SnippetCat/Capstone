import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import storeThing from './store/configureStore.js'

import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
    <Provider store={storeThing}>
        <App />
    </Provider>
)
