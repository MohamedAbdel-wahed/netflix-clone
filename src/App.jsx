import React,{useState,useEffect} from 'react';
import Header from './components/Header'
import Banner from './components/Banner'
import MoviesRow from './components/MoviesRow'
import {requests} from './utils/endpoints'



function App() {

  const [loading,setLoading]= useState(true);

  useEffect(()=>{
    window.onload= ()=> setLoading(false)
  },[loading])

  return (
      <div className="App">
        <div className={loading ? 'loader flex justify-center' : 'hidden'}>
           <div className="mx-1">
            <div className="square mt-36 ml-20">
                <div></div>
                <div></div>
            </div>
              <div className="text-red-900 mt-10 tracking-wide text-sm sm:text-base">
                <h1 className="font-bold text-xl sm:text-2xl md:text-4xl">Welcome to Netflix Clone</h1>
                <p className="mt-2">this is just for learning purposes.</p>
                <p className="uppercase">Please Dont Ever Visit Netflix!</p>
              </div>
           </div>

        </div>
        <div className={loading ? 'hidden' : 'block'}>
            <Header />
            <Banner />
            <MoviesRow title={"netflix originals"} fetchUrl={requests.originals} isBackDrop/>
            <MoviesRow title={"trending"} fetchUrl={requests.trending} />
            <MoviesRow title={"top rated"} fetchUrl={requests.top_rated} />
            <MoviesRow title={"action movies"} fetchUrl={requests.action} />
            <MoviesRow title={"horror movies"} fetchUrl={requests.horror} />
            <MoviesRow title={"comedy movies"} fetchUrl={requests.comedy} />
            <MoviesRow title={"romance movies"} fetchUrl={requests.romance} />
        </div>

      </div>
  )
}

export default App;
