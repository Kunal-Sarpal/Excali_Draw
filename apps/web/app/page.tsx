"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const [roomId,setRoomId] = useState("");
  const router = useRouter();
  return(
    <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",height:"100vh"}}>
      <input onChange={(e)=>{
          setRoomId(e.target.value);
      }} typeof="text" placeholder="Room Id" />
      <button onClick={()=>router.push("room/"+roomId)} className="p-2">Join</button>
    </div>
  )
}