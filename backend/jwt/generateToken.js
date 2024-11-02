import jwt from 'jsonwebtoken'
const createTokenAndSaveCookie=(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_TOKEN,{
        expiresIn:'90d'
    })
    // Set the token as a cookie in the response
    res.cookie("jwt",token,{
        httpOnly:true, // Helps mitigate XSS attacks
        secure:true, // Ensures the cookie is sent over HTTPS
        sameSite:"strict" // Helps prevent CSRF attacks
    })
}

export default createTokenAndSaveCookie;