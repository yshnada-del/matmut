import { useEffect, useMemo, useState } from 'react'
import { HomeIndicator, StatusBar } from './SplashScreen.jsx'

const peopleOptions = ['1명', '2명', '3명', '4명', '5명', '6명', '7명', '8명', '9명']
const weekdays = ['일', '월', '화', '수', '목', '금', '토']
const monthOptions = Array.from({ length: 12 }, (_, index) => index)

const timeOptions = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
  '24:00',
  '24:30',
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

function ReservationScreen({ placeName = '파이프그라운드 한남', bookedTimesByDate = {}, onBack, onHome, onMyPage, onCameraAddress, onConfirm }) {
  const today = useMemo(() => new Date(), [])
  const currentMonth = useMemo(() => new Date(today.getFullYear(), today.getMonth(), 1), [today])
  const [people, setPeople] = useState('2명')
  const [time, setTime] = useState('')
  const [visibleMonth, setVisibleMonth] = useState(currentMonth)
  const [selectedDate, setSelectedDate] = useState(today)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false)

  const visibleYear = visibleMonth.getFullYear()
  const visibleMonthIndex = visibleMonth.getMonth()
  const bookedTimes = getBookedTimes(selectedDate, bookedTimesByDate)
  const availableTimeOptions = timeOptions.filter((option) => !bookedTimes.includes(option))

  useEffect(() => {
    if (bookedTimes.includes(time)) {
      setTime('')
    }
  }, [bookedTimes, time])

  const selectDate = (date) => {
    setSelectedDate(date)
    setVisibleMonth(new Date(date.getFullYear(), date.getMonth(), 1))
  }

  const selectMonth = (monthIndex) => {
    const nextMonth = new Date(visibleYear, monthIndex, 1)
    setVisibleMonth(nextMonth)
    setSelectedDate((currentDate) => {
      const lastDayOfMonth = new Date(visibleYear, monthIndex + 1, 0).getDate()
      return new Date(visibleYear, monthIndex, Math.min(currentDate.getDate(), lastDayOfMonth))
    })
    setIsMonthPickerOpen(false)
  }

  return (
    <section className="reservation-screen" aria-label="예약하기">
      <StatusBar />

      <header className="reservation-header">
        <button className="reservation-icon-button reservation-back" type="button" aria-label="뒤로가기" onClick={onBack}>
          <img className="reservation-back-head" src="/assets/address-back-head.svg" alt="" />
          <img className="reservation-back-line" src="/assets/address-back-line.svg" alt="" />
        </button>
        <button className="reservation-icon-button reservation-menu" type="button" aria-label="메뉴">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="reservation-main">
        <section className="reservation-section is-people" aria-labelledby="reservation-people-title">
          <ReservationLabel id="reservation-people-title" icon="/assets/reservation-people.svg">
            인원수
          </ReservationLabel>
          <div className="reservation-people-grid">
            {peopleOptions.map((option) => (
              <button
                className={option === people ? 'is-selected' : ''}
                type="button"
                key={option}
                onClick={() => setPeople(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <section className="reservation-section is-date" aria-labelledby="reservation-date-title">
          <ReservationLabel id="reservation-date-title" icon="/assets/reservation-date.svg">
            날짜
          </ReservationLabel>
          <div className={`reservation-calendar ${isCalendarOpen ? 'is-open' : ''}`}>
            <button
              className="reservation-date-button"
              type="button"
              aria-expanded={isCalendarOpen}
              onClick={() => {
                setIsCalendarOpen((open) => !open)
                setIsMonthPickerOpen(false)
              }}
            >
              <span>
                {visibleYear}년 {visibleMonthIndex + 1}월
              </span>
              <span className="reservation-date-chevron" aria-hidden="true" />
            </button>
            {isCalendarOpen ? (
              <CalendarPanel
                selectedDate={selectedDate}
                visibleMonth={visibleMonth}
                isMonthPickerOpen={isMonthPickerOpen}
                onSelectDate={selectDate}
                onSelectMonth={selectMonth}
                onToggleMonthPicker={() => setIsMonthPickerOpen((open) => !open)}
                onYearChange={(amount) => setVisibleMonth(new Date(visibleYear + amount, visibleMonthIndex, 1))}
              />
            ) : null}
          </div>
        </section>

        <section className="reservation-section is-time" aria-labelledby="reservation-time-title">
          <ReservationLabel id="reservation-time-title" icon="/assets/reservation-time.svg">
            시간
          </ReservationLabel>
          <div className="reservation-time-grid">
            {availableTimeOptions.map((option) => (
              <button
                className={option === time ? 'is-selected' : ''}
                type="button"
                key={option}
                onClick={() => setTime(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <section className="reservation-notice" aria-label="예약 안내">
          <p>• 예약 확정 후 변경이나 취소는 마이페이지에서 가능해요</p>
          <p>• 예약 시간 10분 전까지 도착해주세요</p>
          <p>• 노쇼 시 향후 예약이 제한될 수 있어요</p>
        </section>

        <section className="reservation-confirm-section">
          <button
            className="reservation-confirm-button"
            type="button"
            disabled={!people || !selectedDate || !time}
            onClick={() =>
              onConfirm?.({
                placeName,
                people,
                date: selectedDate,
                time,
              })
            }
          >
            예약 확정하기
          </button>
        </section>
      </main>

      <ReservationBottomNavigation onHome={onHome} onMyPage={onMyPage} onCameraAddress={onCameraAddress} />
      <HomeIndicator />
    </section>
  )
}

function CalendarPanel({
  selectedDate,
  visibleMonth,
  isMonthPickerOpen,
  onSelectDate,
  onSelectMonth,
  onToggleMonthPicker,
  onYearChange,
}) {
  const visibleYear = visibleMonth.getFullYear()
  const visibleMonthIndex = visibleMonth.getMonth()
  const calendarDays = useMemo(() => getCalendarDays(visibleYear, visibleMonthIndex), [visibleYear, visibleMonthIndex])
  const selectedKey = getDateKey(selectedDate)

  return (
    <div className={`reservation-calendar-panel ${isMonthPickerOpen ? 'has-month-picker' : ''}`}>
      <button className="reservation-calendar-title" type="button" onClick={onToggleMonthPicker}>
        &lt;{visibleYear}.{String(visibleMonthIndex + 1).padStart(2, '0')}&gt;
      </button>

      {isMonthPickerOpen ? (
        <div className="reservation-month-picker">
          <div className="reservation-month-picker-header">
            <button type="button" aria-label="이전 연도" onClick={() => onYearChange(-1)}>
              &lt;
            </button>
            <strong>{visibleYear}</strong>
            <button type="button" aria-label="다음 연도" onClick={() => onYearChange(1)}>
              &gt;
            </button>
          </div>
          <div className="reservation-month-grid">
            {monthOptions.map((monthIndex) => (
              <button
                className={monthIndex === visibleMonthIndex ? 'is-selected' : ''}
                type="button"
                key={monthIndex}
                onClick={() => onSelectMonth(monthIndex)}
              >
                {monthIndex + 1}월
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="reservation-calendar-weekdays" aria-hidden="true">
            {weekdays.map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>
          <div className="reservation-calendar-days">
            {calendarDays.map((date) => {
              const dateKey = getDateKey(date.value)

              return (
                <button
                  className={[
                    !date.isCurrentMonth ? 'is-muted' : '',
                    dateKey === selectedKey ? 'is-selected' : '',
                    date.value.getDay() === 0 ? 'is-holiday' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={dateKey}
                  onClick={() => onSelectDate(date.value)}
                >
                  {date.value.getDate()}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

function getCalendarDays(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1)
  const startDate = new Date(year, monthIndex, 1 - firstDay.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const value = new Date(startDate)
    value.setDate(startDate.getDate() + index)

    return {
      value,
      isCurrentMonth: value.getMonth() === monthIndex,
    }
  })
}

function getDateKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function getBookedTimes(date, bookedTimesByDate) {
  return bookedTimesByDate[getDateKey(date)] || []
}

function ReservationLabel({ children, icon, id }) {
  return (
    <div className="reservation-label">
      <img src={icon} alt="" />
      <h2 id={id}>{children}</h2>
    </div>
  )
}

function ReservationBottomNavigation({ onHome, onMyPage, onCameraAddress }) {
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

export default ReservationScreen
