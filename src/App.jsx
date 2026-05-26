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
    setAnalysisPhotoUrl(photoPayload?.src || galleryPhotoUrl || '/assets/outfit.png')
    setScreen('analyze')
  }

  const openReservation = (returnScreen, placeId = 'pipeground') => {
    setReservationReturnScreen(returnScreen)
    setReservationPlaceId(placeId)
    setScreen('reservation')
  }

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
          <AddressScreen onBack={() => setScreen('home')} onNext={() => setScreen('readyPhoto')} onCameraAddress={() => setScreen('address')} />
        ) : screen === 'readyPhoto' ? (
          <ReadyPhotoScreen
            onBack={() => setScreen('address')}
            onTakePhoto={openCamera}
            onGalleryPhoto={openGalleryPhoto}
            onCameraAddress={() => setScreen('address')}
          />
        ) : screen === 'photo' ? (
          <PhotoScreen mode={photoMode} photoUrl={galleryPhotoUrl} onGalleryPhoto={openGalleryPhoto} onComplete={completePhoto} />
        ) : screen === 'analyze' ? (
          <AnalyzeScreen onBack={() => setScreen('photo')} onComplete={() => setScreen('aichat')} onCameraAddress={() => setScreen('address')} />
        ) : screen === 'aichat' ? (
          <AiChatScreen
            photoUrl={analysisPhotoUrl}
            onBack={() => setScreen('analyze')}
            onOpenRecommendationList={() => setScreen('result')}
            onCameraAddress={() => setScreen('address')}
            onReserve={(placeId) => openReservation('aichat', placeId)}
          />
        ) : screen === 'result' ? (
          <ResultScreen
            onBack={() => setScreen('aichat')}
            onCameraAddress={() => setScreen('address')}
            onReserve={(placeId) => openReservation('result', placeId)}
            onOpenDetail={(placeId) => {
              setDetailPlaceId(placeId)
              setScreen('detail')
            }}
          />
        ) : screen === 'detail' ? (
          <DetailScreen placeId={detailPlaceId} onBack={() => setScreen('result')} onCameraAddress={() => setScreen('address')} />
        ) : screen === 'reservation' ? (
          <ReservationScreen
            placeName={placeNames[reservationPlaceId] || placeNames.pipeground}
            bookedTimesByDate={bookedTimesByPlace[reservationPlaceId] || {}}
            onBack={() => setScreen(reservationReturnScreen)}
            onCameraAddress={() => setScreen('address')}
            onConfirm={(details) => {
              setReservationDetails(details)
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
            onHome={() => setScreen('home')}
            onCameraAddress={() => setScreen('address')}
          />
        ) : screen === 'mood' ? (
          <MoodScreen
            onBack={() => setScreen('home')}
            onHome={() => setScreen('home')}
            onCameraAddress={() => setScreen('address')}
            onOpenReviewPage={() => setScreen('reviewpage')}
          />
        ) : screen === 'reviewpage' ? (
          <ReviewPageScreen
            onBack={() => setScreen('mood')}
            onHome={() => setScreen('home')}
            onCameraAddress={() => setScreen('address')}
          />
        ) : (
          <HomeScreen
            onAddress={() => setScreen('address')}
            onMood={() => setScreen('mood')}
            onReviewPage={() => setScreen('reviewpage')}
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
