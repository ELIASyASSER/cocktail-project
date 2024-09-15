import React from 'react'
import { Link } from 'react-router-dom'

const Cocktail = ({id,name,img,type,glass}) => {
  
  return (
    
    <article className='cocktail'>
      <div className='img-container'>
        <img src={img} alt='image'/>
      </div>
      <div className='cocktail-footer'>
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{type}</p>
        <Link to={`/cocktail/${id}`} className='btn btn-primary'>Details</Link>
      </div>
    </article>

  )
}

export default Cocktail
