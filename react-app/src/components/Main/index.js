import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import PortfolioGraph from "./PortfolioGraph";
import { addTicker } from '../../store/session';
import { searchOptions } from '../Search/tickers'

const Main = () => {
const dispatch = useDispatch()
const [showForm, setShowForm] = useState(false)
// const [tickerName, setTickerName] = useState("")
const [newTick, setNewTick] = useState(false)
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);

useEffect(() =>{
    setSearchTerm("")
},[])

useEffect(async (e) =>{
    if (searchTerm === ""){
        return setSearchTerm("")
    }


const filteredResult = searchOptions.filter(word =>{
    return (word[0].includes(searchTerm.toUpperCase()) || word[1].toUpperCase().includes(searchTerm.toUpperCase()))
})

const finalResult = filteredResult.slice(0, 5)
setSearchResults(finalResult)
}, [searchTerm])

  const user = useSelector((state) => state.session.user);
  // const portArr = Object.values(user.portfolio)
  const handleAddTicker = (e, tickerName) => {
    e.preventDefault();
    console.log("ADDTICKER", tickerName)
    const ticker = tickerName
    let user_id = user.id
    let name = user.portfolio[0].name
    dispatch(addTicker(ticker, user_id, name))
    // setTickerName("")
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
               <div className='search_container'>
               <div className="search__bar">
                   <input type="text" value={searchTerm} placeholder="Search ticker or company name.." onChange={(e)=>setSearchTerm(e.target.value)}></input>

               </div>
               <div id="search_results">
                   {searchTerm && (
                       <>
                       {searchResults.map((result) => (
                           <>
                           <div>
                           <p> {result[0]} - {result[1]} </p>
                           <button onClick={(e) => {setSearchTerm(""); handleAddTicker(e, result[0])}}>submit</button>
                           </div>
                           </>
                           ))}
                       </>
                   )}
               </div>
               </div>




        // <form onSubmit={handleAddTicker}>
        //   <div>
        //     <input
        //       name="Add Ticker"
        //       placeholder="Ticker name.."
        //       value={tickerName}
        //       onChange={(e) => setTickerName(e.target.value)}
        //     ></input>
        //     <button type="submit">
        //       Submit
        //     </button>
        //   </div>
        // </form>
      )}
      <PortfolioGraph newTick={newTick} />
    </>
  );
};

export default Main;
