import { useEffect, useRef } from 'react'
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
    active: true,
    icon: (
      <>
        <img className="nav-profile-shoulder" src="/assets/home-nav-user-1.svg" alt="" />
        <img className="nav-profile-head" src="/assets/home-nav-user-2.svg" alt="" />
      </>
    ),
  },
]

function MyPageScreen({ savedPlaces = [], savedRecommendations = [], reservations = [], initialSection, onHome, onCameraAddress }) {
  const reservationSectionRef = useRef(null)
  const reservationItems = reservations.map((reservation) => ({
    ...reservation,
    status: isPastReservation(reservation) ? '만료' : '예약 확정',
  }))

  useEffect(() => {
    if (initialSection === 'reservations') {
      requestAnimationFrame(() => {
        reservationSectionRef.current?.scrollIntoView({ block: 'start' })
      })
    }
  }, [initialSection])

  return (
    <section className="mypage-screen" aria-label="마이페이지">
      <StatusBar />

      <header className="mypage-header">
        <button className="mypage-back" type="button" aria-label="뒤로가기" onClick={onHome}>
          <img className="mypage-back-head" src="/assets/mypage-back-head-figma.svg" alt="" />
          <img className="mypage-back-line" src="/assets/mypage-back-line-figma.svg" alt="" />
        </button>
        <button className="mypage-menu" type="button" aria-label="메뉴">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="mypage-main">
        <section className="mypage-profile" aria-label="프로필">
          <div className="mypage-avatar" aria-hidden="true">
            <img src="/assets/mypage-profile-figma.png" alt="" />
          </div>
          <div className="mypage-profile-copy">
            <h1>유민주</h1>
            <p>오늘도 멋진 하루 보내세요</p>
          </div>
          <button className="mypage-settings-button" type="button" aria-label="설정">
            <img src="/assets/mypage-settings.svg" alt="" />
          </button>
        </section>

        <section className="mypage-summary" aria-label="활동 요약">
          <SummaryItem value={savedPlaces.length} label="저장한 장소" />
          <SummaryItem value={savedRecommendations.length} label="지난 추천" />
          <SummaryItem value={reservationItems.length} label="예약 내역" />
          <SummaryItem value="5" label="방문 완료" />
        </section>

        <MypageSection title="저장한 장소">
          {savedPlaces.length > 0 ? (
            <div className="mypage-card-list">
              {savedPlaces.slice(0, 3).map((place) => (
                <SavedPlaceCard place={place} key={place.id} />
              ))}
            </div>
          ) : (
            <EmptyState title="저장한 장소가 아직 없어요" copy="무드별 추천에서 장소를 저장하면 여기에 보여요." />
          )}
        </MypageSection>

        <MypageSection title="지난 추천 기록">
          {savedRecommendations.length > 0 ? (
            <>
              <div className="mypage-card-list">
                {savedRecommendations.slice(0, 3).map((recommendation) => (
                  <RecommendationHistoryCard recommendation={recommendation} key={recommendation.id} />
                ))}
              </div>
              <button className="mypage-replay-button" type="button">
                다시보기
              </button>
            </>
          ) : (
            <EmptyState title="지난 추천 기록이 아직 없어요" copy="리뷰페이지에서 스타일 추천을 저장하면 여기에 쌓여요." />
          )}
        </MypageSection>

        <MypageSection title="예약 내역" sectionRef={reservationSectionRef}>
          {reservationItems.length > 0 ? (
            <div className="mypage-reservation-list">
              {reservationItems.slice(0, 4).map((reservation) => (
                <ReservationCard reservation={reservation} key={reservation.id} />
              ))}
            </div>
          ) : (
            <EmptyState title="예약 내역이 아직 없어요" copy="예약하기를 완료하면 바로 표시돼요." />
          )}
        </MypageSection>

        <MypageSection title="후기 / 방문 기록">
          <div className="mypage-visit-empty">
            <img src="/assets/review-star.svg" alt="" />
            <strong>아직 작성한 후기가 없어요</strong>
            <span>방문한 장소에 후기를 남겨보세요</span>
          </div>
        </MypageSection>

        <section className="mypage-section mypage-setting-section" aria-labelledby="mypage-settings-title">
          <h2 id="mypage-settings-title">설정</h2>
          <SettingButton label="개인 정보" />
          <SettingButton label="알림 설정" />
          <SettingButton label="결제 설정" />
          <SettingButton label="문의하기" />
          <button className="mypage-logout" type="button">
            로그아웃
          </button>
        </section>
      </main>

      <MyPageBottomNavigation onHome={onHome} onCameraAddress={onCameraAddress} />
      <HomeIndicator />
    </section>
  )
}

