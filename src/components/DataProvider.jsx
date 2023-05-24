import React from 'react'

 export const searchContext=React.createContext();

// const DataProvider=({children,props})=>{
//   console.log(props.searchValue);
//   return (
//     <searchContext.Provider value={{}}>
//       {children}
//     </searchContext.Provider>
//   )
// }

// export const useDataContext=()=>React.useContext()

// export default DataProvider