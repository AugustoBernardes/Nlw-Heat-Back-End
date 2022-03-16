import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageControllet";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController"
import { ensureAuthenticated } from "./middleware/ensureAuthenticated"

const router = Router();


const authenticateUserController = new AuthenticateUserController();
const createMessageController = new CreateMessageController();
const getLast3MessagesController = new GetLast3MessagesController();

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

// Messages
// ======================
router.get("/messages/last3", getLast3MessagesController.handle)
router.post("/messages",ensureAuthenticated,createMessageController.handle)

export { router }