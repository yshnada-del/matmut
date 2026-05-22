import { useState } from 'react'
import { HomeIndicator, StatusBar } from './SplashScreen.jsx'

const socialButtons = [
  { id: 'google', label: '구글 로그인', icon: '/assets/social-google.png' },
  { id: 'naver', label: '네이버 로그인', icon: '/assets/social-naver.png' },
  { id: 'kakao', label: '카카오톡 로그인', icon: '/assets/social-kakao.png' },
  { id: 'apple', label: '애플 로그인', icon: '/assets/social-apple.png' },
]

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState('login')
  const isLogin = mode === 'login'

  return (
    <section className="auth-screen" aria-label={isLogin ? '로그인' : '회원가입'}>
      <StatusBar />
      <div className="auth-main">
        <div className="auth-tabs" role="tablist" aria-label="계정 메뉴">
          <button
            className={`auth-tab ${isLogin ? 'is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={isLogin}
            onClick={() => setMode('login')}
          >
            로그인
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={!isLogin}
            onClick={() => setMode('signup')}
          >
            회원가입
          </button>
        </div>

        {isLogin ? <LoginForm onLogin={onLogin} onSignup={() => setMode('signup')} /> : <SignupForm />}
      </div>
      <HomeIndicator />
    </section>
  )
}

function LoginForm({ onLogin, onSignup }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('login')
    onLogin?.()
  }

  return (
    <div className="auth-content">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <TextField label="이메일" type="email" defaultValue="matmut@gmail.com" />
        <TextField label="비밀번호" type="password" defaultValue="matmut1234" hasIcon />

        <div className="auth-links" aria-label="계정 찾기">
          <button type="button">아이디 찾기</button>
          <span aria-hidden="true">|</span>
          <button type="button">비밀번호 찾기</button>
        </div>

        <button className="auth-submit" type="submit">
          로그인
        </button>
      </form>

      <p className="signup-prompt">
        아직 계정이 없나요?
        <button type="button" onClick={onSignup}>
          회원가입
        </button>
      </p>

      <div className="social-login">
        <div className="social-divider">
          <span />
          <p>간편하게 시작하기</p>
          <span />
        </div>
        <div className="social-buttons" aria-label="소셜 로그인">
          {socialButtons.map((item) => (
            <button key={item.id} className="social-button" type="button" aria-label={item.label}>
              <img src={item.icon} alt="" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function SignupForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [errors, setErrors] = useState({})

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = '이메일 형식이 올바르지 않아요.'
    }
    if (form.password !== form.passwordConfirm) {
      nextErrors.passwordConfirm = '비밀번호가 일치하지 않아요.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      console.log('signup')
    }
  }

  return (
    <div className="auth-content signup-content">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="이메일"
          type="text"
          value={form.email}
          placeholder="이메일을 입력하세요."
          error={errors.email}
          onChange={updateField('email')}
        />
        <TextField
          label="비밀번호"
          type="password"
          value={form.password}
          placeholder="비밀번호를 입력하세요."
          hasIcon
          onChange={updateField('password')}
        />
        <TextField
          label="비밀번호 확인"
          type="password"
          value={form.passwordConfirm}
          placeholder="비밀번호를 다시 입력하세요."
          error={errors.passwordConfirm}
          hasIcon
          onChange={updateField('passwordConfirm')}
        />

        <button className="auth-submit signup-submit" type="submit">
          회원가입
        </button>
      </form>
    </div>
  )
}

function TextField({ label, hasIcon = false, error, ...inputProps }) {
  const describedById = error ? `${label.replace(/\s/g, '-')}-error` : undefined

  return (
    <label className={`auth-field ${error ? 'has-error' : ''}`}>
      <span>{label}</span>
      <div className="auth-input-wrap">
        <input aria-invalid={Boolean(error)} aria-describedby={describedById} {...inputProps} />
        {hasIcon ? (
          <button className="password-toggle" type="button" aria-label={`${label} 보기`}>
            <img src="/assets/icon-eye.png" alt="" />
          </button>
        ) : null}
      </div>
      {error ? (
        <span className="auth-error" id={describedById}>
          {error}
        </span>
      ) : null}
    </label>
  )
}

export default AuthScreen
