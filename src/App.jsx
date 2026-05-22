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

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [screen, setScreen] = useState('onboarding')
  const [photoMode, setPhotoMode] = useState('fallback')
  const [galleryPhotoUrl, setGalleryPhotoUrl] = useState('')
  const [analysisPhotoUrl, setAnalysisPhotoUrl] = useState('')
  const [detailPlaceId, setDetailPlaceId] = useState('pipeground')

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
          />
        ) : screen === 'result' ? (
          <ResultScreen
            onBack={() => setScreen('aichat')}
            onCameraAddress={() => setScreen('address')}
            onOpenDetail={(placeId) => {
              setDetailPlaceId(placeId)
              setScreen('detail')
            }}
          />
        ) : screen === 'detail' ? (
          <DetailScreen placeId={detailPlaceId} onBack={() => setScreen('result')} onCameraAddress={() => setScreen('address')} />
        ) : (
          <HomeScreen onAddress={() => setScreen('address')} />
        )}
      </div>
    </main>
  )
}

export default App
