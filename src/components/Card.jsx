import React from 'react'

const Card = ({
    number,
    getValue,
    value,
    winner,
    winningValues,
    winId,
    isPlaying
}) => {


    return (
        <div className="card">
            <button disabled={number.isAdded || !isPlaying}
                className={`${(winner === 1 || winner === 2) 
                    && winningValues[winId].includes(number.numb) 
                    && 'win'} ${number.value === 'o' && 'yellow'}`
                }
                onClick={() => getValue(number.numb)}>
                {number.isAdded && value}
            </button>
        </div>
    )
}

export default Card