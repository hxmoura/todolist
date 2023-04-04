import React, { useContext, useState } from 'react'
import api from '../../api/axios'
import './Auth.sass'
import { Check, User, Lock, Eye, EyeSlash } from 'phosphor-react'

import MockupDark from '../../assets/imgs/mockup-dark.png'
import MockupLight from '../../assets/imgs/mockup-light.png'
import Notification from '../../components/Notification/Notification'
import ThemeToggle from '../../components/ThemeToogle/ThemeToggle'
import { ThemeContext } from '../../context/ThemeContext'

export default function Auth() {

    const [auth, setAuth] = useState('signin')
    const [input, setInput] = useState({ username: '', password: '', confirmPassword: '' })
    const { theme } = useContext(ThemeContext)

    const [showPassSignin, setShowPassSignin] = useState(false)
    const [showPassSignup, setShowPassSignup] = useState(false)
    const [showConfirmPassSignup, setShowConfirmPassSignup] = useState(false)

    const [msgUsername, setMsgUsername] = useState({ msg: '', status: 'hidden' })
    const [msgPassword, setMsgPassword] = useState({ msg: '', status: 'hidden' })
    const [msgConfirmPassword, setMsgConfirmPassword] = useState({ msg: '', status: 'hidden' })

    const [msgConfirmRegister, setMsgConfirmRegister] = useState(false)

    function signin(e) {
        e.preventDefault()
        validateUser()
        validatePassword()
        api.post('/signin', { username: input.username, password: input.password })
            .then(resp => {
                localStorage.setItem('token', resp.data.token)
                window.location.href = '/home'
            })
            .catch(err => {
                if (!!err.response.data.notUser) {
                    setMsgUsername({ msg: 'Usuário não encontrado', status: 'visible' })
                }
                if (!!err.response.data.invalidPassword) {
                    setMsgPassword({ msg: 'A senha é inválida', status: 'visible' })
                }
            })
    }

    function signup(e) {
        e.preventDefault()
        validateUser()
        validatePassword()
        validateConfirmPassword()
        api.post('/signup', { username: input.username, password: input.password, confirmPassword: input.confirmPassword })
            .then(() => {
                switchPage('signin')
                setMsgConfirmRegister(true)
                setTimeout(() => setMsgConfirmRegister(false), 5000)
            })
            .catch(err => {
                if (!!err.response.data.existingUser) {
                    setMsgUsername({ msg: 'Usuário já cadastrado, tente outro!', status: 'visible' })
                }
            })
    }

    function switchPage(page) {
        setAuth(page)
        setMsgConfirmRegister(false)
        setMsgUsername({ msg: '', status: 'hidden' })
        setMsgPassword({ msg: '', status: 'hidden' })
        setMsgConfirmPassword({ msg: '', status: 'hidden' })
        setInput({ username: '', password: '', confirmPassword: '' })
    }

    function validateUser() {
        if (!input.username) {
            setMsgUsername({ msg: 'Informe o nome de usuário', status: 'visible' })
        }
        else if (input.username.length < 3 || input.username.length > 24) {
            setMsgUsername({ msg: 'O nome de usuário deve ter entre 3 e 24 caracteres', status: 'visible' })
        }
        else {
            setMsgUsername({ msg: '', status: 'confirmed' })
        }
    }

    function validatePassword() {
        if (!input.password) {
            setMsgPassword({ msg: 'Informe a senha', status: 'visible' })
        }
        else if (input.password.length < 6) {
            setMsgPassword({ msg: 'A senha deve conter no mínimo 6 caracteres', status: 'visible' })
        }
        else {
            setMsgPassword({ msg: '', status: 'confirmed' })
        }
    }

    function validateConfirmPassword() {
        if (!input.confirmPassword) {
            setMsgConfirmPassword({ msg: 'Confirme a senha', status: 'visible' })
        }
        else if (input.confirmPassword !== input.password) {
            setMsgConfirmPassword({ msg: 'As senhas não conferem', status: 'visible' })
        }
        else {
            setMsgConfirmPassword({ msg: '', status: 'confirmed' })
        }
    }

    const validateWarningClass = (inputArea) => inputArea.status === 'visible' ? 'notification-warning' : ''
    const validateConfirmedClass = (inputArea) => inputArea.status === 'confirmed' ? 'notification-confirmed' : ''

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
                        <h2 className="info-title">
                            <span className="info-title info-title-color">Organize e complete</span>
                            suas tarefas do dia
                        </h2>
                        <p className="info-desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                        </p>
                        {theme ?
                            <img className="info-img" src={MockupDark} alt="Mockup" /> :
                            <img className="info-img" src={MockupLight} alt="Mockup" />
                        }
                    </section>
                    {auth === 'signup' ? (
                        <section className="auth-form">
                            <h4 className="auth-form-title">Cadastro</h4>
                            <form className="auth-form-container">
                                <div className="auth-form-input">
                                    <div className="auth-form-input-field">
                                        <User className="auth-form-input-icon" size={25} weight="fill" />
                                        <input className={`auth-form-input-text ${validateWarningClass(msgUsername)} ${validateConfirmedClass(msgUsername)}`}
                                            type="text" placeholder='Informe o usuário' onKeyUp={validateUser}
                                            value={input.username} onChange={e => setInput({ ...input, username: e.target.value })} required />
                                    </div>
                                    <Notification state={msgUsername} />
                                </div>
                                <div className="auth-form-input">
                                    <div className="auth-form-input-field">
                                        <Lock className="auth-form-input-icon" size={25} weight="fill" />
                                        {showPassSignup ? <Eye className="auth-form-input-password"
                                            onClick={_ => setShowPassSignup(false)} size={25} weight="thin" /> :
                                            <EyeSlash className="auth-form-input-password"
                                                onClick={_ => setShowPassSignup(true)} size={25} weight="thin" />
                                        }
                                        <input autoComplete="on" className={`auth-form-input-text ${validateWarningClass(msgPassword)} ${validateConfirmedClass(msgPassword)}`}
                                            type={showPassSignup ? 'text' : 'password'} onKeyUp={validatePassword}
                                            placeholder='Informe a senha' value={input.password} onChange={e => setInput({ ...input, password: e.target.value })} required />
                                    </div>
                                    <Notification state={msgPassword} />
                                </div>
                                <div className="auth-form-input">
                                    <div className="auth-form-input-field">
                                        <Lock className="auth-form-input-icon" size={25} weight="fill" />
                                        {showConfirmPassSignup ?
                                            <Eye className="auth-form-input-password" onClick={_ => setShowConfirmPassSignup(false)} size={25} weight="thin" /> :
                                            <EyeSlash className="auth-form-input-password" onClick={_ => setShowConfirmPassSignup(true)} size={25} weight="thin" />
                                        }
                                        <input autoComplete="on" className={`auth-form-input-text ${validateWarningClass(msgConfirmPassword)} ${validateConfirmedClass(msgConfirmPassword)}`}
                                            type={showConfirmPassSignup ? 'text' : 'password'} onKeyUp={validateConfirmPassword}
                                            placeholder='Confirme a senha' value={input.confirmPassword} onChange={e => setInput({ ...input, confirmPassword: e.target.value })} required />
                                    </div>
                                    <Notification state={msgConfirmPassword} />
                                </div>
                                <button className="auth-form-btn" type="submit" onClick={e => signup(e)}>Cadastrar</button>
                                <button className="auth-form-text" type="button" onClick={_ => switchPage('signin')}>Fazer login</button>
                            </form>
                        </section>
                    ) : (
                        <section className="auth-form">
                            {msgConfirmRegister && (
                                <div className="auth-form-completed-registration">
                                    <p className="auth-form-completed-registration-text">Cadastro realizado com sucesso!</p>
                                </div>
                            )}
                            <h4 className="auth-form-title">Login</h4>
                            <form className="auth-form-container">
                                <div className="auth-form-input">
                                    <div className="auth-form-input-field">
                                        <User className="auth-form-input-icon" size={25} weight="fill" />
                                        <input className={`auth-form-input-text ${validateWarningClass(msgUsername)} ${validateConfirmedClass(msgUsername)}`}
                                            type="text" placeholder='Informe o usuário' onKeyUp={validateUser} value={input.username}
                                            onChange={e => setInput({ ...input, username: e.target.value })} required />
                                    </div>
                                    <Notification state={msgUsername} />
                                </div>
                                <div className="auth-form-input">
                                    <div className="auth-form-input-field">
                                        <Lock className="auth-form-input-icon" size={25} weight="fill" />
                                        {showPassSignin ?
                                            <Eye className="auth-form-input-password" onClick={_ => setShowPassSignin(false)} size={25} weight="thin" /> :
                                            <EyeSlash className="auth-form-input-password" onClick={_ => setShowPassSignin(true)} size={25} weight="thin" />
                                        }
                                        <input className={`auth-form-input-text ${validateWarningClass(msgPassword)} ${validateConfirmedClass(msgPassword)}`}
                                            autoComplete="on" onKeyUp={validatePassword} type={showPassSignin ? 'text' : 'password'}
                                            placeholder='Informe a senha' value={input.password}
                                            onChange={e => setInput({ ...input, password: e.target.value })} required />
                                    </div>
                                    <Notification state={msgPassword} />
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