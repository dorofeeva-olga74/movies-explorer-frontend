import React , {useState} from 'react';
import isOnSavedList from '../../images/cardFilm.svg';

function MoviesCard(props) {    
    const cardImgUrl = isOnSavedList;
    const [isSaved, setIsSaved] = useState(false);
    const handleSavedClick = (e) => {
        setIsSaved(true); 
        console.log('delete');      
      }
    
    return (
        <article className='card'>
            <img className='card__img' src={cardImgUrl} alt={'Постер фильма'} />
            <div className={'card__title-section'}>
                <h3 className={'card__title'}>33 слова о дизайне</h3>                             
                <button onClick={handleSavedClick} id={'save-button'} type={"button"} aria-label={'Кнопка сохранения'}
                        className={`${isSaved ? 'card__delete' : 'card__save'}`}>
                </button>               
            </div>      
             <p className={'card__time-long'}>1ч42м</p>       
        </article>
    )
}
export default MoviesCard