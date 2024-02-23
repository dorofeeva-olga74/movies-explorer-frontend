function FilterCheckbox({isShortFilm, setIsShortFilm}) {
  
    const handleChange = () => {
        setIsShortFilm(!isShortFilm);      
    }
    return (
        <>
            <section className='filter-check-box'>
                <label className={`switch ${isShortFilm ? 'on' : 'off'}`}>
                    <input type='checkbox' onClick={handleChange} id='toggle' name='isShort' />                         
                    <span className='slider' />                    
                </label>
            </section >
        </>
    )
}
export default FilterCheckbox