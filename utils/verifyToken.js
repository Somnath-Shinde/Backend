import jwt from 'jsonwebtoken'

    const verifyToken = (req, res, next) => {
        console.log("Request body:", req.body);
        const authHeader = req.headers.authorization;
      
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ success: false, msg: "Access denied. You're not authorized." });
        }
      
        const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"
        console.log("Extracted token:", token);
      
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
          if (err) {
            return res.status(403).json({ success: false, msg: "Token is invalid." });
          }
      
          req.user = user; // Attach decoded user info to the request
          next();
        });
      };

export const verifyUser=(req,res, next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.body.userID || req.user.role === 'admin')
            {
                console.log(req.user.id);
                console.log(req.body.userID);
            next();
    }else{
        res.status(401)
        .json({success:false, message:"You're not authorize to access"})
    }
    });
}

// export const verifyUser =(req,res,next)=>{
//     verifyToken(req,res,next,()=>{
//         if(req.user.id === req.params.id || req.user.role ==='admin'){
//             next()
//         }else{
//           return  res.status(401).json({success:false,msg:"you're not authenticated"}) 
//         }
//     })
// }

export const verifyAdmin =(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if( req.user.role ==='admin'){
            next()
        }else{
          return  res.status(401).json({success:false,msg:"you're not authorize"}) 
        }
    })
}