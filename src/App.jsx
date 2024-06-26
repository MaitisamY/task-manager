import './styles/app.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TaskProvider } from './hooks/TaskProvider'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import 'react-confirm-alert/src/react-confirm-alert.css'

import Header from './components/Header'
import Home from './pages/Home'
import InProgress from './pages/InProgress'
import Completed from './pages/Completed'
import Expired from './pages/Expired'
import About from './pages/About'

const App = () => {
    return (
        <div className="app">
            <ToastContainer style={{ fontSize: '14px' }}  />
            <Router>
                <TaskProvider>
                    <Header />
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/in-progress" element={<InProgress />} />
                                <Route path="/completed" element={<Completed />} />
                                <Route path="/expired" element={<Expired />} />
                                <Route path="/about" element={<About />} />
                            </Routes>
                        </main>
                </TaskProvider>
            </Router>
        </div>
    )
}

export default App
