import React, {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import PortfolioGraph from "./PortfolioGraph";
import { addTicker } from '../../store/session';
import { searchOptions } from '../Search/tickers'

const Main = ({showEditPortfolio}) => {
const dispatch = useDispatch()
const [showForm, setShowForm] = useState(false)
// const [tickerName, setTickerName] = useState("")
const [newTick, setNewTick] = useState(false)
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);
const refHandler = useRef(null);

// const portfolios = useSelector((state) => state.portfolioReducer);
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
    let portCheck = user.portfolio.filter(portfolio =>{
      return portfolio.ticker === tickerName
    })
    if (portCheck.length > 0){
      window.alert("You cannot add an existing ticker to your portfolio")
      return;
    }
    const ticker = tickerName
    let user_id = user.id
    dispatch(addTicker(ticker, user_id))
    // setTickerName("")
    setShowForm(!showForm)


}


useEffect(() => {
  document.addEventListener("click", clickedOffSearch, false);
  return () => {
    document.removeEventListener("click", clickedOffSearch, false);
  };
}, []);

const clickedOffSearch = event => {
  if (refHandler.current && !refHandler.current.contains(event.target)) {
    setSearchTerm("");
  }
};


  return (
    <>
        {/* <div className='add-stock-button'>

      <button
        onClick={(e) => setShowForm(!showForm)}
        >
          Add a Stock to your Portfolio
      </button>
        </div> */}
      {showEditPortfolio && (
               <div ref={refHandler} className='search_container'>
               <div className="search__bar">
                   <input type="text" id="search-input" value={searchTerm} placeholder="Ticker or Company Name" onChange={(e)=>setSearchTerm(e.target.value)}></input>

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
      <PortfolioGraph key={user.id} showEditPortfolio={showEditPortfolio} newTick={newTick} />
    </>
  );
};

export default Main;
