import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Auth from './pages/auth/Auth'
import Home from './pages/home/Home'
import './App.sass'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth/>} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}