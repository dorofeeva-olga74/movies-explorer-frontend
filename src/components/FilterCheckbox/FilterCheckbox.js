import { useState } from 'react';

function FilterCheckbox() {
    const [isToggled, setIsToggled] = useState(false);
    const handleChange = (e) => {
        setIsToggled(e.target.checked);        
        console.log('переключен');
    }
    return (
        <>
            <section className='filterCheckbox'>
                <label className={`switch ${isToggled ? 'on' : 'off'}`} htmlFor='toggle'>
                    <input type='checkbox' onChange={handleChange} id='toggle' />
                    <span className='slider' />                    
                </label>
            </section >
        </>
    )
}
export default FilterCheckbox