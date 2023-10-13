import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash, FaS } from "react-icons/fa6";
import { useCallback, useRef, useState } from "react";
import clsx from "clsx";

function App() {
  const prevInfo = JSON.parse(localStorage.getItem('info'))
  
  const [isSubmit,setIsSubmit]=useState(false);
  const [toggleEyes,setToggleEyes]=useState('hidden')
  const [isWarning,setIsWarning]=useState(false)
  const [name,setName]=useState(prevInfo?.name||'')
  const [password,setPassword]=useState(prevInfo?.password||'')

  const toggleEyesHanlder=()=>{
    if(toggleEyes==='hidden'){
      setToggleEyes('show')
    }else{
      setToggleEyes('hidden')
    }
  }

  const submitHandler=(e)=>{
    e.preventDefault()

    if(name.trim()===''||password===''){
      setIsWarning(true);
      setIsSubmit(false)
      alert("This 2 fields is required")
    }else{
      setIsWarning(false);
      setIsSubmit(true);
      alert(`Xin chao: ${name}`)
      localStorage.setItem('info',JSON.stringify({'name':name,'password':password}))
      setName('');
      setPassword('');
    }
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-[500px] md:w-[600px]">
          <div className="py-8 px-3 border-2 border-black">
            <form className="flex flex-col gap-y-5" onSubmit={submitHandler}>
              <div className="flex items-center">
                <div className="mr-6 min-w-[125px]">
                  <label htmlFor="username">
                    Tên đăng nhập
                  </label>
                </div>
                <div className={clsx(`border flex-1 mr-2`,
                  isWarning&& !name?'border-rose-500':''
                )}>
                  <input 
                   className="outline-none px-2 py-1" 
                   value={name}
                   type="text" id="username" placeholder="Nhập 6-20 ký tự"
                   onChange={(e)=>setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-6 min-w-[125px]">
                  <label htmlFor="password">
                    Mật khẩu
                  </label>
                </div>
                <div className={clsx(`border flex-1 mr-2`,
                  isWarning&& !password?'border-rose-500':''
                )}>
                  <div className="flex">
                    <input className="outline-none px-2 py-1 w-full" value={password}
                      type={toggleEyes==='hidden'?"password":"text"} id="password" placeholder="Mật khẩu"
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                    <span className="flex items-center justify-center mr-3 cursor-pointer"
                      onClick={toggleEyesHanlder}
                    >
                      {toggleEyes==='hidden'?(<IoEyeSharp size={20}/>)
                      :(<FaEyeSlash size={20}/>)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="mr-6 min-w-[125px]"/>
                <button 
                  className={clsx(
                    `py-2 px-4 border rounded`,
                    !(isSubmit||(!name&!password)) ? "border-primaryButton bg-primaryButton text-white cursor-pointer":"bg-[#e9e1e1] opacity-70" 
                  )}
                  type="submit"
                  disabled={isSubmit||(!name&!password)}
                >
                    Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
