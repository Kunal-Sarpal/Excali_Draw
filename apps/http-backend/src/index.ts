import express, { Request, Response } from 'express';
import { middleware } from './middleware';
import { createRoomSchema, createUserSchema, siginSchema } from '@repo/common/types';
import { prisma } from '@repo/db/client'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
const app = express();
const port = process.env.PORT || 3000;



// Middleware to parse JSON request bodies
app.use(express.json());
const host = process.env.HOST || 'localhost';

app.post('/signin', async (req: Request, res: Response): Promise<any> => {

  const result = siginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid data', errors: result.error.errors });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email
    }
  })
  console.log(user);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email' });
  }
  const verify = await bcrypt.compare(req.body.password, user.password);
  if (!verify) {
    return res.status(401).json({ message: 'Invalid password' });
  }
  const token = jwt.sign({
    userId:user?.id
  },JWT_SECRET)
  return res.status(200).json({ message: 'User signed in successfully', token: token });
});
app.post('/signup', async (req: Request, res: Response): Promise<any> => {
  const { email, password, name } = req.body;
  const result = createUserSchema.safeParse({ email, password, name });
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid data', errors: result.error.errors });
  }
  const newPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email: email,
      password: newPassword,
      name: name
    }
  })
  return res.status(200).json({ message: 'User created successfully' });

});
app.post('/room', middleware, async (req:Request, res:Response):Promise<any> => {

    const result = createRoomSchema.safeParse(req.body);
    try{
      if(!result.success) {
          return res.status(400).json({ message: 'Invalid data', errors: result.error.errors });
      }
      // @ts-ignore
      const userId = req.userId;
      const room  = await prisma.room.create({
        data: {
          slug: result.data.name,
          adminId: userId,
        }
      })
      return res.status(200).json({ message: 'Room created successfully', room: room });

    }
    catch (error) {
      return res.status(411).json({ message: 'Room already exist with this name.', errors: error });
    }
  

});
app.listen(port, () => {
  console.log(`HTTP server is running at http://${host}:${port}`);
});