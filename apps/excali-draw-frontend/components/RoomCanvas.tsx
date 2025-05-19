"use client"

import { WS_BACKEDN } from "@/config"
import initDraw from "@/draw"
import { RedirectType } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Canvas } from "./Canvas"

export function RoomCanvas({roomId}:{roomId:string}
){
    const [socket,setSocket] = useState<WebSocket | null>(null)
    const [err,setErr] = useState<any>(null);
    useEffect(()=>{
        try{
            const ws = new WebSocket(`${WS_BACKEDN}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3OWEwMzJmOS1hMzcxLTRhZDAtYjIzNi1hODI0MzkyOGZhNmMiLCJpYXQiOjE3NDc1OTkxNzh9.p4KkZj0SdZfWo4w71tziwSTe82Wiqw7iArcueEMwN8A`);
            ws.onopen = ()=>{
                setSocket(ws);
                ws.send(JSON.stringify({
                    type:"join_room",
                    roomId:roomId
                }))
            }

        }
        catch(err){
            setErr(err)
        }
    })
   

    if(!socket || err != null){
        return   <div className="w-screen h-screen justify-center items-center flex gap-3">
            <span className=" ml-3 animate-spin ease-in-out border-1 w-4 h-4 border rounded-full border-b-white"></span>
            <div>Loading ..</div>
        </div>
      
    }
    return <>
       <Canvas roomId={roomId} socket={socket}/>
    </>
}