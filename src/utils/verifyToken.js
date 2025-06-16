import jwt from 'jsonwebtoken';
import config from 'config';

const secret = config.get('jwtSecret');
const verifyToken = (req,res,next) =>{
const token = req.headers.authorization?.split(" ")[1];
if(!token){
    return res.status(401).json({ error: 'No token provided' });
}
try{
    const decoded =jwt.verify(token,secret);
    req.user = decoded.user;
    next();
}catch(err){
    console.log('Token Verification Error:',err);
    return res.status(401).json({error:'Invalid token'})
}
}

export default verifyToken;