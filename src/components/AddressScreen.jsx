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

function AddressScreen({ onBack, onHome, onMyPage, onNext, onCameraAddress }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onNext?.()
  }

  return (
    <section className="address-screen" aria-label="지역 검색">
      <StatusBar />

      <header className="address-header">
        <button className="address-icon-button address-back" type="button" aria-label="뒤로가기" onClick={onBack}>
          <img className="address-back-head" src="/assets/address-back-head.svg" alt="" />
          <img className="address-back-line" src="/assets/address-back-line.svg" alt="" />
        </button>
        <button className="address-icon-button address-menu" type="button" aria-label="메뉴">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="address-content">
        <section className="address-copy" aria-labelledby="address-title">
          <h1 id="address-title">
            어느 지역의
            <br />
            장소를 찾으시나요?
          </h1>
          <p>오늘 방문할 지역을 검색해주세요</p>
        </section>

        <form className="address-form" onSubmit={handleSubmit}>
          <label className="address-search-field">
            <span className="sr-only">지역 검색</span>
            <input type="text" defaultValue="서울 한남" placeholder="지역을 입력해주세요." />
            <img src="/assets/address-search.svg" alt="" />
          </label>
          <p className="address-example">ex)서울 합정, 경기도 부천 등</p>

          <button className="address-next-button" type="submit">
            다음으로 넘어가기
            <img src="/assets/address-arrow-right.svg" alt="" />
          </button>
        </form>
      </main>

      <AddressBottomNavigation onHome={onHome} onMyPage={onMyPage} onCameraAddress={onCameraAddress} />
      <HomeIndicator />
    </section>
  )
}

function AddressBottomNavigation({ onHome, onMyPage, onCameraAddress }) {
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

export default AddressScreen
