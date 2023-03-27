import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import './ThemeToggle.sass'

export default function ThemeToggle() {
    const { toggleTheme } = useContext(ThemeContext)

    return (
        <button className="toggle-theme-btn" onClick={toggleTheme}>
            <div className="toggle-theme-circle"></div>
        </button>
    )
}