import { HomeIndicator, StatusBar } from './SplashScreen.jsx'

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

function ReservationCompleteScreen({ reservation, onHome, onCameraAddress }) {
  const fallbackDate = new Date()
  const date = reservation?.date ? new Date(reservation.date) : fallbackDate
  const placeName = reservation?.placeName || '파이프그라운드 한남'
  const people = reservation?.people || '2명'
  const time = reservation?.time || '10:30'
  const visitDateText = formatKoreanDate(date)

  return (
    <section className="reservation-complete-screen" aria-label="예약 완료">
      <StatusBar />

      <main className="reservation-complete-main">
        <section className="reservation-complete-hero">
          <div className="reservation-success-mark" aria-hidden="true">
            <span />
          </div>
          <h1>예약이 완료되었어요</h1>
          <p>
            {visitDateText}
            <br />
            {time}에 방문해주세요
          </p>
        </section>

        <section className="reservation-info-card" aria-label="예약 정보">
          <h2>예약 정보</h2>
          <div className="reservation-info-list">
            <ReservationInfoItem icon="/assets/detail-location.svg" label="장소" value={placeName} />
            <ReservationInfoItem icon="/assets/reservation-date.svg" label="날짜" value={visitDateText} />
            <ReservationInfoItem icon="/assets/reservation-time.svg" label="시간" value={time} />
            <ReservationInfoItem icon="/assets/reservation-people.svg" label="인원" value={people} />
          </div>
        </section>

        <section className="reservation-complete-notice" aria-label="예약 안내">
          <p>• 예약 10분 전까지 도착해주세요.</p>
          <p>• 예약 변경이나 취소는 마이페이지에서 가능해요.</p>
          <p>• 문의사항은 해당 장소로 직접 연락해주세요.</p>
        </section>

        <section className="reservation-complete-actions">
          <button className="reservation-history-button" type="button">
            <img className="reservation-action-icon" src="/assets/reservation-history.svg" alt="" />
            예약 내역 보기
          </button>
          <button className="reservation-home-button" type="button" onClick={onHome}>
            <img className="reservation-action-icon" src="/assets/reservation-home.svg" alt="" />
            홈으로 돌아가기
          </button>
        </section>
      </main>

      <ReservationBottomNavigation onCameraAddress={onCameraAddress} />
      <HomeIndicator />
    </section>
  )
}

function ReservationInfoItem({ icon, label, value }) {
  return (
    <div className="reservation-info-item">
      <img src={icon} alt="" />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  )
}

function ReservationBottomNavigation({ onCameraAddress }) {
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

      <button className="home-camera-button" type="button" aria-label="촬영" onClick={onCameraAddress}>
        <span>
          <img src="/assets/home-camera.svg" alt="" />
        </span>
      </button>
    </nav>
  )
}

function formatKoreanDate(date) {
  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${weekdays[date.getDay()]}`
}

export default ReservationCompleteScreen
