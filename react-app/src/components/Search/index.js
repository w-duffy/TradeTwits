import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { searchOptions } from './tickers'
import {useHistory } from 'react-router-dom'

function SearchBar() {
    const history = useHistory()
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



    return (
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
                    <a onClick={() => {setSearchTerm(""); window.location.href=`/discussion/${result[0]}`}} className="test" > {result[0]} - {result[1]} </a>
                    <button>submit</button>
                    </div>
                    </>
                    ))}
                </>
            )}
        </div>
        </div>
    )
}

export default SearchBar
