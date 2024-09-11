import React from 'react';


function BackgroundOptions() {
    const changeBackground = (background) => {
        // Buraya arka plan değiştirme işlemini ekleyin
        console.log(`Background changed to ${background}`);
    };

    return (
        <div className="background-options">
            <button onClick={() => changeBackground('blur')}>Blur</button>
            <button onClick={() => changeBackground('image1')}>Image 1</button>
            <button onClick={() => changeBackground('image2')}>Image 2</button>
        </div>
    );
}

export default BackgroundOptions;
