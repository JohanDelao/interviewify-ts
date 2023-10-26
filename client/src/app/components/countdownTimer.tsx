import React, {useState, useEffect} from 'react'
  
const CountdownTimer = () => {
    const [time, setTime] = useState(120);

    useEffect(() => {
        const intId = setInterval(() => {
            if(time >= 0){
                setTime((prevTime) => prevTime - 1);
            } else {
                clearInterval(intId);
            }
        }, 1000);
    }, [])

    const timeConvert = (time: number) => {
        if (time < 0){
            return '00';
        }
        if(time < 10){
            return '0' + String(time);
        } else {
            return String(time)
        }
    }
    
    return (
        <div className='w'>
            <div className='flex'>
                <p>{timeConvert(Math.floor(time / 60))}:</p>
                <p>{timeConvert(time % 60)} </p>
            </div>
        </div>
    )
};

  export default CountdownTimer;