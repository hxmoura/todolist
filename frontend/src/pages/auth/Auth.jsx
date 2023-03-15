import React, { useState, useContext } from 'react'
import api from '../../api/axios'
import './Auth.sass'
import { Check, User, Lock, Warning, Eye, EyeSlash } from 'phosphor-react'

import MockupDark from '../../assets/imgs/mockup-dark.png'
import MockupLight from '../../assets/imgs/mockup-light.png'
import ThemeToggle from '../../components/ThemeToogle/ThemeToggle'
import MyContext from '../../context/myContext'

export default function Auth() {

    const [auth, setAuth] = useState('signin')
    const [input, setInput] = useState({ username: '', password: '', confirmPassword: '' })
    const { theme } = useContext(MyContext)

    const [showPassSignin, setShowPassSignin] = useState(false)
    const [showPassSignup, setShowPassSignup] = useState(false)
    const [showConfirmPassSignup, setShowConfirmPassSignup] = useState(false)

    function signin(e) {
        e.preventDefault()
        api.post('/signin', { username: input.username, password: input.password })
            .then(resp => {
                localStorage.setItem('token', resp.data.token)
                window.location.href = '/home'
            })
            .catch(err => {
                const notify = document.getElementById('notify')
                const notifyText = document.getElementById('notifyText')
                notifyText.innerText = err.response.data.msg
                notify.classList.add('auth-form-notification-show')
            })
    }

    function signup(e) {
        e.preventDefault()
        api.post('/signup', { username: input.username, password: input.password, confirmPassword: input.confirmPassword })
            .then(() => {
                const notify = document.getElementById('notify')
                const notifyText = document.getElementById('notifyText')
                notifyText.innerText = 'Seu cadastrado foi concluído com sucesso!'
                notify.classList.add('auth-form-notification-show')
                setTimeout(() => switchPage('signin'), 3000)
            })
            .catch(err => {
                const notify = document.getElementById('notify')
                const notifyText = document.getElementById('notifyText')
                notifyText.innerText = err.response.data.msg
                notify.classList.add('auth-form-notification-show')
            })
    }

    function switchPage(page) {
        const notify = document.getElementById('notify')
        notify.classList.remove('auth-form-notification-show')
        setAuth(page)
        setInput({ username: '', password: '', confirmPassword: '' })
    }

    return (
        <div className='auth-page'>
            <div className="ellipse ellipse-position-1"></div>
            <div className="ellipse ellipse-position-2"></div>
            <div className="auth-page-container">
                <header className="header">
                    <div className="header-logo">
                        <Check className="header-logo-icon" weight="bold" />
                        <h1 className="header-logo-text">Todolist</h1>
                    </div>
                    <div>
                        <ThemeToggle />
                    </div>
                </header>
                <main className="main">
                    <section className="info">
                        <h2 className="info-title"><span className="info-title info-title-color">Organize e complete</span> suas tarefas do dia</h2>
                        <p className="info-desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                        </p>
                        {theme ? <img className="info-img" src={MockupDark} alt="Mockup" /> : <img className="info-img" src={MockupLight} alt="Mockup" />}
                    </section>
                    {auth === 'signup' ? (
                        <section className="auth-form">
                            <div id="notify" className="auth-form-notification">
                                <Warning className="auth-form-notification-icon" size={25} weight="fill" />
                                <p id="notifyText" className="auth-form-notification-text"></p>
                            </div>
                            <h4 className="auth-form-title">Cadastro</h4>
                            <form className="auth-form-container">
                                <div className="auth-form-input">
                                    <User className="auth-form-input-icon" size={25} weight="fill" />
                                    <input className="auth-form-input-text" type="text" placeholder='Informe o usuário'
                                        value={input.username} onChange={e => setInput({ ...input, username: e.target.value })} required />
                                </div>
                                <div className="auth-form-input">
                                    <Lock className="auth-form-input-icon" size={25} weight="fill" />
                                    {showPassSignup ? <Eye className="auth-form-input-password"
                                        onClick={_ => setShowPassSignup(false)} size={25} weight="thin" /> :
                                        <EyeSlash className="auth-form-input-password"
                                            onClick={_ => setShowPassSignup(true)} size={25} weight="thin" />
                                    }
                                    <input className="auth-form-input-text" type={showPassSignup ? 'text' : 'password'}
                                        placeholder='Informe a senha' value={input.password} onChange={e => setInput({ ...input, password: e.target.value })} required />
                                </div>
                                <div className="auth-form-input">
                                    <Lock className="auth-form-input-icon" size={25} weight="fill" />
                                    {showConfirmPassSignup ? <Eye className="auth-form-input-password" onClick={_ => setShowConfirmPassSignup(false)} size={25} weight="thin" /> :
                                        <EyeSlash className="auth-form-input-password" onClick={_ => setShowConfirmPassSignup(true)} size={25} weight="thin" />}
                                    <input className="auth-form-input-text" type={showConfirmPassSignup ? 'text' : 'password'} placeholder='Confirme a senha' value={input.confirmPassword} onChange={e => setInput({ ...input, confirmPassword: e.target.value })} required />
                                </div>
                                <button className="auth-form-btn" type="submit" onClick={e => signup(e)}>Cadastrar</button>
                                <button className="auth-form-text" type="button" onClick={_ => switchPage('signin')}>Fazer login</button>
                            </form>
                        </section>
                    ) : (
                        <section className="auth-form">
                            <div id="notify" className="auth-form-notification">
                                <Warning className="auth-form-notification-icon" size={25} weight="fill" />
                                <p id="notifyText" className="auth-form-notification-text"></p>
                            </div>
                            <h4 className="auth-form-title">Login</h4>
                            <form className="auth-form-container">
                                <div className="auth-form-input">
                                    <User className="auth-form-input-icon" size={25} weight="fill" />
                                    <input className="auth-form-input-text" type="text" placeholder='Informe o usuário' value={input.username} onChange={e => setInput({ ...input, username: e.target.value })} required />
                                </div>
                                <div className="auth-form-input">
                                    <Lock className="auth-form-input-icon" size={25} weight="fill" />
                                    {showPassSignin ? <Eye className="auth-form-input-password" onClick={_ => setShowPassSignin(false)} size={25} weight="thin" /> :
                                        <EyeSlash className="auth-form-input-password" onClick={_ => setShowPassSignin(true)} size={25} weight="thin" />}
                                    <input className="auth-form-input-text" type={showPassSignin ? 'text' : 'password'} placeholder='Informe a senha' value={input.password} onChange={e => setInput({ ...input, password: e.target.value })} required />
                                </div>
                                <button className="auth-form-btn" type="submit" onClick={e => signin(e)}>Entrar</button>
                                <button className="auth-form-text" type="button" onClick={_ => switchPage('signup')}>Criar conta</button>
                            </form>
                        </section>
                    )}
                </main>
            </div>
        </div>
    )
}