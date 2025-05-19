import initDraw from "@/draw";
import { useEffect, useRef, useState } from "react";

export function Canvas({roomId,socket}:{roomId:string,socket:WebSocket}){
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [err,setErr] = useState<any>(null)
    useEffect(()=>{
        try{

            if(canvasRef.current){
                const canvas = canvasRef.current;
                initDraw(canvas,roomId,socket);
            }
        }
        catch(err){
            setErr(err)
        }
    },[canvasRef])
        if(err != null) return <div>{err}</div>
      return <>
     <canvas className=" cursor-pointer" ref={canvasRef} width={2000} height={2000}></canvas>
        <div className="fixed left-0 top-0 ">
            <div className="bg-white">Rectangle</div>
            <div className="bg-white">Circle</div>
        </div>
    </>
}