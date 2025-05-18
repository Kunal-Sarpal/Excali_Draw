"use client"

import { useEffect, useRef } from "react"
import { start } from "repl";

export default function Canvas(){
    const canvasref = useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
        if(canvasref.current){
            const canvas = canvasref.current;
            const ctx = canvas.getContext("2d");
            if(!ctx) return
            ctx.fillStyle = "rgb(0,0,0)"
            ctx?.fillRect(0,0,canvas.width,canvas.height)
            
            // ctx?.strokeRect(10,10,100,100);
            
            let clicked = false;
            let startX = 0;
            let startY = 0;
            
            // snapshot of particular point when user first move the mouse down
            canvas.addEventListener('mousedown',(e)=>{
                clicked = true;
                startX = e.clientX;
                startY = e.clientY;
                
            })
            // snapshot of particular point when user mode the mouse up
            canvas.addEventListener('mouseup',(e)=>{
                clicked = false;
                
            })
            canvas.addEventListener('mousemove',(e)=>{
                if(clicked){
                    let width = e.clientX - startX;
                    let height = e.clientY - startY;
                    ctx?.clearRect(0,0,canvas.width,canvas.height);
                    ctx.fillStyle = "rgb(0,0,0)"
                    ctx?.fillRect(0,0,canvas.width,canvas.height)
                    ctx.strokeStyle = "rgb(255,255,255)"
                    ctx?.strokeRect(startX,startY,width,height);

                }
            })
        }
    },[canvasref])
    return <>
    <canvas ref={canvasref} width={2000} height={2000}></canvas>
    </> 
}