import { useRef, useState } from 'react'
import { HomeIndicator, StatusBar } from './SplashScreen.jsx'

const features = [
  {
    id: 'photo',
    label: '사진 한 장으로 가능',
    icon: '/assets/home-feature-photo.png',
    imageClassName: 'home-feature-photo',
  },
  {
    id: 'face',
    label: '얼굴 없이 가능',
    icon: '/assets/home-feature-face.png',
    imageClassName: 'home-feature-face',
  },
  {
    id: 'fast',
    label: '빠르게 추천 가능',
    icon: '/assets/home-feature-fast.png',
    imageClassName: 'home-feature-fast',
  },
]

const previewTabs = [
  {
    id: 'mood',
    label: '무드별 추천',
    cards: [
      {
        id: 'casual',
        image: '/assets/home-card-casual.png',
        tags: ['캐주얼', '미니멀'],
      },
      {
        id: 'street',
        image: '/assets/home-card-street.png',
        tags: ['스트릿', '빈티지'],
      },
    ],
  },
  {
    id: 'similar',
    label: '비슷한 유형 추천',
    cards: [
      {
        id: 'classic',
        image: '/assets/home-similar-classic.png',
        tags: ['클래식', '캐주얼'],
        imageClassName: 'is-classic',
      },
      {
        id: 'amekaji',
        image: '/assets/home-similar-amekaji.png',
        tags: ['아메카지', '스트릿'],
      },
    ],
  },
]

const recommendationCards = [
  {
    id: 'date',
    image: '/assets/home-card-date.png',
    tag: '데이트',
  },
  {
    id: 'meeting',
    image: '/assets/home-card-meeting.png',
    tag: '모임',
  },
  {
    id: 'solo',
    image: '/assets/home-card-solo.png',
    tag: '혼밥',
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

function HomeScreen({ onAddress }) {
  const [activePreviewTab, setActivePreviewTab] = useState(previewTabs[0].id)
  const activePreviewIndex = previewTabs.findIndex((tab) => tab.id === activePreviewTab)

  return (
    <section className="home-screen" aria-label="홈">
      <StatusBar />

      <header className="home-header">
        <img className="home-logo" src="/assets/home-logo.svg" alt="matmut" />
        <button className="home-menu" type="button" aria-label="메뉴">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="home-content">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-copy">
            <h1 id="home-title">
              오늘 착장에 어울리는
              <br />
              장소를 찾아보세요
            </h1>
            <p>
              착장 사진 한 장으로 분석되는 무드,
              <br />
              그에 맞는 맛집·카페·공간을 바로 추천
            </p>
          </div>

          <button className="home-cta" type="button" onClick={onAddress}>
            착장촬영 하고 추천받기
          </button>

          <div className="home-features" aria-label="추천 특징">
            {features.map((feature) => (
              <div className="home-feature" key={feature.id}>
                <span className="home-feature-icon">
                  <img className={feature.imageClassName} src={feature.icon} alt="" />
                </span>
                <p>{feature.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-preview" aria-labelledby="preview-title">
          <div className="home-section-title">
            <h2 id="preview-title">촬영전에 미리 둘러봐요</h2>
            <button type="button">View all</button>
          </div>

          <div
            className={`home-tabs ${activePreviewTab === 'similar' ? 'is-similar' : ''}`}
            role="tablist"
            aria-label="추천 유형"
          >
            <span className="home-tab-thumb" aria-hidden="true" />
            {previewTabs.map((tab) => (
              <button
                className={activePreviewTab === tab.id ? 'is-active' : ''}
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activePreviewTab === tab.id}
                onClick={() => setActivePreviewTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="home-preview-window" aria-label="추천 미리보기">
            <div
              className="home-preview-track"
              style={{ transform: `translateX(-${activePreviewIndex * 100}%)` }}
            >
              {previewTabs.map((tab) => (
                <DragScrollRow className="home-card-row" key={tab.id}>
                  {tab.cards.map((card) => (
                    <article className="home-card" key={card.id}>
                      <img className={card.imageClassName} src={card.image} alt="" />
                      <div className="home-card-tags">
                        {card.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </article>
                  ))}
                </DragScrollRow>
              ))}
            </div>
          </div>
        </section>

        <section className="home-recommendations" aria-labelledby="recommendation-title">
          <div className="home-section-title">
            <h2 id="recommendation-title">다양한 추천을 받아봐요</h2>
            <button type="button">View all</button>
          </div>

          <DragScrollRow className="home-recommendation-row" aria-label="다양한 추천 미리보기">
            {recommendationCards.map((card) => (
              <article className="home-recommendation-card" key={card.id}>
                <img src={card.image} alt="" />
                <span>{card.tag}</span>
              </article>
            ))}
          </DragScrollRow>
        </section>
      </main>

      <BottomNavigation onCameraAddress={onAddress} />
      <HomeIndicator />
    </section>
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

function BottomNavigation({ onCameraAddress }) {
  return (
    <nav className="home-bottom-nav" aria-label="하단 메뉴">
      <div className="home-nav-items">
        {navItems.map((item) => (
          <button
            className={`home-nav-item ${item.active ? 'is-active' : ''}`}
            key={item.id}
            type="button"
            aria-current={item.active ? 'page' : undefined}
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

export default HomeScreen
