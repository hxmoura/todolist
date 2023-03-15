import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Auth from './pages/auth/Auth'
import Home from './pages/home/Home'
import MyContext from './context/myContext'

export default function App() {

    const [page, setPage] = useState('allTasks')

    const getTheme = () => {
        const get = JSON.parse(localStorage.getItem('darkTheme'))
        
        if(get === true || get === false) {
            return get
        } else {
            return true
        }
    }

    const [theme, setTheme] = useState(getTheme())
    
    useEffect(() => localStorage.setItem('darkTheme', JSON.stringify(theme)), [theme])

    const html = document.querySelector('html')
    theme ? html.classList.add('dark') : html.classList.remove('dark')

    return (
        <MyContext.Provider value={{ theme, setTheme, page, setPage }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Auth />} />
                </Routes>
            </BrowserRouter>
        </MyContext.Provider>
    )
}