import axios from "axios";


// Receive code(string)
// Restore access_token on github
// Get user infos on GitHub
// Verify if user exist on DB
// ----Yes = generate a token
// ----No = create on DB create token
// Return token and user infos

interface IAccessTokenResponse{
    access_token: string;
}

class AuthenticateUserService{

    async execute(code:string){
        const url = "https://github.com/login/oauth/access_token"

        
        const { data:accessTokenResponse } = await axios.post<IAccessTokenResponse>(url,null,{
            params:{
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers:{
                "Accept":"application/json"
            }
        });

        const response = await axios.get("https://api.github.com/user",{
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        return response.data;

    }

}

export { AuthenticateUserService } 