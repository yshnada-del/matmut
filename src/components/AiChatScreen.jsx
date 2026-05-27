import { useRef, useState } from 'react'
import { HomeIndicator, StatusBar } from './SplashScreen.jsx'

const aiTags = ['미니멀', '시크', '스트릿']

const places = [
  {
    id: 'pipeground',
    name: '파이프그라운드 한남',
    category: '피자',
    image: '/assets/aichat-place-pipeground.png',
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
    image: '/assets/aichat-place-oasis.png',
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
    image: '/assets/aichat-place-tatsu.png',
    rating: '4.3',
    reviews: '1,637',
    price: '50,000~70,000원대',
    phone: '02-797-0624',
    distance: '한남역 1번 출구에서 789m',
  },
]

const placeReasons = [
  {
    name: '파이프그라운드 한남',
    text: '심플한 데님 룩에 담긴 쿨한 분위기와 잘 어울리는 공간이에요. 캐주얼한 무드는 살리면서도 감각적인 분위기가 있어 오늘 착장과 자연스럽게 매칭돼요.',
  },
  {
    name: '오아시스 한남',
    text: '정돈된 실루엣과 미니멀한 무드가 잘 살아나는 공간이에요. 깔끔한 인테리어와 여유로운 분위기가 오늘 스타일을 더욱 세련되게 만들어줘요.',
  },
  {
    name: '한남타츠',
    text: '시크한 포인트가 들어간 오늘 스타일과 잘 어울리는 공간이에요. 차분한 분위기 안에 감도 있는 무드가 있어 도시적이고 세련된 착장과 잘 매칭돼요.',
  },
]

const conditionChips = ['다른 장소 더 추천해줘', '더 조용한 곳으로', '예산 낮춰줘', '가까운 곳만']

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

