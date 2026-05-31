import { useRef, useState } from 'react'
import OnboardingSlide from './OnboardingSlide.jsx'
import { HomeIndicator, StatusBar } from './SplashScreen.jsx'

const onboardingSlides = [
  {
    id: 'style',
    titleLines: ['오늘의 스타일에 맞는', '맛집 추천'],
    descriptionLines: ['입은 옷의 무드를 분석해', '어울리는 장소를 추천해드려요'],
    image: `${import.meta.env.BASE_URL}assets/onboarding-style.png`,
    imageClass: 'visual-style',
  },
  {
    id: 'mood',
    titleLines: ['내 분위기에 맞는', '공간을 한눈에'],
    descriptionLines: ['무드와 상황에 따라', '어울리는 장소를 쉽게 찾아보세요'],
    image: `${import.meta.env.BASE_URL}assets/onboarding-mood.png`,
    imageClass: 'visual-mood',
  },
  {
    id: 'place',
    titleLines: ['좋은 장소를 발견했다면', '바로 이어서'],
    descriptionLines: ['마음에 드는 공간은 저장하고', '방문까지 편하게 연결해보세요'],
    image: `${import.meta.env.BASE_URL}assets/onboarding-place.png`,
    imageClass: 'visual-place',
  },
]

function Onboarding({ onStart }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const pointerStart = useRef(null)
  const lastIndex = onboardingSlides.length - 1

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(Math.max(index, 0), lastIndex))
  }

  const handleCtaClick = () => {
    if (currentIndex === lastIndex) {
      console.log('start app')
      onStart?.()
      return
    }

    goToSlide(currentIndex + 1)
  }

  const handlePointerDown = (event) => {
    pointerStart.current = event.clientX
  }

  const handlePointerUp = (event) => {
    if (pointerStart.current === null) return

    const distance = event.clientX - pointerStart.current
    pointerStart.current = null

    if (Math.abs(distance) < 40) return
    goToSlide(distance < 0 ? currentIndex + 1 : currentIndex - 1)
  }

  return (
    <section className="onboarding-screen" aria-label="온보딩">
      <StatusBar />
      <div className="onboarding-main">
        <header className="onboarding-header">
          <button className="skip-button" type="button" onClick={onStart}>
            건너뛰기
          </button>
        </header>

        <div
          className="onboarding-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {onboardingSlides.map((slide) => (
            <OnboardingSlide key={slide.id} slide={slide} />
          ))}
        </div>

        <footer className="onboarding-footer">
          <div className="page-indicator" aria-label={`${currentIndex + 1} / ${onboardingSlides.length}`}>
            {onboardingSlides.map((slide, index) => (
              <button
                key={slide.id}
                className={`indicator-dot ${index === currentIndex ? 'is-active' : ''}`}
                type="button"
                aria-label={`${index + 1}번째 온보딩으로 이동`}
                aria-current={index === currentIndex ? 'step' : undefined}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          <button className="start-button" type="button" onClick={handleCtaClick}>
            시작하기 <span aria-hidden="true">&gt;</span>
          </button>
        </footer>
      </div>
      <HomeIndicator />
    </section>
  )
}

export default Onboarding
