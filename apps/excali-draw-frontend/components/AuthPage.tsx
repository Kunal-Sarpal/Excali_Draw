"use client"
const AuthPage = ({isSignin}:{ isSignin: boolean}) => {
 
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-2 m-2 bg-white rounded flex flex-col"> 
        <input type="text" className="text-black p-2 m-2 border" placeholder="Email" />
        <input type="text"  className="text-black p-2 m-2 border" placeholder="Password" typeof="password"  />
        <button className="text-black bg-blue-500 p-2 m-2 duration-105  hover:scale-95" onClick={()=>{
        }}>{isSignin ? "Sign in" : "Sign up"}</button>
      </div>
    </div>
  )
}

export default AuthPage   