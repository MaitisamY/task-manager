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
            <ToastContainer style={{ fontSize: '14px' }}  />
            <Router>
                <TaskProvider>
                    <Header />
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/trash" element={<Trash />} />
                            </Routes>
                        </main>
                </TaskProvider>
            </Router>
        </div>
    )
}

export default App
