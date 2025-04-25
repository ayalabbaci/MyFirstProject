import React from 'react'
import { assets } from '../assets/assets'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer mt-15 text-amber-50 bg-black flex flex-col items-center gap-[20px] mx-8 px-[8vw] pt-[80px] pb-[80px]' id='footer'>
      <div className="footer-content w-full grid grid-cols-[2fr_1fr_1fr] gap-20">
        <div className="footer-content-left flex flex-col items-start gap-5">
<p className=' font-bold text-amber-600 text-5xl '>
    Pizza With Me</p>
            <p className='text-[clamp(16px,2vw,24px)] font-bold'>Pizza Delivery The best with us</p>
            <div className='footer-socials flex gap-4 mt-4 '>
                <img src={assets.facebook} alt="facebook" className='w-8 h-8 cursor-pointer' />
                <img src={assets.instagram} alt="instagram" className='w-8 h-8 cursor-pointer' />
                <img src={assets.twitter} alt="twitter" className='w-8 h-8 cursor-pointer' />
            </div>
        </div>
        <div className="footer-content-center flex flex-col items-start gap-5 cursor-pointer">
          <h2 >COMPANY</h2> 
            <ul className='footer-list'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privecy policy</li> </ul>
        </div>
        <div className="footer-content-right flex flex-col items-start gap-5 cursor-pointer">
         <h2>GET IN TOUCH</h2>  
            <ul className=''>
                <li>+21358269856</li>
                <li>pizzawithme@gmail.com</li>
               </ul> 
        </div>
      </div>
      <hr className='w-full f-0.5 bg-gray-400 hidden'/>
      <p className='footer-copyright text-center text-gray-500 text-sm mt-4'>© 2025 Pizza Delivery. All rights reserved.</p>
    </div>
  )
}

export default Footer
