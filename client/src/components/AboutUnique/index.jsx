import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe';

function Unique() {
    return (
        <section className='unique'>
            <div className='description'>
                <h2>Unique & Stylish Fashion: We Are An Awesome Agency.</h2>
                <p>I am a highly organized and motivated professional Fashion Designer with a wealth of experience in a range of photographic styles and services. Just run your Fashion Store which will be a reflection of you, a sexy and confident woman that shines with her unique style. Our goal is to make fashion as easy as possible. We bring you the best of glam and sexy clothes while keeping in mind that high-quality things aren't always too expensive. Our goal is to make fashion as easy as possible, that is why we add carefully selected products on a daily basis, and this is essential for us. This is how you keep up with the times in style! We ship worldwide & space!</p>
                <Link className='explore' to='/explore'>
                    EXPLORE MORE
                </Link>
            </div>
            <Iframe
                url='https://www.youtube.com/embed/U4PKZD-h5nQ' // Use embed URL
                width='100%'
                height='600px'
                className='iframe'
                display='block'
                position='relative'
            />
        </section>
    );
}

export default Unique;
