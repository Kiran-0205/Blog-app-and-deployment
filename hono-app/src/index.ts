import { Hono } from 'hono'
import { getPrisma } from './prismaFunction'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

app.post('/api/v1/user/signup', async (c) => {
  const body = await c.req.json();

  const prisma = getPrisma(c.env.DATABASE_URL)

  //do the zod validation and hashed password

  try {
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: body.password
         }
        })
        const secret = String(c.env.JWT_SECRET)
        const token = await sign(
          {
            id: user.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 10, // expires in 10 mins
          },
          secret
        );
        return c.json("success!", { user, token });
  }catch(err){
      c.status(411)
      return c.text('Invalid')
  }
  
})

export default app
