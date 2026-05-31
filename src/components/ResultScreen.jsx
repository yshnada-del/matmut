import { useRef } from 'react'
import { HomeIndicator, StatusBar } from './SplashScreen.jsx'

const styleTags = ['미니멀', '시크', '스트릿']

const resultPlaces = [
  {
    id: 'pipeground',
    name: '파이프그라운드 한남',
    category: '피자',
    image: `${import.meta.env.BASE_URL}assets/aichat-place-pipeground.png`,
    rating: '4.7',
    reviews: '6,802',
    price: '20,000~30,000원대',
    phone: '0507-1467-1500',
    distance: '한강진역 3번 출구에서 157m',
  },
  {
    id: 'oasis',
    name: '오아시스 한남',
    category: '브런치',
    image: `${import.meta.env.BASE_URL}assets/aichat-place-oasis.png`,
    rating: '4.0',
    reviews: '3,252',
    price: '20,000~30,000원대',
    phone: '02-790-8906',
    distance: '이태원역 2번 출구에서 642m',
  },
  {
    id: 'tatsu',
    name: '한남타츠',
    category: '이자카야',
    image: `${import.meta.env.BASE_URL}assets/aichat-place-tatsu.png`,
    rating: '4.3',
    reviews: '1,632',
    price: '50,000~70,000원대',
    phone: '02-797-0624',
    distance: '한남역 1번 출구에서 789m',
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

function ResultScreen({ onBack, onHome, onMyPage, onCameraAddress, onOpenDetail, onReserve, onSavePlace, savedPlaceIds = [] }) {
  return (
    <section className="result-screen" aria-label="추천 결과">
      <StatusBar />

      <header className="result-header">
        <button className="result-icon-button result-back" type="button" aria-label="뒤로가기" onClick={onBack}>
          <img className="result-back-head" src={`${import.meta.env.BASE_URL}assets/address-back-head.svg`} alt="" />
          <img className="result-back-line" src={`${import.meta.env.BASE_URL}assets/address-back-line.svg`} alt="" />
        </button>
        <button className="result-icon-button result-menu" type="button" aria-label="메뉴">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="result-content">
        <section className="result-style-section" aria-labelledby="result-style-title">
          <div className="result-style-copy">
            <p>분석된 스타일</p>
            <h1 id="result-style-title">미니멀 시크</h1>
            <div className="result-tags" aria-label="스타일 태그">
              {styleTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <p className="result-style-description">이 무드에 어울리는 장소를 추천해드려요</p>
        </section>

        <section className="result-place-section" aria-labelledby="result-place-title">
          <div className="result-section-heading">
            <h2 id="result-place-title">추천 장소</h2>
            <button type="button">
              <img src={`${import.meta.env.BASE_URL}assets/result-refresh.svg`} alt="" />
              다시 추천받기
            </button>
          </div>

          <article className="result-recommendation-panel">
            <p className="result-panel-title">한남동 기준으로 추천해드려요</p>
            <div className="result-card-window">
              <DragScrollRow className="result-card-row">
                {resultPlaces.map((place) => (
                  <PlaceCard place={place} key={place.id} onOpenDetail={onOpenDetail} onReserve={onReserve} onSavePlace={onSavePlace} isSaved={savedPlaceIds.includes(place.id)} />
                ))}
              </DragScrollRow>
            </div>
          </article>
        </section>
      </main>

      <ResultBottomNavigation onHome={onHome} onMyPage={onMyPage} onCameraAddress={onCameraAddress} />
      <HomeIndicator />
    </section>
  )
}

function PlaceCard({ place, onOpenDetail, onReserve, onSavePlace, isSaved }) {
  const stopCardDrag = (event) => {
    event.stopPropagation()
  }

  const handleDetailClick = (event) => {
    event.stopPropagation()
    onOpenDetail?.(place.id)
  }

  const handleReserveClick = (event) => {
    event.stopPropagation()
    onReserve?.(place.id)
  }

  const handleSaveClick = (event) => {
    event.stopPropagation()
    onSavePlace?.(place)
  }

  return (
    <article className="result-place-card">
      <img className="result-place-image" src={place.image} alt="" />
      <div className="result-place-info">
        <div className="result-place-heading">
          <div>
            <h3>{place.name}</h3>
            <p>{place.category}</p>
          </div>
          <button className={isSaved ? 'is-saved' : ''} type="button" aria-label={`${place.name} 저장`} aria-pressed={isSaved} onPointerDown={stopCardDrag} onClick={handleSaveClick}>
            <img src={isSaved ? `${import.meta.env.BASE_URL}assets/bookmark-filled.svg` : `${import.meta.env.BASE_URL}assets/aichat-bookmark.svg`} alt="" />
          </button>
        </div>

        <div className="result-place-meta">
          <span>
            <img src={`${import.meta.env.BASE_URL}assets/aichat-star.svg`} alt="" />
            <strong>{place.rating}</strong>
            <em>({place.reviews})</em>
          </span>
          <span>
            <img src={`${import.meta.env.BASE_URL}assets/aichat-price.svg`} alt="" />
            {place.price}
          </span>
          <span>
            <img src={`${import.meta.env.BASE_URL}assets/aichat-phone.svg`} alt="" />
            {place.phone}
          </span>
          <span>
            <img src={`${import.meta.env.BASE_URL}assets/aichat-clock.svg`} alt="" />
            {place.distance}
          </span>
        </div>

        <div className="result-card-actions">
          <button className="result-detail-button" type="button" onPointerDown={stopCardDrag} onClick={handleDetailClick}>
            상세 정보
          </button>
          <button className="result-reserve-button" type="button" onPointerDown={stopCardDrag} onClick={handleReserveClick}>
            <img src={`${import.meta.env.BASE_URL}assets/result-calendar.svg`} alt="" />
            예약하기
          </button>
        </div>
      </div>
    </article>
  )
}

function DragScrollRow({ children, className, ...props }) {
  const rowRef = useRef(null)
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  })

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    const row = rowRef.current
    if (!row) {
      return
    }

    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: row.scrollLeft,
    }
    row.setPointerCapture?.(event.pointerId)
    row.classList.add('is-dragging')
  }

  const handlePointerMove = (event) => {
    const row = rowRef.current
    if (!row || !dragState.current.isDragging) {
      return
    }

    event.preventDefault()
    const deltaX = event.clientX - dragState.current.startX
    row.scrollLeft = dragState.current.scrollLeft - deltaX
  }

  const stopDragging = (event) => {
    const row = rowRef.current
    if (!row) {
      return
    }

    dragState.current.isDragging = false
    row.releasePointerCapture?.(event.pointerId)
    row.classList.remove('is-dragging')
  }

  return (
    <div
      className={className}
      ref={rowRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onPointerLeave={stopDragging}
      {...props}
    >
      {children}
    </div>
  )
}

function ResultBottomNavigation({ onHome, onMyPage, onCameraAddress }) {
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

export default ResultScreen
