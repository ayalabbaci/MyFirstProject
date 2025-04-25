import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const LoginPopop = ({ setShowLogin }) => {
  const { url, setToken, setName } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let endpoint = "";
    if (currState === "Login") {
      endpoint = "/api/user/login";
    } else {
      endpoint = "/api/user/register";
    }
    
    const apiUrl = url.endsWith('/') ? `${url}${endpoint.substring(1)}` : `${url}${endpoint}`;
    
    try {
      const response = await axios.post(apiUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        
        // استخدام اسم من الاستجابة إذا كان موجودًا
        let displayName = response.data.name || "user"; // إذا كان اسم المستخدم غير موجود، استخدم "user"

        // في حالة التسجيل الجديد، استخدم الاسم المدخل من قبل المستخدم
        if (currState === "Sign Up" && data.name) {
          displayName = data.name;
        }

        localStorage.setItem("name", displayName);
        if (setName) {
          setName(displayName);
        }
        
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login/signup:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className='loginpopop z-1 w-full h-full bg-[#00000090] absolute grid'>
      <form onSubmit={onLogin} className="loginpopopcontainer place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-[25px] px-[30px] py-[25px] rounded-[8px] text-[14px] animate-fadeIn">
        <div className="loginpopoptitle flex justify-between items-center text-gray-950 text-2xl font-bold">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)}
            className='w-4 cursor-pointer ' src={assets.cross_icon} alt="" />
        </div>
        <div className='login-popop-input flex flex-col gap-5'>
          {currState === "Login" ? null : (
            <input
              className='outline-none border-1 border-gray-300 p-2.5 rounded-sm'
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder='Enter your name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            className='outline-none border-1 border-gray-300 p-2.5 rounded-sm'
            type="email"
            placeholder='Enter your email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            className='outline-none border-1 border-gray-300 p-2.5 rounded-sm'
            type="password"
            placeholder='Enter your password'
            required
          />
        </div>
        <button type='submit' className='border-none p-2.5 rounded-sm text-white bg-red-400 text-base cursor-pointer '>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popop-condition flex items-start gap-2 -mt-4">
          <input className='mt-1.5' type="checkbox" required />
          <p> I agree to the terms and conditions</p>
        </div>
        {currState === "Login" ? 
          <p>Create a New Account? <span className='text-red-400 font-medium cursor-pointer' onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
          :
          <p>Already Have An Account? <span className='text-red-400 font-medium cursor-pointer' onClick={() => setCurrState("Login")}>Login Here</span></p>
        }
      </form>
    </div>
  );
}

export default LoginPopop;
