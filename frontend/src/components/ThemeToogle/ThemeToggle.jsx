import { useContext } from 'react'
import MyContext from '../../context/myContext'
import './ThemeToggle.sass'

export default function ThemeToggle() {

    const { setTheme } = useContext(MyContext)

    return (
        <button className="toggle-theme-btn" onClick={() => setTheme(currentTheme => !currentTheme)}>
            <div className="toggle-theme-circle"></div>
        </button>
    )
}