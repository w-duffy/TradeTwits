import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import PortfolioGraph from "./PortfolioGraph";
import { addTicker } from '../../store/session';

const Main = () => {
const dispatch = useDispatch()
const [showForm, setShowForm] = useState(false)
const [tickerName, setTickerName] = useState("")
const [newTick, setNewTick] = useState(false)

  const user = useSelector((state) => state.session.user);
  // const portArr = Object.values(user.portfolio)

  const handleAddTicker = (e) => {
    e.preventDefault();
    const ticker = tickerName
    let user_id = user.id
    let name = user.portfolio[0].name
    dispatch(addTicker(ticker, user_id, name))
    setTickerName("")
    setShowForm(!showForm)
    setNewTick(!newTick)

}

  return (
    <>
      <button
        onClick={(e) => setShowForm(!showForm)}
      >
          Add a Stock to {user.portfolio[0].name}
      </button>
      {showForm && (
        <form onSubmit={handleAddTicker}>
          <div>
            <input
              name="Add Ticker"
              placeholder="Ticker name.."
              value={tickerName}
              onChange={(e) => setTickerName(e.target.value)}
            ></input>
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
      <PortfolioGraph newTick={newTick} />
    </>
  );
};

export default Main;
