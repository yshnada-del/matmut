function SplashScreen() {
  return (
    <section className="splash-screen" aria-label="앱 로딩 화면">
      <StatusBar />
      <div className="splash-content">
        <img className="splash-logo" src="/assets/logo.svg" alt="Matmut" />
      </div>
      <HomeIndicator />
    </section>
  )
}

function StatusBar() {
  return (
    <div className="mobile-status-bar" aria-hidden="true">
      <span className="status-time">9:41</span>
      <img className="status-icons" src="/assets/status-icons.svg" alt="" />
    </div>
  )
}

function HomeIndicator() {
  return (
    <div className="mobile-home-area" aria-hidden="true">
      <span className="home-indicator" />
    </div>
  )
}

export { StatusBar, HomeIndicator }
export default SplashScreen
