import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading,setLoading] = useState(false)
  const [searchTerm,setSearchTerm] = useState('')
  const [cocktails,setCocktails] = useState([])
  const fetchDrinks = useCallback( async function () {
    setLoading(true)
    try {
      const res = await fetch(`${url}${searchTerm}`)
      const data = await res.json()
      const {drinks} = data
      if(drinks){
        const newDrinks = drinks.map((drink)=>{
          const{idDrink,strDrink,strDrinkThumb,strAlcoholic,strGlass} = drink
          return{id:idDrink,name:strDrink,img:strDrinkThumb,type:strAlcoholic,glass:strGlass}
        })
        setCocktails(newDrinks)
      }else{
        setCocktails([])
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
      
    }
  },[searchTerm])
  useEffect(()=>{
    fetchDrinks()
  },[searchTerm])

  return <AppContext.Provider value={{loading,searchTerm,cocktails,setSearchTerm}}>{children}</AppContext.Provider>

}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
