import React,{useState,useEffect} from 'react'
import { api } from '../utils/axios'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import '../styles/MoviesRow.css'


function MoviesRow({title,fetchUrl,isBackDrop}) {

  const [trailerUrl, setTrailerUrl]= useState("")
  const [movies,setMovies]= useState([])
  const img_baseUrl= 'https://image.tmdb.org/t/p/original/'

  useEffect(()=>{
       async function fetchMovies(){ 
           const response= await api.get(`${fetchUrl}`)
           setMovies(response.data.results)
       }
       fetchMovies()
  },[fetchUrl])

  const options= {
    width: "100%",
    height: "390", 
    playerVars: {
      autoplay: 1
    }
  }

    const getTrailerUrl= (movie)=>{
      if(trailerUrl){
        setTrailerUrl("")
      }else{
         movieTrailer(movie?.title)
        .then((url)=>{
          const urlParams= new URLSearchParams(new URL(url).search)
           setTrailerUrl(urlParams.get('v'))
        }).catch(err=> console.log(err))
    }
 }

  return (
    <div className="movies__row my-6 py-1 select-none"> 
        <h1 className="text-xl sm:text-3xl font-bold text-white uppercase mx-4 my-2">{title}</h1>
       <div className="movies__posters">
          <div className="flex mx-5 pt-2 pb-3">
              {movies && movies.map((movie)=>
                (<img
                    onClick={()=> movie.title ? getTrailerUrl(movie) : null}
                    key={movie.id} 
                    src={`${img_baseUrl}${isBackDrop ? movie.backdrop_path : movie.poster_path }`}
                    className={`${movie.isBackDrop ? 'h-40 sm:h-72 hover:scale-110 p-2 sm:p-4':'h-72 hover:scale-105 p-3'} w-full  mr-0.5 sm:object-contain hover:shadow-sm rounded-sm cursor-pointer transform scale-100 transition-all duration-300 ease-out`}
                    alt={`${movie?.name || title}`}
                  />)
                )}
          </div>   
       </div>
      { trailerUrl && <Youtube vidioId={trailerUrl} opts={options}/>}
    </div>
  )
}

export default MoviesRow
