import React,{useState,useEffect} from 'react'

function Header() {

  const [darkBg,setDarkBg]= useState()


    useEffect(()=>{
      window.addEventListener("scroll", ()=>{
         window.scrollY>100 ? setDarkBg(true) : setDarkBg(false)
      })
       return ()=> window.removeEventListener("scroll", ()=>{})
    },[])


 return (
   <div className={`header fixed top-0 w-full h-20 flex items-center justify-between bg-gray-900 ${darkBg?'bg-opacity-100':'bg-opacity-20'} px-6 sm:px-12 z-30 shadow-md`}>
       <div>
          <img src="/images/logo.svg" className="w-24 sm:w-32 " alt="logo"/>
       </div>

      <div className="">
          <img src="https://pbs.twimg.com/media/DlKNEufWsAAgr2E.jpg" className="w-12 sm:w-16" alt="logo"/>
       </div>
       
   </div>
  
 )
}

export default Header
