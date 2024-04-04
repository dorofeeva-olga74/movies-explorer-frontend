import React, {useEffect} from "react";

function InfoTooltip({ src, isOpen, onClose, text, onCloseOverlay }) {
  
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`popup popup_type_success-form ${isOpen ? 'popup_opened' : ''}`} onClick={onCloseOverlay}>
      <div className="popup__container">
        <div className="popup__form" onClick={e => e.stopPropagation()}>
          <img className="popup__auth-img" src={src} alt={text} />
          <p className="popup__info-text">{text}</p>
        </div>
        <button id={"close-popup-button"} type={"button"} aria-label={"Закрыть"}
          onClick={onClose} className={"popup__close-button"} />
      </div>
    </div>
  )
}
export default InfoTooltip