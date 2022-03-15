import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

const router = Router();


const  authenticateUserController = new AuthenticateUserController()

// Login with GitHub
// =====================
router.get("/github", (request,response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

router.get("/signin/callback", (request,response) =>{
    const { code } = request.query

    return response.json(code)
})

// Authenticate
// ======================
router.post("/authenticate",  authenticateUserController.handle)

export { router }