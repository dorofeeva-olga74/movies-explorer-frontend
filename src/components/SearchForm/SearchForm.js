
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Find from '../../images/Find.svg';


function SearchForm() {
    
    return (
        <>
            <section className='search'>
                <form action="#" className={`search__form`}>
                    <input required id={"search-input"}
                        className={'search__input'}
                        placeholder={'Фильм'}
                    />
                    <button className='search__button' type='submit' aria-label={'Найти'}>
                        <img className='search__img' src={Find} alt='Поиск' />
                    </button>
                </form>
                <hr className='search__line' />
                <span className='search__filterCheckbox-conteiner'>
                    <FilterCheckbox />                    
                    <label className='search__label'>Короткометражки</label>
                </span>
            </section >
        </>
    )
}
export default SearchForm