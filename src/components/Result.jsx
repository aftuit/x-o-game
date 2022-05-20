import React from 'react'

const Result = ({
    winner,
    restartGame,
    cancelGame,
    firstPlayer,
    secondPlayer,
}) => {

    console.log(firstPlayer,
        secondPlayer)

    return (
        <div className="result">
            {!winner ? (
                <></>
            ) : (
                <>
                    {winner === 3 ? (
                        <h3>durrang</h3>
                    ) : (
                        <>
                            <h3>
                                <i>
                                {winner === 1 ? firstPlayer : winner === 2 ? secondPlayer : ""}{" "}
                                </i> {winner === 1 ? "(x)" : "(o)"} g'olib !
                            </h3>
                        </>
                    )}
                    <div className="actions">
                        <img
                            onClick={restartGame}
                            src="/icn/reload.png"
                            alt=""
                            title="qayta o'ynash"
                        />
                        <img
                            onClick={cancelGame}
                            src="/icn/cancel.png"
                            alt=""
                            title="o'yinni yakunlash"
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default Result