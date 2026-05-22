import { useEffect, useRef, useState } from 'react'

function PhotoScreen({ mode = 'fallback', photoUrl = '', onGalleryPhoto, onComplete }) {
  const videoRef = useRef(null)
  const fileInputRef = useRef(null)
  const [cameraStream, setCameraStream] = useState(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [facingMode, setFacingMode] = useState('environment')

  useEffect(() => {
    let activeStream = null
    let isMounted = true

    const openCamera = async () => {
      if (mode !== 'camera' || photoUrl || !navigator.mediaDevices?.getUserMedia) {
        setCameraReady(false)
        return
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
          },
          audio: false,
        })

        activeStream = stream

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        setCameraStream(stream)
        setCameraReady(true)
      } catch (error) {
        console.warn('camera unavailable, showing fallback image', error)
        setCameraReady(false)
      }
    }

    openCamera()

    return () => {
      isMounted = false
      activeStream?.getTracks().forEach((track) => track.stop())
      setCameraStream(null)
    }
  }, [facingMode, mode, photoUrl])

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream
    }
  }, [cameraStream])

  const shouldShowCamera = mode === 'camera' && cameraReady && !photoUrl
  const previewSrc = photoUrl || '/assets/outfit.png'

  const handleGalleryClick = () => {
    fileInputRef.current?.click()
  }

  const handleGalleryChange = (event) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      onGalleryPhoto?.(selectedFile)
      event.target.value = ''
    }
  }

  const handleShutterClick = () => {
    if (!shouldShowCamera || !videoRef.current) {
      onComplete?.({
        type: photoUrl ? 'gallery' : 'fallback',
        src: previewSrc,
      })
      return
    }

    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 390
    canvas.height = video.videoHeight || 729

    const context = canvas.getContext('2d')
    context?.drawImage(video, 0, 0, canvas.width, canvas.height)

    canvas.toBlob((blob) => {
      if (!blob) {
        onComplete?.({
          type: 'camera',
          src: canvas.toDataURL('image/png'),
        })
        return
      }

      onComplete?.({
        type: 'camera',
        file: blob,
        src: URL.createObjectURL(blob),
      })
    }, 'image/jpeg', 0.92)
  }

  const handleFlipClick = () => {
    setCameraReady(false)
    setFacingMode((currentFacingMode) => (currentFacingMode === 'environment' ? 'user' : 'environment'))
  }

  return (
    <section className="photo-screen" aria-label="사진 촬영">
      <div className="photo-camera-frame">
        {shouldShowCamera ? (
          <video
            ref={videoRef}
            className={`photo-preview ${facingMode === 'user' ? 'is-front-camera' : ''}`}
            autoPlay
            playsInline
            muted
            aria-label="카메라 미리보기"
          />
        ) : (
          <img className="photo-preview" src={previewSrc} alt="" />
        )}

        <div className="photo-top-mask" />
        <div className="photo-status-dot" />

        <div className="photo-flash">
          <img className="photo-flash-icon" src="/assets/ready-photo-flash.svg" alt="" />
          <img className="photo-flash-cross" src="/assets/ready-photo-flash-cross.svg" alt="" />
        </div>

        <img className="photo-swipe" src="/assets/ready-photo-swipe-up.svg" alt="" />

        <div className="photo-raw-live" aria-hidden="true">
          <div className="photo-raw">
            <span className="photo-raw-border" />
            <span className="photo-raw-fill" />
            <span>RAW</span>
            <img src="/assets/ready-photo-raw-stroke.svg" alt="" />
          </div>
          <img className="photo-live" src="/assets/ready-photo-live.svg" alt="" />
        </div>

        <div className="photo-camera-controls">
          <div className="photo-zoom" aria-hidden="true">
            <span className="photo-zoom-bg" />
            <img className="photo-zoom-dot is-left" src="/assets/ready-photo-zoom-dot.svg" alt="" />
            <img className="photo-zoom-dot is-right" src="/assets/ready-photo-zoom-dot.svg" alt="" />
            <img className="photo-zoom-active" src="/assets/ready-photo-zoom-active.svg" alt="" />
            <span className="photo-zoom-label is-left">.5</span>
            <span className="photo-zoom-label is-active">1x</span>
            <span className="photo-zoom-label is-right">3</span>
          </div>

          <div className="photo-modes" aria-hidden="true">
            <span>CINEMATIC</span>
            <span>VIDEO</span>
            <span className="is-active">PHOTO</span>
            <span>PORTRAIT</span>
            <span>PANO</span>
          </div>

          <div className="photo-actions">
            <button className="photo-thumbnail" type="button" aria-label="갤러리 업로드" onClick={handleGalleryClick}>
              <img src="/assets/ready-photo-mountain.svg" alt="" />
            </button>
            <button className="photo-shutter" type="button" aria-label="촬영" onClick={handleShutterClick}>
              <img src="/assets/ready-photo-shutter.svg" alt="" />
            </button>
            <button className="photo-flip" type="button" aria-label="전면 후면 카메라 전환" onClick={handleFlipClick}>
              <img src="/assets/ready-photo-camera-flip.svg" alt="" />
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          className="photo-file-input"
          type="file"
          accept="image/*"
          onChange={handleGalleryChange}
        />

        <div className="photo-bottom-bar">
          <span className="photo-home-indicator" />
        </div>
      </div>
    </section>
  )
}

export default PhotoScreen
