import { useEffect, useMemo, useState } from 'react'
import { HomeIndicator, StatusBar } from './SplashScreen.jsx'

const analyzeSteps = [
  {
    id: 'mood',
    label: '무드 분석 중...',
    threshold: 33,
  },
  {
    id: 'place',
    label: '장소 매칭 중...',
    threshold: 66,
  },
  {
    id: 'ready',
    label: '추천 준비 중...',
    threshold: 100,
  },
]

const navItems = [
  {
    id: 'home',
    label: '홈',
    icon: (
      <>
        <img className="nav-home-body" src={`${import.meta.env.BASE_URL}assets/home-nav-home-2.svg`} alt="" />
        <img className="nav-home-door" src={`${import.meta.env.BASE_URL}assets/home-nav-home-1.svg`} alt="" />
      </>
    ),
  },
  {
    id: 'save',
    label: '저장',
    icon: <img src={`${import.meta.env.BASE_URL}assets/home-nav-save.svg`} alt="" />,
  },
  {
    id: 'search',
    label: '탐색',
    icon: (
      <>
        <img className="nav-search-ring" src={`${import.meta.env.BASE_URL}assets/home-nav-search-2.svg`} alt="" />
        <img className="nav-search-dot" src={`${import.meta.env.BASE_URL}assets/home-nav-search-1.svg`} alt="" />
      </>
    ),
  },
  {
    id: 'profile',
    label: '마이페이지',
    icon: (
      <>
        <img className="nav-profile-shoulder" src={`${import.meta.env.BASE_URL}assets/home-nav-user-1.svg`} alt="" />
        <img className="nav-profile-head" src={`${import.meta.env.BASE_URL}assets/home-nav-user-2.svg`} alt="" />
      </>
    ),
  },
]

function AnalyzeScreen({ onBack, onHome, onMyPage, onComplete, onCameraAddress }) {
  const [progress, setProgress] = useState(33)

  useEffect(() => {
    const progressTimers = [
      window.setTimeout(() => setProgress(66), 1200),
      window.setTimeout(() => setProgress(100), 2400),
      window.setTimeout(() => onComplete?.(), 3400),
    ]

    return () => progressTimers.forEach((timerId) => window.clearTimeout(timerId))
  }, [onComplete])

  const progressStyle = useMemo(
    () => ({
      '--analyze-progress': progress,
    }),
    [progress],
  )

  return (
    <section className="analyze-screen" aria-label="스타일 분석">
      <StatusBar />

      <header className="analyze-header">
        <button className="analyze-icon-button analyze-back" type="button" aria-label="뒤로가기" onClick={onBack}>
          <img className="analyze-back-head" src={`${import.meta.env.BASE_URL}assets/address-back-head.svg`} alt="" />
          <img className="analyze-back-line" src={`${import.meta.env.BASE_URL}assets/address-back-line.svg`} alt="" />
        </button>
        <button className="analyze-icon-button analyze-menu" type="button" aria-label="메뉴">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="analyze-content">
        <div className="analyze-body">
          <div className="analyze-progress-ring" style={progressStyle} aria-label={`분석 진행률 ${progress}%`}>
            <svg viewBox="0 0 104 104" aria-hidden="true">
              <circle className="analyze-ring-track" cx="52" cy="52" r="45" />
              <circle className="analyze-ring-value" cx="52" cy="52" r="45" />
            </svg>
            <strong>{progress}%</strong>
          </div>

          <section className="analyze-copy" aria-labelledby="analyze-title">
            <h1 id="analyze-title">스타일 분석 중</h1>
            <p>
              착장을 분석하고 있어요
              <br />
              잠시만 기다려주세요
            </p>
          </section>

          <ul className="analyze-step-list" aria-label="분석 단계">
            {analyzeSteps.map((step) => (
              <li className={progress >= step.threshold ? 'is-active' : ''} key={step.id}>
                <span />
                {step.label}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <AnalyzeBottomNavigation onHome={onHome} onMyPage={onMyPage} onCameraAddress={onCameraAddress} />
      <HomeIndicator />
    </section>
  )
}

function AnalyzeBottomNavigation({ onHome, onMyPage, onCameraAddress }) {
  return (
    <nav className="home-bottom-nav" aria-label="하단 메뉴">
      <div className="home-nav-items">
        {navItems.map((item) => (
          <button
            className={`home-nav-item ${item.active ? 'is-active' : ''}`}
            key={item.id}
            type="button"
            aria-current={item.active ? 'page' : undefined}
            onClick={item.id === 'home' ? onHome : item.id === 'save' || item.id === 'profile' ? onMyPage : undefined}
          >
            <span className="home-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <button className="home-camera-button" type="button" aria-label="착장 촬영" onClick={onCameraAddress}>
        <span>
          <img src={`${import.meta.env.BASE_URL}assets/home-camera.svg`} alt="" />
        </span>
      </button>
    </nav>
  )
}

export default AnalyzeScreen
