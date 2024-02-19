function FilterCheckbox({value, onChange}) {
  
    const handleChange = (e) => {
        onChange(!value);      
        console.log('переключен');
    }
    return (
        <>
            <section className='filter-check-box'>
                <label className={`switch ${value ? 'on' : 'off'}`}>
                    <input type='checkbox' onClick={handleChange}id='toggle' name='isShort' />                         
                    <span className='slider' />                    
                </label>
            </section >
        </>
    )
}
export default FilterCheckbox