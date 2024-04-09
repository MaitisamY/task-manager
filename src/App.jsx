import './styles/app.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TaskProvider } from './hooks/TaskProvider'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header'
import Home from './components/Home'
import Trash from './components/Trash'

function App() {
    return (
        <div className="app">
            <ToastContainer className={'Toastify__toast--error'}  />
            <Router>
                <TaskProvider>
                    <Header />
                        <div className="content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/trash" element={<Trash />} />
                            </Routes>
                        </div>
                </TaskProvider>
            </Router>
        </div>
    )
}

export default App
