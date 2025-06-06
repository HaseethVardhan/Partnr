import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <UserContext>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UserContext>
)
