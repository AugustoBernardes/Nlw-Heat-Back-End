import express from "express";
import dotenv from "dotenv";

dotenv.config()

// Dotenv all variables
const PORT = process.env.PORT

const app = express();


// Login with GitHub
app.get("/github", (request,response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get("/signin/callback", (request,response) =>{
    const { code } = request.query

    return response.json(code)
})

app.listen(PORT, () => { console.log(`Server is running on PORT:${PORT}`)})