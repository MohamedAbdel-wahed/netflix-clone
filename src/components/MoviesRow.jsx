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
        <h1 className="text-xl sm:text-3xl font-bold text-white uppercase mx-4">{title}</h1>
       <div className="movies__posters py-10">
          <div className="w-full flex gap-12 px-6">
              {movies && movies.map((movie)=>
                (<img
                    onClick={()=> movie.title ? getTrailerUrl(movie) : null}
                    key={movie.id} 
                    src={`${img_baseUrl}${isBackDrop ? movie.backdrop_path : movie.poster_path }`}
                    className={`${isBackDrop ? 'w-[33rem]' : 'w-72 h-72'} h-full object-contain hover:shadow-sm rounded-sm cursor-pointer hover:scale-110 transition-all duration-300 ease-out`}
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