function AiChatScreen({ photoUrl, onBack, onHome, onMyPage, onOpenRecommendationList, onCameraAddress, onReserve, onSavePlace, savedPlaceIds = [] }) {
  const previewPhoto = photoUrl || '/assets/outfit.png'
  const [message, setMessage] = useState('')
  const [userMessages, setUserMessages] = useState([])
  const [recommendationVersion, setRecommendationVersion] = useState(0)
  const contentRef = useRef(null)
  const recommendationRef = useRef(null)

  const refreshRecommendations = () => {
    setRecommendationVersion((version) => version + 1)
    requestAnimationFrame(() => {
      const content = contentRef.current
      const recommendation = recommendationRef.current

      if (!content || !recommendation) {
        return
      }

      const contentRect = content.getBoundingClientRect()
      const recommendationRect = recommendation.getBoundingClientRect()
      const top = content.scrollTop + recommendationRect.top - contentRect.top

      content.scrollLeft = 0
      content.scrollTo({ top, left: 0, behavior: 'smooth' })
    })
  }

  const sendMessage = (event) => {
    event.preventDefault()

    const trimmedMessage = message.trim()
    if (!trimmedMessage) {
      return
    }

    setUserMessages((messages) => [...messages, trimmedMessage])
    setMessage('')

    requestAnimationFrame(() => {
      const content = contentRef.current
      if (content) {
        content.scrollTo({ top: content.scrollHeight, left: 0, behavior: 'smooth' })
      }
    })
  }

  return (
    <section className="aichat-screen" aria-label="AI 스타일 분석 채팅">
      <StatusBar />

      <header className="aichat-header">
        <button className="aichat-icon-button aichat-back" type="button" aria-label="뒤로가기" onClick={onBack}>
          <img className="aichat-back-head" src="/assets/address-back-head.svg" alt="" />
          <img className="aichat-back-line" src="/assets/address-back-line.svg" alt="" />
        </button>
        <button className="aichat-icon-button aichat-menu" type="button" aria-label="메뉴">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="aichat-content" ref={contentRef}>
        <section className="aichat-photo-section" aria-label="분석한 착장 사진">
          <div className="aichat-photo-card">
            <div className="aichat-photo-inner">
              <img src={previewPhoto} alt="" />
            </div>
          </div>
        </section>

        <section className="aichat-messages" aria-label="AI 분석 결과">
          <ChatBubble className="is-compact">오늘 스타일을 분석했어요! 👀</ChatBubble>

          <ChatBubble>
            <p>
              오늘은 미니멀 시크 무드와 스트릿의
              <br />
              조합의 착장으로 보여요
            </p>
            <div className="aichat-tags" aria-label="분석 태그">
              {aiTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </ChatBubble>

          <ChatBubble className="is-wide">
            <p>
              전체 실루엣은 정돈되어 있고, 액세서리와 아이템
              <br />
              포인트가 더해지면서 세련되고 도회적인 분위기가
              <br />
              강조돼요.
            </p>
          </ChatBubble>

          <ChatBubble className="is-recommendation">
            <p ref={recommendationRef}>한남동 기준으로 추천해드려요</p>
            <div className="aichat-recommendation-window">
              <DragScrollRow className="aichat-place-row" key={recommendationVersion} aria-label="추천 장소">
                {places.map((place) => (
                  <article className="aichat-place-card" key={place.id}>
                    <img className="aichat-place-image" src={place.image} alt="" />
                    <div className="aichat-place-info">
                      <div className="aichat-place-heading">
                        <div>
                          <h2>{place.name}</h2>
                          <p>{place.category}</p>
                        </div>
                        <button
                          className={savedPlaceIds.includes(place.id) ? 'is-saved' : ''}
                          type="button"
                          aria-label={`${place.name} 저장`}
                          aria-pressed={savedPlaceIds.includes(place.id)}
                          onPointerDown={(event) => event.stopPropagation()}
                          onClick={(event) => {
                            event.stopPropagation()
                            onSavePlace?.(place)
                          }}
                        >
                          <img src={savedPlaceIds.includes(place.id) ? '/assets/bookmark-filled.svg' : '/assets/aichat-bookmark.svg'} alt="" />
                        </button>
                      </div>
                      <div className="aichat-place-meta">
                        <span>
                          <img src="/assets/aichat-star.svg" alt="" />
                          {place.rating} <em>({place.reviews})</em>
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
                      <button
                        className="aichat-reserve-button"
                        type="button"
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={() => onReserve?.(place.id)}
                      >
                        <img src="/assets/aichat-pin.svg" alt="" />
                        <span>예약하기</span>
                      </button>
                    </div>
                  </article>
                ))}
              </DragScrollRow>
            </div>
            <button className="aichat-view-list-button" type="button" onClick={onOpenRecommendationList}>
              전체 추천 리스트 보기
            </button>
          </ChatBubble>

          <ChatBubble className="is-wide">
            <p className="aichat-reason-title">
              <span />
              AI 추천 이유
            </p>
            <ul className="aichat-reason-list">
              {placeReasons.map((reason) => (
                <li key={reason.name}>
                  <strong>{reason.name}</strong>
                  <span>{reason.text}</span>
                </li>
              ))}
            </ul>
          </ChatBubble>

          <ChatBubble className="is-choice">
            <p>다른 조건으로 추천받고 싶으신가요?</p>
            <div className="aichat-condition-chips" aria-label="추천 조건">
              {conditionChips.map((chip) => (
                <button type="button" key={chip} onClick={refreshRecommendations}>
                  {chip}
                </button>
              ))}
            </div>
          </ChatBubble>

          {userMessages.map((userMessage, index) => (
            <ChatBubble className="is-user" key={`${userMessage}-${index}`}>
              {userMessage}
            </ChatBubble>
          ))}
        </section>

        <section className="aichat-input-section" aria-label="추가 조건 입력">
          <form className="aichat-input-box" onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="다른 조건으로 추천받기..."
            />
            <button type="submit" aria-label="전송">
              <img src="/assets/address-arrow-right.svg" alt="" />
            </button>
          </form>
        </section>
      </main>

      <AiChatBottomNavigation onHome={onHome} onMyPage={onMyPage} onCameraAddress={onCameraAddress} />
      <HomeIndicator />
    </section>
  )
}

function ChatBubble({ children, className = '' }) {
  return (
    <article className={`aichat-bubble ${className}`}>
      {typeof children === 'string' ? <p>{children}</p> : children}
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

function AiChatBottomNavigation({ onHome, onMyPage, onCameraAddress }) {
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

export default AiChatScreen
