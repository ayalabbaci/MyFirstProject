import React from 'react'
import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div className='app-download flex flex-col items-center justify-center text-center m-10 text-5xl  py-10  cursor-pointer' id='app-download'>
      <p>For Better Experience Download<br/> Pizza app</p>
        <div className='mt-10 flex gap-5'>
           < img src={assets.play_store} alt='playstore' className='w-40 h-12 cursor-pointer'/>
            <img src={assets.app_store} alt='appstore' className='w-40 h-12 cursor-pointer'/>
        </div>
    </div>
  )
}

export default AppDownload
