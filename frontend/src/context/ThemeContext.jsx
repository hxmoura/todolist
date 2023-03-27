import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext({})

export default function ThemeProvider({ children }) {

    const getTheme = () => {
        const get = JSON.parse(localStorage.getItem('darkTheme'))

        if (get === true || get === false) {
            return get
        } else {
            return true
        }
    }

    const [theme, setTheme] = useState(getTheme())

    const toggleTheme = () => setTheme(currentTheme => !currentTheme)

    useEffect(() => localStorage.setItem('darkTheme', JSON.stringify(theme)), [theme])

    const html = document.querySelector('html')
    theme ? html.classList.add('dark') : html.classList.remove('dark')

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
    )
}
