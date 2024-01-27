import { useState } from 'react';

function FilterCheckbox() {
    const [isToggled, setIsToggled] = useState(false);
    const handleChange = (e) => {
        setIsToggled(e.target.checked);        
        console.log('переключен');
    }
    return (
        <>
            <section className='filter-check-box'>
                <label className={`switch ${isToggled ? 'on' : 'off'}`} htmlFor='toggle'>
                    <input type='checkbox' onClick={handleChange} id='toggle' />
                    <span className='slider' />                    
                </label>
            </section >
        </>
    )
}
export default FilterCheckbox