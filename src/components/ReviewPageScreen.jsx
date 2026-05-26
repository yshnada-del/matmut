import { useRef, useState } from 'react'
import { HomeIndicator, StatusBar } from './SplashScreen.jsx'

const moodFilters = ['미니멀', '시크', '캐주얼', '빈티지', '클래식', '스트릿']
const sortOptions = ['추천순', '최신순', '좋아요순']

const reviews = [
  {
    id: 'kitchen485',
    placeName: '키친485',
    styles: ['캐주얼', '모던'],
    rating: '4.7',
    area: '망원',
    likes: '142',
    styleImage: '/assets/reviewpage-card-01-style.png',
    placeImage: '/assets/reviewpage-card-01-place.png',
    styleCropTop: '-13.5%',
    copy: '편안한 스타일로 가기 좋은 곳. 분위기도 좋고 사진도 잘 나와요',
  },
  {
    id: 'monks-butcher',
    placeName: '몽크스부처 청담',
    styles: ['캐주얼', '스트릿'],
    rating: '4.7',
    area: '청담',
    likes: '142',
    styleImage: '/assets/reviewpage-card-02-style.png',
    placeImage: '/assets/reviewpage-card-02-place.png',
    styleCropTop: '-35.11%',
    copy: '시크한 스트릿 룩에 잘 어울리는 곳. 분위기가 세련되고 사진도 잘 나와요.',
  },
  {
    id: 'british-shop',
    placeName: '브리티시샵 성수',
    styles: ['캐주얼', '빈티지'],
    rating: '4.7',
    area: '성수',
    likes: '142',
    styleImage: '/assets/reviewpage-card-03-style.png',
    placeImage: '/assets/reviewpage-card-03-place.png',
    styleCropTop: '-23.85%',
    copy: '빈티지한 데님룩과 가기 좋은 곳. 가격도 감각적이고 후식도 깔끔해요.',
  },
  {
    id: 'yeonnam-doma',
    placeName: '연남도마',
    styles: ['캐주얼', '모던'],
    rating: '4.7',
    area: '연남',
    likes: '142',
    styleImage: '/assets/reviewpage-card-04-style.png',
    placeImage: '/assets/reviewpage-card-04-place.png',
    styleCropTop: '-24.35%',
    copy: '무난한 니트룩에 잘 맞는 곳. 부담 없이 가기 좋고 메뉴도 무난해요.',
  },
  {
    id: 'sogum-deli',
    placeName: '소금집델리 망원',
    styles: ['캐주얼', '빈티지'],
    rating: '4.7',
    area: '망원',
    likes: '142',
    styleImage: '/assets/reviewpage-card-05-style.png',
    placeImage: '/assets/reviewpage-card-05-place.png',
    styleCropTop: '-13.5%',
    copy: '빈티지한 스타일로 가면 더 좋은 곳. 가볍게 먹기 좋고 분위기도 좋아요.',
  },
  {
    id: 'mi-piace',
    placeName: '미 피아체',
    styles: ['캐주얼', '모던'],
    rating: '4.7',
    area: '청담',
    likes: '142',
    styleImage: '/assets/reviewpage-card-06-style.png',
    placeImage: '/assets/reviewpage-card-06-place.png',
    styleCropTop: '-13.5%',
    copy: '단정한 셔츠룩에 잘 어울리는 곳. 차분한 분위기라 데이트하기 좋아요.',
  },
]

const navItems = [
  {
    id: 'home',
    label: '홈',
    active: true,
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

function ReviewPageScreen({ onBack, onHome, onCameraAddress }) {
  const [activeMood, setActiveMood] = useState('캐주얼')
  const [activeSort, setActiveSort] = useState(sortOptions[0])

  return (
    <section className="review-page-screen" aria-label="비슷한 스타일 리뷰">
      <StatusBar />

      <header className="review-page-header">
        <button className="review-page-icon-button review-page-back" type="button" aria-label="뒤로가기" onClick={onBack}>
          <img className="review-page-back-head" src="/assets/address-back-head.svg" alt="" />
          <img className="review-page-back-line" src="/assets/address-back-line.svg" alt="" />
        </button>
        <button className="review-page-icon-button review-page-menu" type="button" aria-label="메뉴">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="review-page-main">
        <section className="review-page-intro">
          <p className="review-page-intro-title">비슷한 스타일의 사람들 후기를 모아봤어요</p>
          <p className="review-page-intro-copy">장소 분위기와 착장 무드가 잘 맞는 리뷰를 살펴보세요</p>
        </section>

        <section className="review-page-filter-section" aria-label="무드 필터">
          <HorizontalScrollRow className="review-page-filter-row">
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

        <section className="review-page-list-section" aria-labelledby="review-page-list-title">
          <p className="review-page-list-title" id="review-page-list-title">6개의 리뷰</p>
          <div className="review-page-sort-row" aria-label="정렬">
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

          <div className="review-page-card-list">
            {reviews.map((review) => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </div>
        </section>
      </main>

      <ReviewBottomNavigation onHome={onHome} onCameraAddress={onCameraAddress} />
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

function ReviewCard({ review }) {
  return (
    <article className="review-page-card">
      <div className="review-page-image-grid">
        <div className="review-page-image-wrap">
          <img className="review-page-image is-style" src={review.styleImage} alt="" style={{ '--style-crop-top': review.styleCropTop }} />
          <span className="review-page-image-tag is-style-tag">스타일</span>
        </div>
        <div className="review-page-image-wrap">
          <img className="review-page-image" src={review.placeImage} alt="" />
          <span className="review-page-image-tag is-place-tag">장소</span>
        </div>
      </div>

      <div className="review-page-card-body">
        <div className="review-page-tag-row">
          {review.styles.map((style) => (
            <span key={style}>{style}</span>
          ))}
        </div>

        <h2>{review.placeName}</h2>
        <p>"{review.copy}"</p>

        <div className="review-page-card-meta">
          <div>
            <span>
              <img src="/assets/review-star.svg" alt="" />
              {review.rating}
            </span>
            <span>
              <img src="/assets/review-location.svg" alt="" />
              {review.area}
            </span>
          </div>
          <span>
            <img src="/assets/review-like.svg" alt="" />
            {review.likes}
          </span>
        </div>
      </div>
    </article>
  )
}

function ReviewBottomNavigation({ onHome, onCameraAddress }) {
  return (
    <nav className="home-bottom-nav" aria-label="하단 메뉴">
      <div className="home-nav-items">
        {navItems.map((item) => (
          <button
            className={`home-nav-item ${item.active ? 'is-active' : ''}`}
            key={item.id}
            type="button"
            aria-current={item.active ? 'page' : undefined}
            onClick={item.id === 'home' ? onHome : undefined}
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

export default ReviewPageScreen
