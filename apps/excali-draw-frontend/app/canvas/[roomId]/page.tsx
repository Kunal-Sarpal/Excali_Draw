
import { RoomCanvas } from "@/components/RoomCanvas";
import initDraw from "@/draw";
import { routeModule } from "next/dist/build/templates/pages";
import { useEffect, useRef } from "react"
import { start } from "repl";

export default async function CanvasPage({params}:{
    params:{
        roomId:string
    }
}){
    const id = (await params).roomId
   
    return <RoomCanvas roomId={id}/>
    
}