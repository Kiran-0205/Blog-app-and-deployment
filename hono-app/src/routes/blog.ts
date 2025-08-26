import { Hono } from "hono";
import { getPrisma } from "../prismaFunction";
import { verify } from "hono/jwt";

const bolgRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()

bolgRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || ""
    try{
        const user = await verify(authHeader, c.env.JWT_SECRET) as { id: string }
        //check this type fix later
        if(user?.id){
            c.set("userId", user.id);
            await next();
        }else{
            return c.json({ error: "Unauthorized" }, 401)
        }
    }catch(err){
        return c.json({ error: "Invalid or expired token" }, 401);
    }
})

bolgRouter.post('/', async (c) => {
    const body = await c.req.json();
    const prisma = getPrisma(c.env.DATABASE_URL)
    const authorId = c.get("userId")
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)  //need to replace
        }
    })

    return c.json({
        id: blog.id
    })
})

bolgRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = getPrisma(c.env.DATABASE_URL)
    

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id
    })
})

// add pagination

bolgRouter.get('/bulk', async (c) => {

    const prisma = getPrisma(c.env.DATABASE_URL)
    const blogs = await prisma.blog.findMany()

    return c.json({
        blogs
    })
})

bolgRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = getPrisma(c.env.DATABASE_URL)

    try {
      const blog = await prisma.blog.findFirst({
        where: {
          id: Number(id),
        },
      });
      return c.json({
        blog,
      });
    } catch (err) {
      c.status(401) //status code
      return c.text("Error fetching blog");
    }

// sending valid error codes
})





export default bolgRouter