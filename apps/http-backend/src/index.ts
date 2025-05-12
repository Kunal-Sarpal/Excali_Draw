import express, { Request, Response } from 'express';
import {middleware}  from './middleware';
import { createUserSchema } from '@repo/common/types';
import {prisma} from '@repo/db/client'
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
const host = process.env.HOST || 'localhost';

app.post('/signin', (req, res) => {
  res.send('Hello World!');   
});
app.post('/signup', async (req: Request, res: Response):Promise<any> => {
    const {email, password, name} = req.body;
    const result = createUserSchema.safeParse({email, password, name});
    if (!result.success) {
        return res.status(400).json({ message: 'Invalid data', errors: result.error.errors });
    }
    const ans = await prisma.user.findUnique({
      where:{
        email: email
      }
    })
    if(ans){
      return res.status(400).json({ message: 'User already exists' });
    }
    await prisma.user.create({
      data:{
        email: email,
        password: password,
        name: name
      }
    })
    return res.status(200).json({ message: 'User created successfully' });

});
app.post('/room', middleware, (req, res) => {
    

});
app.listen(port,() => {
  console.log(`HTTP server is running at http://${host}:${port}`);
});