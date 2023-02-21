import React, { useState } from 'react'
import api from '../../api/axios'
import AuthInput from '../../components/AuthInput/AuthInput'
import './Auth.sass'

// import { Warning, User, Lock } from 'phosphor-react'

export default function Home() {

    const [page, setPage] = useState('signin')
    const [input, setInput] = useState({ username: '', password: '', confirmPassword: '' })

    function signin() {
        api.post('/signin', { username: input.username, password: input.password })
            .then(resp => {
                localStorage.setItem('token', resp.data.token)
                window.location.href = '/home'
            })
            .catch(err => {
                const msg = document.getElementById('msg')
                msg.innerHTML = err.response.data.msg
                msg.style = 'visibility: visible'
            })
    }

    function signup() {
        api.post('/signup', { username: input.username, password: input.password, confirmPassword: input.confirmPassword })
            .then(() => {
                const msg = document.getElementById('msg')
                msg.innerText = 'Seu cadastrado foi concluído com sucesso! Em 5 segundos você será redirecionado para fazer o login!'
                msg.style = 'visibility: visible'
                setTimeout(() => switchPage('signin'), 5000)
            })
            .catch(err => {
                const msg = document.getElementById('msg')
                msg.innerText = err.response.data.msg
                msg.style = 'visibility: visible'
            })
    }

    function switchPage(page) {
        const msg = document.getElementById('msg')
        msg.style = 'visibility: hidden'

        setPage(page)
        setInput({ username: '', password: '', confirmPassword: '' })
    }

    return (
        <div className="home">
            {page === 'signup' ? (
                <section className="signup">
                    <div className="auth-content">
                        <h1 className="auth-title">Cadastro</h1>
                        <div className="auth-form">
                            <AuthInput placeholder="Informe o usuário..." type="text"
                                value={input.username} onChange={e => setInput({ ...input, username: e.target.value })} max={24} />
                            <AuthInput placeholder="Informe a senha..." type="password"
                                value={input.password} onChange={e => setInput({ ...input, password: e.target.value })} max={50} />
                            <AuthInput placeholder="Confirme a senha..." type="password"
                                value={input.confirmPassword} onChange={e => setInput({ ...input, confirmPassword: e.target.value })} max={50} />
                            <button className="auth-submit" onClick={signup}>Cadastrar</button>
                        </div>
                        <div onClick={() => switchPage('signin')} className="auth-redirect">Fazer login</div>
                        <span className="auth-msg hidden" id="msg">Erro</span>
                    </div>
                </section>
            ) : (
                <section className="signin">
                    <div className="auth-content">
                        <h1 className="auth-title">Login</h1>
                        <div className="auth-form">
                            <AuthInput placeholder="Informe o usuário..." type="text"
                                value={input.username} onChange={e => setInput({ ...input, username: e.target.value })} max={24} />
                            <AuthInput placeholder="Informe a senha..." type="password"
                                value={input.password} onChange={e => setInput({ ...input, password: e.target.value })} max={50} />
                            <button className="auth-submit" onClick={signin}>Entrar</button>
                        </div>
                        <div onClick={() => switchPage('signup')} className="auth-redirect">Criar conta</div>
                        <span className="auth-msg hidden" id="msg">Erro</span>
                    </div>
                </section>
            )}
        </div>
    )
}