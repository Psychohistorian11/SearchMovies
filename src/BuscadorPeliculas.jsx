import React, {useState} from 'react'


export const BuscadorPeliculas = () => {

  const url = 'https://api.themoviedb.org/3/search/movie'
  const API_KEY = '4557cebbbf085c3fb3cde4cf4def79eb'

  const [busqueda, setBusqueda] = useState('')  
  const [peliculas, setpeliculas] = useState([])
  const handleInputChange = (event) => {
        setBusqueda(event.target.value)
  }

  const handleSubmit = (event) => {
        event.preventDefault()
        fetchPeliculas()
  }

  const fetchPeliculas = async() => {
        try {
            const response = await fetch(`${url}?query=${busqueda}&api_key=${API_KEY}`)
            const data = await response.json()
            setpeliculas(data.results)
        }catch(error){
            console.log(error)
        }
  }
  return (
    <>
    <div className="container">
        <h1 className="title">Buscador de Peliculas </h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Escribe una Pelicula"
            value={busqueda}
            onChange={handleInputChange}></input>
            
            <button type="submit" className="search-button">Buscar</button>
        </form>
        <div className="movie-list">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview}</p>
          </div>

        ))}

      </div>
    </div>
    </>
  )
}
