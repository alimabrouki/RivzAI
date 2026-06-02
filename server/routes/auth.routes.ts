import { Router } from "express";

const authRouter = Router()

authRouter.post('/register', async (req, res) => {
  const {email, password, username} = req.body

  try {
    const user = await prisma
  }
})


export default authRouter