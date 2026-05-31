import { useEffect, useState } from 'react'
import SplashScreen from './components/SplashScreen.jsx'
import Onboarding from './components/Onboarding.jsx'
import AuthScreen from './components/AuthScreen.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import AddressScreen from './components/AddressScreen.jsx'
import ReadyPhotoScreen from './components/ReadyPhotoScreen.jsx'
import PhotoScreen from './components/PhotoScreen.jsx'
import AnalyzeScreen from './components/AnalyzeScreen.jsx'
import AiChatScreen from './components/AiChatScreen.jsx'
import ResultScreen from './components/ResultScreen.jsx'
import DetailScreen from './components/DetailScreen.jsx'
import ReservationScreen from './components/ReservationScreen.jsx'
import ReservationCompleteScreen from './components/ReservationCompleteScreen.jsx'
import MoodScreen from './components/MoodScreen.jsx'
import ReviewPageScreen from './components/ReviewPageScreen.jsx'
import RecommendationPageScreen from './components/RecommendationPageScreen.jsx'
import MyPageScreen from './components/MyPageScreen.jsx'

const placeNames = {
  pipeground: '파이프그라운드 한남',
  oasis: '오아시스 한남',
  tatsu: '한남타츠',
}

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [screen, setScreen] = useState('onboarding')
  const [photoMode, setPhotoMode] = useState('fallback')
  const [galleryPhotoUrl, setGalleryPhotoUrl] = useState('')
  const [analysisPhotoUrl, setAnalysisPhotoUrl] = useState('')
  const [detailPlaceId, setDetailPlaceId] = useState('pipeground')
  const [reservationReturnScreen, setReservationReturnScreen] = useState('result')
  const [reservationPlaceId, setReservationPlaceId] = useState('pipeground')
  const [reservationDetails, setReservationDetails] = useState(null)
  const [reservationHistory, setReservationHistory] = useState([])
  const [savedPlaces, setSavedPlaces] = useState([])
  const [savedRecommendations, setSavedRecommendations] = useState([])
  const [myPageInitialSection, setMyPageInitialSection] = useState(null)
  const [bookedTimesByPlace, setBookedTimesByPlace] = useState({})

  useEffect(() => {
    const splashTimer = window.setTimeout(() => {
      setShowSplash(false)
    }, 2000)

    return () => window.clearTimeout(splashTimer)
  }, [])

  useEffect(() => {
    return () => {
      if (galleryPhotoUrl) {
        URL.revokeObjectURL(galleryPhotoUrl)
      }
    }
  }, [galleryPhotoUrl])

  const openCamera = () => {
    setPhotoMode('camera')
    setScreen('photo')
  }

  const openGalleryPhoto = (file) => {
    if (!file) return

    const nextPhotoUrl = URL.createObjectURL(file)

    setGalleryPhotoUrl((currentPhotoUrl) => {
      if (currentPhotoUrl) {
        URL.revokeObjectURL(currentPhotoUrl)
      }

      return nextPhotoUrl
    })
    setPhotoMode('gallery')
    setScreen('photo')
  }

  const completePhoto = (photoPayload) => {
    console.log('photo complete', photoPayload)
    setAnalysisPhotoUrl(photoPayload?.src || galleryPhotoUrl || `${import.meta.env.BASE_URL}assets/outfit.png`)
    setScreen('analyze')
  }

  const openReservation = (returnScreen, placeId = 'pipeground') => {
    setReservationReturnScreen(returnScreen)
    setReservationPlaceId(placeId)
    setScreen('reservation')
  }

  const goHome = () => setScreen('home')
  const goMyPage = (initialSection = null) => {
    setMyPageInitialSection(typeof initialSection === 'string' ? initialSection : null)
    setScreen('mypage')
  }

  const savePlace = (place) => {
    setSavedPlaces((currentPlaces) => {
      if (!place || currentPlaces.some((currentPlace) => currentPlace.id === place.id)) {
        return currentPlaces
      }

      return [place, ...currentPlaces]
    })
  }

  const saveRecommendation = (recommendation) => {
    setSavedRecommendations((currentRecommendations) => {
      if (!recommendation || currentRecommendations.some((currentRecommendation) => currentRecommendation.id === recommendation.id)) {
        return currentRecommendations
      }

      return [recommendation, ...currentRecommendations]
    })
  }

  const savedPlaceIds = savedPlaces.map((place) => place.id)
  const savedRecommendationIds = savedRecommendations.map((recommendation) => recommendation.id)

  return (
    <main className="app-stage">
      <div className="app-shell" aria-live="polite">
        {showSplash ? (
          <SplashScreen />
        ) : screen === 'onboarding' ? (
          <Onboarding onStart={() => setScreen('auth')} />
        ) : screen === 'auth' ? (
          <AuthScreen onLogin={() => setScreen('home')} />
        ) : screen === 'address' ? (
          <AddressScreen onBack={goHome} onHome={goHome} onMyPage={goMyPage} onNext={() => setScreen('readyPhoto')} onCameraAddress={() => setScreen('address')} />
        ) : screen === 'readyPhoto' ? (
          <ReadyPhotoScreen
            onBack={() => setScreen('address')}
            onHome={goHome}
            onMyPage={goMyPage}
            onTakePhoto={openCamera}
            onGalleryPhoto={openGalleryPhoto}
            onCameraAddress={() => setScreen('address')}
          />
        ) : screen === 'photo' ? (
          <PhotoScreen mode={photoMode} photoUrl={galleryPhotoUrl} onGalleryPhoto={openGalleryPhoto} onComplete={completePhoto} />
        ) : screen === 'analyze' ? (
          <AnalyzeScreen onBack={() => setScreen('photo')} onHome={goHome} onMyPage={goMyPage} onComplete={() => setScreen('aichat')} onCameraAddress={() => setScreen('address')} />
        ) : screen === 'aichat' ? (
          <AiChatScreen
            photoUrl={analysisPhotoUrl}
            onBack={() => setScreen('analyze')}
            onHome={goHome}
            onMyPage={goMyPage}
            onOpenRecommendationList={() => setScreen('result')}
            onCameraAddress={() => setScreen('address')}
            onReserve={(placeId) => openReservation('aichat', placeId)}
            onSavePlace={savePlace}
            savedPlaceIds={savedPlaceIds}
          />
        ) : screen === 'result' ? (
          <ResultScreen
            onBack={() => setScreen('aichat')}
            onHome={goHome}
            onMyPage={goMyPage}
            onCameraAddress={() => setScreen('address')}
            onReserve={(placeId) => openReservation('result', placeId)}
            onSavePlace={savePlace}
            savedPlaceIds={savedPlaceIds}
            onOpenDetail={(placeId) => {
              setDetailPlaceId(placeId)
              setScreen('detail')
            }}
          />
        ) : screen === 'detail' ? (
          <DetailScreen placeId={detailPlaceId} onBack={() => setScreen('result')} onHome={goHome} onMyPage={goMyPage} onCameraAddress={() => setScreen('address')} onSavePlace={savePlace} savedPlaceIds={savedPlaceIds} />
        ) : screen === 'reservation' ? (
          <ReservationScreen
            placeName={placeNames[reservationPlaceId] || placeNames.pipeground}
            bookedTimesByDate={bookedTimesByPlace[reservationPlaceId] || {}}
            onBack={() => setScreen(reservationReturnScreen)}
            onHome={goHome}
            onMyPage={goMyPage}
            onCameraAddress={() => setScreen('address')}
            onConfirm={(details) => {
              setReservationDetails(details)
              setReservationHistory((currentHistory) => [
                {
                  id: `${reservationPlaceId}-${Date.now()}`,
                  placeId: reservationPlaceId,
                  ...details,
                },
                ...currentHistory,
              ])
              setBookedTimesByPlace((current) => {
                const dateKey = getDateKey(details.date)
                const placeBookedTimes = current[reservationPlaceId] || {}
                const dateBookedTimes = placeBookedTimes[dateKey] || []

                if (dateBookedTimes.includes(details.time)) {
                  return current
                }

                return {
                  ...current,
                  [reservationPlaceId]: {
                    ...placeBookedTimes,
                    [dateKey]: [...dateBookedTimes, details.time],
                  },
                }
              })
              setScreen('reservationComplete')
            }}
          />
        ) : screen === 'reservationComplete' ? (
          <ReservationCompleteScreen
            reservation={reservationDetails}
            onHome={goHome}
            onMyPage={() => goMyPage()}
            onReservationHistory={() => goMyPage('reservations')}
            onCameraAddress={() => setScreen('address')}
          />
        ) : screen === 'mood' ? (
          <MoodScreen
            onBack={goHome}
            onHome={goHome}
            onMyPage={goMyPage}
            onCameraAddress={() => setScreen('address')}
            onOpenReviewPage={() => setScreen('reviewpage')}
            onSavePlace={savePlace}
            savedPlaceIds={savedPlaceIds}
          />
        ) : screen === 'reviewpage' ? (
          <ReviewPageScreen
            onBack={() => setScreen('mood')}
            onHome={goHome}
            onMyPage={goMyPage}
            onCameraAddress={() => setScreen('address')}
            onSaveRecommendation={saveRecommendation}
            savedRecommendationIds={savedRecommendationIds}
          />
        ) : screen === 'recommendationPage' ? (
          <RecommendationPageScreen
            onBack={goHome}
            onHome={goHome}
            onMyPage={goMyPage}
            onCameraAddress={() => setScreen('address')}
            onReserve={(placeId) => openReservation('recommendationPage', placeId)}
            onSavePlace={savePlace}
            savedPlaceIds={savedPlaceIds}
          />
        ) : screen === 'mypage' ? (
          <MyPageScreen
            savedPlaces={savedPlaces}
            savedRecommendations={savedRecommendations}
            reservations={reservationHistory}
            initialSection={myPageInitialSection}
            onHome={goHome}
            onCameraAddress={() => setScreen('address')}
          />
        ) : (
          <HomeScreen
            onAddress={() => setScreen('address')}
            onMood={() => setScreen('mood')}
            onReviewPage={() => setScreen('reviewpage')}
            onRecommendationPage={() => setScreen('recommendationPage')}
            onMyPage={goMyPage}
          />
        )}
      </div>
    </main>
  )
}

function getDateKey(date) {
  const targetDate = new Date(date)
  return `${targetDate.getFullYear()}-${targetDate.getMonth()}-${targetDate.getDate()}`
}

export default App
