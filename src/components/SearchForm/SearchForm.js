
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Find from '../../images/Find.svg';


function SearchForm() {

    return (
        <>
            <section className='search'>
                <form action="#" className='search__form'>
                    <div className='search__input-container'>
                        <input required id={'search-input'}
                            className='search__input'
                            placeholder={'Фильм'}
                        />
                        <button className='search__button' type='submit' aria-label={'Найти'}>
                            <img className='search__img' src={Find} alt='Поиск' />
                        </button>
                    </div>
                    <span className='search__filter-checkbox-conteiner'>
                        <FilterCheckbox />
                        <label className='search__label'>Короткометражки</label>
                    </span>
                </form>
            </section >
        </>
    )
}
export default SearchForm