function SummaryItem({ value, label }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function MypageSection({ title, children, sectionRef }) {
  return (
    <section className="mypage-section" aria-labelledby={`mypage-${title}`} ref={sectionRef}>
      <div className="mypage-section-heading">
        <h2 id={`mypage-${title}`}>{title}</h2>
        <button type="button">전체 보기 ›</button>
      </div>
      {children}
    </section>
  )
}

function SavedPlaceCard({ place }) {
  const locationLabel = getPlaceLocationLabel(place)

  return (
    <article className="mypage-place-card">
      <img className="mypage-place-image" src={place.image} alt="" />
      <div className="mypage-place-copy">
        <h3>{place.name}</h3>
        <p>{place.category || place.type || '장소'}</p>
        <div className="mypage-place-meta">
          <span className="mypage-place-rating">
            <img src="/assets/aichat-star.svg" alt="" />
            {place.rating || '4.8'}
          </span>
          <span>{place.price || '35,000원대'}</span>
          <span className="mypage-place-location">
            <img src="/assets/review-location.svg" alt="" />
            {locationLabel}
          </span>
        </div>
        <small>{place.copy || '데이트 분위기를 살리기 좋은 공간이에요.'}</small>
      </div>
    </article>
  )
}

function getPlaceLocationLabel(place) {
  if (place.area) {
    return place.area
  }

  if (!place.distance) {
    return '성수동'
  }

  const stationName = place.distance.match(/(.+?)역/)?.[1]

  if (stationName) {
    return stationName
  }

  return place.distance.split(' ')[0] || '성수동'
}

function RecommendationHistoryCard({ recommendation }) {
  const copyLines = splitSentenceAfterPlace(recommendation.copy || '분위기에 맞는 장소 추천을 저장했어요.')

  return (
    <article className="mypage-history-card">
      <img className="mypage-history-image" src={recommendation.image} alt="" />
      <div>
        <h3>{recommendation.title || '스타일 추천'}</h3>
        <small>
          {copyLines[0]}
          {copyLines[1] ? (
            <>
              <br />
              {copyLines[1]}
            </>
          ) : null}
        </small>
      </div>
    </article>
  )
}

function splitSentenceAfterPlace(copy) {
  const [firstLine, ...restLines] = copy.split('곳. ')

  if (restLines.length === 0) {
    return [copy]
  }

  return [`${firstLine}곳.`, restLines.join('곳. ')]
}

function ReservationCard({ reservation }) {
  const expired = reservation.status === '만료'
  const statusLabel = expired ? '예약 만료' : '예약 확정'

  return (
    <article className="mypage-reservation-card">
      <div className="mypage-reservation-top">
        <div>
          <h3>{reservation.placeName || '예약 장소'}</h3>
          <span>
            <img src="/assets/reservation-calendar-open.svg" alt="" />
            {formatReservationDate(reservation.date)}
          </span>
          <span>
            <img src="/assets/reservation-time.svg" alt="" />
            {reservation.time || '시간 미정'} · {reservation.people || '2명'}
          </span>
        </div>
        <strong className={expired ? 'is-expired' : ''}>{statusLabel}</strong>
      </div>
      <div className="mypage-reservation-actions">
        <button type="button">변경</button>
        <button type="button">취소</button>
      </div>
    </article>
  )
}

function EmptyState({ title, copy }) {
  return (
    <article className="mypage-empty-card">
      <strong>{title}</strong>
      <span>{copy}</span>
    </article>
  )
}

function SettingButton({ label }) {
  return (
    <button className="mypage-setting-button" type="button">
      <span>{label}</span>
      <span aria-hidden="true">›</span>
    </button>
  )
}

function MyPageBottomNavigation({ onHome, onCameraAddress }) {
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

function isPastReservation(reservation) {
  if (!reservation?.date) {
    return false
  }

  const targetDate = new Date(reservation.date)

  if (Number.isNaN(targetDate.getTime())) {
    return false
  }

  const [hours = '0', minutes = '0'] = String(reservation.time || '00:00').split(':')
  targetDate.setHours(Number(hours), Number(minutes), 0, 0)

  return targetDate.getTime() < Date.now()
}

function formatReservationDate(date) {
  if (!date) {
    return '날짜 미정'
  }

  const targetDate = new Date(date)

  if (Number.isNaN(targetDate.getTime())) {
    return '날짜 미정'
  }

  return `${targetDate.getFullYear()}.${String(targetDate.getMonth() + 1).padStart(2, '0')}.${String(targetDate.getDate()).padStart(2, '0')}`
}

export default MyPageScreen
