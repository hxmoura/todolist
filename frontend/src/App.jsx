import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ThemeProvider from './context/ThemeContext'

import Auth from './pages/auth/Auth'
import Home from './pages/home/Home'

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Auth />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}