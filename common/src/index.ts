import z from "zod";

/*sign up*/
export const signupInput = z.object({
    username: z.string().min(6),
    password: z.string().min(6),
    name: z.string().optional()
})

/*sign in*/
export const signinInput = z.object({
    username: z.string().min(6),
    password: z.string().min(6),
    name: z.string().optional()
})

/*create Blog*/
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

/*update Blog*/
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number(),
})

export type SignupInput = z.infer<typeof signupInput>   
export type SigninInput = z.infer<typeof signinInput>    
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>    