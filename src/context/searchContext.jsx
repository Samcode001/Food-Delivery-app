
import React, { createContext, useContext, useState } from 'react'

 const searchValueContext=createContext();
const SearchContext = ({children}) => {
  const [searchvalue, setSearchvalue] = useState("Search");
  return (
    <searchValueContext.Provider value={{searchvalue,setSearchvalue}}>
        {children}
    </searchValueContext.Provider>
  )
}

export const useSearchContext=()=>{
    useContext(searchValueContext);
}

export default SearchContext