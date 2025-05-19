import { BACKEND_URL } from '@/config';
import axios from 'axios'
type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number
}
export default async function initDraw(canvas: HTMLCanvasElement,roomId:string,socket:WebSocket) {
    let existingShape: Shape[] = await getExistingShapes(roomId);
    const ctx = canvas.getContext("2d");
    if (!ctx) return
    socket.onmessage = (event)=>{
        const message = JSON.parse(event.data)

        if(message.type === "chat"){
            existingShape.push(JSON.parse(message.message))
            clearCanvas(existingShape,ctx,canvas)
        }
    }
    ctx.fillStyle = "rgb(0,0,0)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    clearCanvas(existingShape,ctx,canvas);
    let clicked = false;
    let startX = 0;
    let startY = 0;

    // snapshot of particular point when user first move the mouse down
    canvas.addEventListener('mousedown', (e) => {
        clicked = true;
        startX = e.offsetX;
        startY = e.offsetY;

    })
    // snapshot of particular point when user mode the mouse up
    canvas.addEventListener('mouseup', (e) => {
        clicked = false;
        let width = e.offsetX - startX;
        let height = e.offsetY - startY;
        const shape:Shape = {
            type: "rect",
            x: startX,
            y: startY,
            width,
            height
        }
        existingShape.push(shape);
        socket.send(JSON.stringify({
            type:"chat", 
            roomId:roomId,
            message:JSON.stringify({shape})
        }))

    })
    canvas.addEventListener('mousemove', (e) => {
        if (clicked) {
            let width = e.offsetX - startX;
            let height = e.offsetY - startY;
            clearCanvas(existingShape, ctx, canvas);
            ctx.strokeStyle = "rgb(255,255,255)"
            ctx.strokeRect(startX, startY, width, height);

        }
    })

}
function clearCanvas(existingShape: Shape[], ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0,0,0)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    existingShape.map((shape) => {
        if (shape.type === "rect") {
            ctx.strokeStyle = "rgb(255,255,255)"
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    })

}

async function getExistingShapes(roomId:string){
    const res = await axios.get(`${BACKEND_URL}/chats/${roomId}`,{
        headers:{
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3OWEwMzJmOS1hMzcxLTRhZDAtYjIzNi1hODI0MzkyOGZhNmMiLCJpYXQiOjE3NDc1OTkxNzh9.p4KkZj0SdZfWo4w71tziwSTe82Wiqw7iArcueEMwN8A"
        }

    });
    console.log(res)
    const data = res.data.chats;

    const shapes = data.map((x:{message:string})=>{
        const messageData = JSON.parse(x.message);
        return messageData.shape;
    })
    return shapes;
}