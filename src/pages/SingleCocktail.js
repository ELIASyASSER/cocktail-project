import React, { useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const [loading,setLoading] = useState(false)
  const [cocktail,setCocktail] = useState(null)


  const{id} = useParams()
  React.useEffect(()=>{
    setLoading(true)
    async function getCocktail() {
      try {
        const resp = await fetch(`${url}${id}`)
        const data = await  resp.json()
        if(data.drinks){
          const {strDrink:name,strDrinkThumb:img,strAlcoholic:info,strCategory:category,strGlass:glass,strInstructions:instructions,strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5} = data.drinks[0]
        const ingredients = [strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5]
        const newCocktails = {
          name,img,info,category,glass,instructions,ingredients
        }
        setCocktail(newCocktails)
        }else{
          setCocktail(null)
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    getCocktail()
  },[id])

  if(loading){
    return <Loading/>
  }
  if(!cocktail){
    return <h2 className='section-title'>No Cocktail to display</h2>
  }

  const {name,img,category,info,glass,instructions,ingredients} = cocktail
  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>Back Home</Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={img} alt='image'/>
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name:</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category:</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info:</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass:</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>instructions:</span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients:</span>
            {ingredients.map((item,idx)=>{
              return item?<span key={idx}>{item}</span>:null
            })}
          </p>
        </div>

      </div>
    </section>
  )
}

export default SingleCocktail
