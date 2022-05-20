import React from "react";
import Card from "./components/Card";
import ModalForm from "./components/ModalForm";
import Result from "./components/Result";
function App() {
  const data = [
    { numb: 1, isAdded: false, value: "" },
    { numb: 2, isAdded: false, value: "" },
    { numb: 3, isAdded: false, value: "" },
    { numb: 4, isAdded: false, value: "" },
    { numb: 5, isAdded: false, value: "" },
    { numb: 6, isAdded: false, value: "" },
    { numb: 7, isAdded: false, value: "" },
    { numb: 8, isAdded: false, value: "" },
    { numb: 9, isAdded: false, value: "" },
  ];
  const [numbers, setNumbers] = React.useState(data);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [fstPlayNumbers, setFstPlayNumbers] = React.useState([]);
  const [scndPlayNumbers, setScndPlayNumbers] = React.useState([]);
  const [ranks, setRanks] = React.useState([]);
  const [firstPlayer, setFirstPlayer] = React.useState("");
  const [secondPlayer, setSecondPlayer] = React.useState( "");
  const [userTurn, setUserTurn] = React.useState(1);
  const [accepted, setAccepted] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showRank, setShowRank] = React.useState(false);
  const [turn, setTurn] = React.useState(true);
  const [winner, setWinner] = React.useState(0);
  const [winId, setWinId] = React.useState(-1);

  const [winningValues] = React.useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ]);

  const getValue = (item) => {
    setNumbers(
      [...numbers].map((number) => {
        if (number.numb === item) {
          return {
            ...number,
            isAdded: true,
            value: turn ? "x" : "o",
          };
        } else return number;
      })
    );

    turn
      ? setFstPlayNumbers((e) => [...e, item])
      : setScndPlayNumbers((e) => [...e, item]);
    setTurn(!turn);
  };

  function checkList(arr1, arr2) {
    return arr2.every((e) => arr1.includes(e));
  }

  React.useEffect(() => {
    const indexF = winningValues.findIndex((numb) =>
      checkList(fstPlayNumbers, numb)
    );
    const indexS = winningValues.findIndex((numb) =>
      checkList(scndPlayNumbers, numb)
    );
    if (indexF > -1) {
      setWinner(1);
      setIsPlaying(false);
      setWinId(indexF);
    } else if (indexS > -1) {
      setWinner(2);
      setIsPlaying(false);
      setWinId(indexS);
    } else if (fstPlayNumbers.length + scndPlayNumbers.length === 9) {
      setIsPlaying(false);
      setWinner(3);
    } else setWinner(0);
  }, [fstPlayNumbers, scndPlayNumbers, winningValues]);

  React.useEffect(() => {
    setShowModal(true);
  }, []);

  function createUser() {
    if (userTurn === 1) {
      setAccepted(true);
      setTimeout(() => {
        setAccepted(false);
        setUserTurn(2);
      }, 1000);
    } else {
      setAccepted(true);
      setTimeout(() => {
        setAccepted(false);
        setShowModal(false);
        setIsPlaying(true);
      }, 500);
    }
  }

  function getUserName(value) {
    userTurn === 1 ? setFirstPlayer(value) : setSecondPlayer(value);
  }

  function restartGame() {
    
    const time = new Date();
    let item = {
      id: time.getTime(),
      a: firstPlayer,
      b: secondPlayer,
      winner,
    }  
    setRanks(e => [...e, item]);
    console.log(ranks)
    setIsPlaying(true);
    setFstPlayNumbers([]);
    setScndPlayNumbers([]);
    setNumbers(data);
  }

  function cancelGame() {
    setFirstPlayer("");
    setSecondPlayer("");
    setUserTurn(1);
    setShowModal(true);
    restartGame();
    setRanks([])
    setIsPlaying(false)
  }

  console.log(isPlaying);

  const toggleRank = () => setShowRank(!showRank)

  return (
    <div className="content-wrapper">
      <div className="navbar">
        <img src="/icn/xo.png" alt="" />
        <img src="/icn/ranking.png" alt="" onClick={toggleRank} />
      </div>
      <div className={`ranks-fade ${showRank && 'show'}`} onClick={toggleRank}></div>
      <div className={`ranks ${showRank && 'show'}`}>
        <ul>        
          {ranks?.length === 0 ? (
            <p>Natijalar mavjud emas!</p>
          ) : (
            ranks?.map((rank) => <li key={ranks.id} className="">
              <span className={`l-${rank.winner === 1? 'gr': rank.winner === 2? 're': 'yl'}`}>{rank.a}</span>
              <span className={`l-${rank.winner === 2? 'gr': rank.winner === 1? 're': 'yl'}`}>{rank.b}</span>
            </li>)
          )}
          
        </ul>
        <div className="results">
          <span>{ranks.filter(rank => rank.winner === 1).length}</span>
          <span>{ranks.filter(rank => rank.winner === 2).length}</span>
        </div>
      </div>

      <div className={`fade-modal ${showModal && "show"}`}></div>
      <ModalForm
        showModal={showModal}
        userTurn={userTurn}
        accepted={accepted}
        firstPlayer={firstPlayer}
        secondPlayer={secondPlayer}
        createUser={createUser}
        getUserName={getUserName}
      />

      {isPlaying && (
        <div className="players">
          <p>
            {firstPlayer} {turn && <span className="badge">Sizning navbatingiz</span>}{" "}
          </p>
          <p>
            {secondPlayer} {!turn && <span className="badge">Sizning navbatingiz</span>}
          </p>
        </div>
      )}

      <div className="cards-content">
        {numbers.map((number) => (
          <Card
            key={number.numb}
            getValue={getValue}
            number={number}
            value={number.value}
            winner={winner}
            winningValues={winningValues}
            winId={winId}
            isPlaying={isPlaying}
          />
        ))}
      </div>
      <Result
        firstPlayer={firstPlayer}
        secondPlayer={secondPlayer}
        winner={winner}
        restartGame={restartGame}
        cancelGame={cancelGame}
      />
    </div>
  );
}

export default App;
