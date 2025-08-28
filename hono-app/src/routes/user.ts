import { Hono } from "hono";
import { getPrisma } from "../prismaFunction";
import { decode, sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "common-utils-zod-kiran";

const userRouter = new Hono<{Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }}>()

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body)

  if(!success){
    c.status(411);
    return c.json({
      message: "Enter valid inputs"
    })
  }

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

userRouter.post('/signin', async (c) => {
  const body = await c.req.json();

  const { success } = signinInput.safeParse(body)

  if(!success){
    c.status(411);
    return c.json({
      message: "Enter valid inputs"
    })
  }
  const prisma = getPrisma(c.env.DATABASE_URL)

  //do the zod validation and hashed password

  try {
      const user = await prisma.user.findFirst({
        where: {
          username: body.username,
          password: body.password
         }
        })
        if(!user){
          c.status(403)
          return c.json({
            "message": "Invalid"
          })
        }
        const secret = String(c.env.JWT_SECRET)
        const token = await sign({
          id: user.id,
        },secret )
        return c.text(token);
  }catch(err){
      c.status(411)
      return c.text('Invalid')
  }
  
})

export default userRouter