import { useRef, useState } from 'react'
import { HomeIndicator, StatusBar } from './SplashScreen.jsx'

const moodFilters = ['미니멀', '시크', '캐주얼', '빈티지', '클래식', '스트릿']
const sortOptions = ['추천순', '평점순', '저장 많은 순']

const moodPlaces = [
  {
    id: 'paris',
    name: '빠리가옥',
    category: '프랑스 음식',
    image: '/assets/mood-paris.png',
    rating: '4.5',
    reviews: '7,896',
    price: '20,000~30,000원대',
    phone: '0507-1418-1626',
    distance: '종로3가역 4번 출구에서 150m',
  },
  {
    id: 'seoulcoffee',
    name: '서울커피 익선본점',
    category: '카페 디저트',
    image: '/assets/mood-seoulcoffee.png',
    rating: '4.2',
    reviews: '3,461',
    price: '10,000~20,000원대',
    phone: '0507-1404-4890',
    distance: '종로3가역 4번 출구에서 150m',
  },
  {
    id: 'eulji',
    name: '을지다락',
    category: '양식',
    image: '/assets/mood-eulji.png',
    rating: '4.4',
    reviews: '4,926',
    price: '15,000~25,000원대',
    phone: '0507-1317-4484',
    distance: '을지로3가역 9번 출구에서 256m',
  },
  {
    id: 'upstanding',
    name: '업스탠딩',
    category: '카페',
    image: '/assets/mood-upstanding.png',
    rating: '4.7',
    reviews: '1,092',
    price: '10,000~20,000원대',
    phone: '0502-1917-8727',
    distance: '용산 2가동 신흥시장 내부, 노가리공장과 방방 사이 그리고 르몽블랑 맞은편 스테인레스 외관',
  },
]

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
    active: true,
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

function MoodScreen({ onBack, onHome, onMyPage, onCameraAddress, onOpenReviewPage, onSavePlace, savedPlaceIds = [] }) {
  const [activeMood, setActiveMood] = useState('빈티지')
  const [activeSort, setActiveSort] = useState(sortOptions[0])

  return (
    <section className="mood-screen" aria-label="무드별 장소 탐색">
      <StatusBar />

      <header className="mood-header">
        <button className="mood-icon-button mood-back" type="button" aria-label="뒤로가기" onClick={onBack}>
          <img className="mood-back-head" src="/assets/address-back-head.svg" alt="" />
          <img className="mood-back-line" src="/assets/address-back-line.svg" alt="" />
        </button>
        <button className="mood-icon-button mood-menu" type="button" aria-label="메뉴">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="mood-main">
        <section className="mood-intro">
          <p className="mood-intro-title">오늘 스타일에 맞는 장소를 더 둘러보세요</p>
          <p className="mood-intro-copy">무드에 따라 어울리는 맛집·카페·공간을 모아봤어요</p>
        </section>

        <section className="mood-filter-section" aria-label="무드 필터">
          <HorizontalScrollRow className="mood-filter-row">
            {moodFilters.map((filter) => (
              <button
                className={filter === activeMood ? 'is-active' : ''}
                type="button"
                key={filter}
                onClick={() => setActiveMood(filter)}
              >
                {filter}
              </button>
            ))}
          </HorizontalScrollRow>
        </section>

        <section className="mood-list-section" aria-labelledby="mood-list-title">
          <div className="mood-list-heading">
            <p id="mood-list-title">총 4개</p>
            <div className="mood-sort-row" aria-label="정렬">
              {sortOptions.map((option) => (
                <button
                  className={option === activeSort ? 'is-active' : ''}
                  type="button"
                  key={option}
                  onClick={() => setActiveSort(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mood-card-list">
            {moodPlaces.map((place) => (
              <MoodPlaceCard place={place} key={place.id} onOpenReviewPage={onOpenReviewPage} onSavePlace={onSavePlace} isSaved={savedPlaceIds.includes(place.id)} />
            ))}
          </div>
        </section>
      </main>

      <MoodBottomNavigation onHome={onHome} onMyPage={onMyPage} onCameraAddress={onCameraAddress} />
      <HomeIndicator />
    </section>
  )
}

function HorizontalScrollRow({ children, className }) {
  const rowRef = useRef(null)
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  })

  const handlePointerDown = (event) => {
    const row = rowRef.current
    if (!row || (event.pointerType === 'mouse' && event.button !== 0)) {
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
    >
      {children}
    </div>
  )
}

function MoodPlaceCard({ place, onOpenReviewPage, onSavePlace, isSaved }) {
  return (
    <article
      className="mood-place-card"
      role="button"
      tabIndex={0}
      onClick={onOpenReviewPage}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpenReviewPage?.()
        }
      }}
    >
      <div className="mood-place-image-wrap">
        <img className="mood-place-image" src={place.image} alt="" />
        <span className="mood-place-count">1/10</span>
      </div>
      <div className="mood-place-body">
        <div className="mood-place-heading">
          <div>
            <h2>{place.name}</h2>
            <p>{place.category}</p>
          </div>
          <button
            className={isSaved ? 'is-saved' : ''}
            type="button"
            aria-label={`${place.name} 저장`}
            aria-pressed={isSaved}
            onClick={(event) => {
              event.stopPropagation()
              onSavePlace?.(place)
            }}
          >
            <img src={isSaved ? '/assets/bookmark-filled.svg' : '/assets/aichat-bookmark.svg'} alt="" />
          </button>
        </div>

        <div className="mood-place-meta">
          <span>
            <img src="/assets/aichat-star.svg" alt="" />
            <strong>{place.rating}</strong>
            <em>({place.reviews})</em>
          </span>
          <span>
            <img src="/assets/aichat-price.svg" alt="" />
            {place.price}
          </span>
          <span>
            <img src="/assets/aichat-phone.svg" alt="" />
            {place.phone}
          </span>
          <span>
            <img src="/assets/aichat-clock.svg" alt="" />
            {place.distance}
          </span>
        </div>
      </div>
    </article>
  )
}

function MoodBottomNavigation({ onHome, onMyPage, onCameraAddress }) {
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

      <button className="home-camera-button" type="button" aria-label="촬영" onClick={onCameraAddress}>
        <span>
          <img src="/assets/home-camera.svg" alt="" />
        </span>
      </button>
    </nav>
  )
}

export default MoodScreen
