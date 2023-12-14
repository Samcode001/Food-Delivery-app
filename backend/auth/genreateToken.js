const jwt=require("jsonwebtoken");
const SECRET="Helloimsamnicetomeetyou"

const generateToken=(id)=>{
       try {
        // console.log(id)
             const token= jwt.sign({id:id},SECRET,{expiresIn:"4h"});
             return token;
       } catch (error) {
            console.log(`"Error in Token Generation" : ${error}`);
       }
}

module.exports=generateToken