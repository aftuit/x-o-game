import React from 'react'

const ModalForm = ({
    showModal,
    userTurn,
    accepted,
    firstPlayer,
    secondPlayer,
    createUser,
    getUserName
}) => {
    return (
        <div className={`modal-card ${showModal && "show"}`}>
            <h1>{userTurn}-O'yinchi</h1>
            <input
                type="text"
                disabled={accepted}
                placeholder="username kiriting"
                value={userTurn === 1 ? firstPlayer : secondPlayer}
                onChange={(evt) => getUserName(evt.target.value)}
            />
            <button
                disabled={userTurn === 1 ? !firstPlayer : !secondPlayer}
                className={`${accepted && "accepted"}`}
                onClick={() => createUser()}
            >
                {" "}
                {accepted ? (<span>&#10004;</span>) : "Tasdiqlash"}
            </button>
        </div>
    )
}

export default ModalForm