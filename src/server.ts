import { serverHttp } from './app'

// Dotenv all variables
const PORT = process.env.PORT

serverHttp.listen(PORT, () => { 
    console.log(`🚀 Server is running on PORT:${PORT}`)
})