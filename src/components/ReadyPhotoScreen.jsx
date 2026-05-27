import { useRef } from 'react'
import { HomeIndicator, StatusBar } from './SplashScreen.jsx'

const navItems = [
  {
    id: 'home',
    label: '홈',
    icon: (
      <>
        <img className="nav-home-body" src="/assets/home-nav-home-2.svg" alt="" />
        <img className="nav-home-door" src="/assets/home-nav-home-1.svg" alt="" />
      </>
    ),
  },
  {
    id: 'save',
    label: '저장',
    icon: <img src="/assets/home-nav-save.svg" alt="" />,
  },
  {
    id: 'search',
    label: '탐색',
    icon: (
      <>
        <img className="nav-search-ring" src="/assets/home-nav-search-2.svg" alt="" />
        <img className="nav-search-dot" src="/assets/home-nav-search-1.svg" alt="" />
      </>
    ),
  },
  {
    id: 'profile',
    label: '마이페이지',
    icon: (
      <>
        <img className="nav-profile-shoulder" src="/assets/home-nav-user-1.svg" alt="" />
        <img className="nav-profile-head" src="/assets/home-nav-user-2.svg" alt="" />
      </>
    ),
  },
]

function ReadyPhotoScreen({ onBack, onHome, onMyPage, onTakePhoto, onGalleryPhoto, onCameraAddress }) {
  const fileInputRef = useRef(null)

  const handleGalleryClick = () => {
    fileInputRef.current?.click()
  }

  const handleGalleryChange = (event) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      onGalleryPhoto?.(selectedFile)
      event.target.value = ''
    }
  }

  return (
    <section className="ready-photo-screen" aria-label="촬영 준비">
      <StatusBar />

      <header className="ready-photo-header">
        <button className="ready-photo-icon-button ready-photo-back" type="button" aria-label="뒤로가기" onClick={onBack}>
          <img className="ready-photo-back-head" src="/assets/address-back-head.svg" alt="" />
          <img className="ready-photo-back-line" src="/assets/address-back-line.svg" alt="" />
        </button>
        <button className="ready-photo-icon-button ready-photo-menu" type="button" aria-label="메뉴">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="ready-photo-content">
        <section className="ready-photo-copy" aria-labelledby="ready-photo-title">
          <h1 id="ready-photo-title">
            오늘 착장 사진을
            <br />
            보여주세요
          </h1>
          <p>스타일을 분석해 딱 맞는 장소를 추천해드려요</p>
        </section>

        <section className="ready-upload-box" aria-label="사진 예시">
          <span className="ready-upload-icon">
            <img src="/assets/home-camera.svg" alt="" />
          </span>
          <p>
            전신 사진 또는
            <br />
            상의가 보이는 사진
          </p>
        </section>

        <div className="ready-photo-actions">
          <button className="ready-primary-button" type="button" onClick={onTakePhoto}>
            <span className="ready-action-icon">
              <img src="/assets/home-camera.svg" alt="" />
            </span>
            카메라로 촬영하기
          </button>
          <button className="ready-secondary-button" type="button" onClick={handleGalleryClick}>
            <img className="ready-gallery-icon" src="/assets/ready-photo-gallery.svg" alt="" />
            갤러리 업로드하기
          </button>
          <input
            ref={fileInputRef}
            className="ready-file-input"
            type="file"
            accept="image/*"
            onChange={handleGalleryChange}
          />
        </div>
      </main>

      <ReadyPhotoBottomNavigation onHome={onHome} onMyPage={onMyPage} onCameraAddress={onCameraAddress} />
      <HomeIndicator />
    </section>
  )
}

function ReadyPhotoBottomNavigation({ onHome, onMyPage, onCameraAddress }) {
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
          <img src="/assets/home-camera.svg" alt="" />
        </span>
      </button>
    </nav>
  )
}

export default ReadyPhotoScreen
