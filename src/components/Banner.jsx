import React,{useState,useEffect} from 'react'
import { api } from '../utils/axios'
import {requests} from '../utils/endpoints'
import '../styles/Banner.css'


function Banner() {

  const [playing,setPlaying]= useState(false)
  const [movie,setMovie]= useState([])
  const img_baseUrl= 'https://image.tmdb.org/t/p/original/'

  const truncate= (str,n)=> str?.length>n ? str.slice(0,n)+'...' : str

  useEffect(()=>{
       async function fetchRandomMovie(){ 
         const response= await api.get(`${requests.originals}`)
         const data= response.data.results
          const randomIndex= Math.floor(Math.random() * data.length-1)
           setMovie(data[randomIndex])
       }
       fetchRandomMovie()
  },[])



  return (
    <div className="banner select-none">
        <div className=" absolute inset-0 w-full h-full bg-gray-800 opacity-25 z-10"></div>
        <img 
            src={`${img_baseUrl}${movie?.backdrop_path}`} 
            className="absolute inset-0 w-full h-full object-cover object-top" 
            alt={movie?.name}
          />
        <div className="banner__content">
            <h1 className="w-5/12 sm:w-7/12 md:w-2/3 text-2xl sm:text-3xl md:text-5xl pr-2 break-words font-bold text-white tracking-wide">{movie?.name}</h1>
            <div className="flex mt-4">
                <button onClick={()=> setPlaying(!playing)} className={`${playing && 'bg-opacity-100'} flex items-center px-6 py-1.5 bg-red-600 text-white bg-opacity-30 hover:bg-opacity-90 font-semibold focus:outline-none transition-all duration-200 ease-out`}>
                   <span className="text-sm">Play</span>
                  <img src={`/images/${playing ? 'pause' : 'play'}.svg`} className="w-6 ml-1" alt="play_icon" />
                </button>
                <button className={` flex items-center mx-3 px-6 py-1.5 bg-red-600 text-white bg-opacity-30 hover:bg-opacity-70 font-semibold focus:outline-none transition-all duration-200 ease-out`}>
                   <img src="/images/list.svg" className="w-4" alt="list_icon"/>
                   <span className="ml-3 text-sm">My List</span>
                </button>
            </div>
            <p className="pr-3 w-4/12 sm:w-7/12 md:w-2/3 mt-6 text-sm md:text-base text-white break-words">{truncate(movie?.overview,140)}</p>
        </div>

         
    </div>
  )
}

export default Banner
