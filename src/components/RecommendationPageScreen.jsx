import { useRef, useState } from 'react'
import { HomeIndicator, StatusBar } from './SplashScreen.jsx'

const categoryFilters = ['데이트', '모임', '혼밥', '가족외식', '기념일']
const sortOptions = ['추천순', '평점순', '저장 많은 순']

const places = [
  {
    id: 'pinpin',
    category: '데이트',
    name: '핌피 성수',
    type: '레스토랑',
    image: '/assets/home-card-date.png',
    rating: '4.8',
    price: '35,000원대',
    area: '성수동',
    copy: '데이트 분위기를 살리기 좋은 공간이에요.',
  },
  {
    id: 'ritartando',
    category: '데이트',
    name: '리타르단도 성수',
    type: '레스토랑',
    image: '/assets/home-card-meeting.png',
    rating: '4.8',
    price: '35,000원대',
    area: '성수동',
    copy: '데이트 분위기를 살리기 좋은 공간이에요.',
  },
  {
    id: 'pastoral',
    category: '데이트',
    name: '파울로데마리아 연희',
    type: '레스토랑',
    image: '/assets/home-card-casual.png',
    rating: '4.8',
    price: '35,000원대',
    area: '연희동',
    copy: '데이트 분위기를 살리기 좋은 공간이에요.',
  },
  {
    id: '20classic',
    category: '데이트',
    name: '20 어클락 모먼트',
    type: '레스토랑',
    image: '/assets/home-card-solo.png',
    rating: '4.8',
    price: '35,000원대',
    area: '을지로',
    copy: '데이트 분위기를 살리기 좋은 공간이에요.',
  },
  {
    id: 'upstanding',
    category: '모임',
    name: '업스탠딩',
    type: '카페',
    image: '/assets/mood-upstanding.png',
    rating: '4.7',
    price: '20,000원대',
    area: '합정',
    copy: '대화하기 좋은 분위기의 공간이에요.',
  },
  {
    id: 'seoulcoffee',
    category: '모임',
    name: '서울커피 익선본점',
    type: '카페',
    image: '/assets/mood-seoulcoffee.png',
    rating: '4.2',
    price: '10,000원대',
    area: '익선',
    copy: '대화하기 좋은 분위기의 공간이에요.',
  },
  {
    id: 'oasis',
    category: '가족외식',
    name: '오아시스 한남',
    type: '브런치',
    image: '/assets/aichat-place-oasis.png',
    rating: '4.0',
    price: '30,000원대',
    area: '한남',
    copy: '편하게 머물기 좋은 공간이에요.',
  },
  {
    id: 'pipeground',
    category: '혼밥',
    name: '파이프그라운드 한남',
    type: '레스토랑',
    image: '/assets/aichat-place-pipeground.png',
    rating: '4.7',
    price: '30,000원대',
    area: '한남',
    copy: '혼자 방문해도 부담 없는 공간이에요.',
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

function RecommendationPageScreen({ onBack, onHome, onMyPage, onCameraAddress, onReserve, onSavePlace, savedPlaceIds = [] }) {
  const [activeCategory, setActiveCategory] = useState(categoryFilters[0])
  const [activeSort, setActiveSort] = useState(sortOptions[0])
  const visiblePlaces = places.filter((place) => place.category === activeCategory)

  return (
    <section className="recommendation-page-screen" aria-label="다양한 추천">
      <StatusBar />

      <header className="recommendation-page-header">
        <button className="recommendation-page-icon-button recommendation-page-back" type="button" aria-label="뒤로가기" onClick={onBack}>
          <img className="recommendation-page-back-head" src="/assets/address-back-head.svg" alt="" />
          <img className="recommendation-page-back-line" src="/assets/address-back-line.svg" alt="" />
        </button>
        <button className="recommendation-page-icon-button recommendation-page-menu" type="button" aria-label="메뉴">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="recommendation-page-main">
        <section className="recommendation-page-intro">
          <p className="recommendation-page-intro-title">대화하기 좋고 분위기가 살아있는 장소를 모아봤어요</p>
          <p className="recommendation-page-intro-copy">사진도 남기고 오래 머물기 좋은 공간 중심으로 추천해요</p>
        </section>

        <section className="recommendation-page-filter-section" aria-label="추천 카테고리">
          <HorizontalScrollRow className="recommendation-page-filter-row">
            {categoryFilters.map((category) => (
              <button
                className={category === activeCategory ? 'is-active' : ''}
                type="button"
                key={category}
                onClick={(event) => {
                  if (event.currentTarget.closest('.recommendation-page-filter-row')?.dataset.dragged === 'true') {
                    return
                  }

                  setActiveCategory(category)
                }}
              >
                {category}
              </button>
            ))}
          </HorizontalScrollRow>
        </section>

        <section className="recommendation-page-list-section" aria-labelledby="recommendation-page-list-title">
          <div className="recommendation-page-list-heading">
            <p id="recommendation-page-list-title">총 {visiblePlaces.length}개</p>
            <div className="recommendation-page-sort-row" aria-label="정렬">
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

          <div className="recommendation-page-card-list">
            {visiblePlaces.map((place) => (
              <RecommendationPlaceCard place={place} key={place.id} onReserve={onReserve} onSavePlace={onSavePlace} isSaved={savedPlaceIds.includes(place.id)} />
            ))}
          </div>
        </section>
      </main>

      <RecommendationBottomNavigation onHome={onHome} onMyPage={onMyPage} onCameraAddress={onCameraAddress} />
      <HomeIndicator />
    </section>
  )
}

function HorizontalScrollRow({ children, className }) {
  const rowRef = useRef(null)
  const dragState = useRef({
    isDragging: false,
    hasDragged: false,
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
      hasDragged: false,
      startX: event.clientX,
      scrollLeft: row.scrollLeft,
    }
    delete row.dataset.dragged
    row.classList.add('is-dragging')
  }

  const handlePointerMove = (event) => {
    const row = rowRef.current
    const state = dragState.current

    if (!row || !state.isDragging) {
      return
    }

    const deltaX = event.clientX - state.startX

    if (Math.abs(deltaX) > 6) {
      state.hasDragged = true
      row.dataset.dragged = 'true'
    }

    if (state.hasDragged) {
      event.preventDefault()
      row.scrollLeft = state.scrollLeft - deltaX
    }
  }

  const stopDragging = () => {
    const row = rowRef.current
    const state = dragState.current

    if (!row) {
      return
    }

    state.isDragging = false
    row.classList.remove('is-dragging')

    if (state.hasDragged) {
      window.setTimeout(() => {
        delete row.dataset.dragged
      }, 120)
    } else {
      delete row.dataset.dragged
    }
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

function RecommendationPlaceCard({ place, onReserve, onSavePlace, isSaved }) {
  return (
    <article className="recommendation-place-card">
      <div className="recommendation-place-row">
        <img className="recommendation-place-image" src={place.image} alt="" />
        <div className="recommendation-place-info">
          <div className="recommendation-place-title-row">
            <div>
              <h2>{place.name}</h2>
              <p>{place.type}</p>
            </div>
            <button
              className={isSaved ? 'is-saved' : ''}
              type="button"
              aria-label={`${place.name} 저장`}
              aria-pressed={isSaved}
              onClick={() => {
                onSavePlace?.(place)
              }}
            >
              <img src={isSaved ? '/assets/bookmark-filled.svg' : '/assets/detail-save-bookmark.svg'} alt="" />
            </button>
          </div>

          <div className="recommendation-place-meta">
            <span>
              <img src="/assets/aichat-star.svg" alt="" />
              {place.rating}
            </span>
            <span>{place.price}</span>
            <span>
              <img src="/assets/detail-location.svg" alt="" />
              {place.area}
            </span>
          </div>
          <p>{place.copy}</p>
        </div>
      </div>

      <button className="recommendation-reserve-button" type="button" onClick={() => onReserve?.(place.id)}>
        <img src="/assets/result-calendar.svg" alt="" />
        예약하기
      </button>
    </article>
  )
}

function RecommendationBottomNavigation({ onHome, onMyPage, onCameraAddress }) {
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

export default RecommendationPageScreen
