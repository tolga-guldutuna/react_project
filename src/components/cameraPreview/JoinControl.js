import React from 'react';


function JoinControl() {
    const handleJoin = () => {
        // Toplantıya katılma işlevi
        console.log('Joining the meeting...');
    };

    const handleCancel = () => {
        // Toplantıya katılmayı iptal etme işlevi
        console.log('Cancelled joining the meeting.');
    };

    return (
        <div className="join-control">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleJoin}>Join now</button>
        </div>
    );
}

export default JoinControl;
