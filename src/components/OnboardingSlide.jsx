function OnboardingSlide({ slide }) {
  return (
    <article className="onboarding-slide" aria-labelledby={`slide-${slide.id}-title`}>
      <div className="onboarding-copy">
        <h1 id={`slide-${slide.id}-title`}>
          {slide.titleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p>
          {slide.descriptionLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>
      <div className={`onboarding-visual ${slide.imageClass}`}>
        <img src={slide.image} alt="" draggable="false" />
      </div>
    </article>
  )
}

export default OnboardingSlide
