import { SECRET_KEY } from "../config.js";
import jwt from "jsonwebtoken";

export const authUserLogin = async (req, res, next) => {
  console.log(req?.url);
  if(req?.url === "/logout" || req?.url === "/checkSession"){
    next();
    return;
  }
  const { cookie_token } = req.cookies;
  if (cookie_token) {
    try{
      const verified = jwt.verify(cookie_token, SECRET_KEY);
      if(verified){
        res.json({message: "Usuario ya está logueado", status: 400});
      }else{
        res.json({message: "Usuario no está logueado", status: 400});
      }
    }catch(e){
      console.log(e);
      res.status(401).json({message: "No autorizado", status: 401});
    }
  } else {
    next();
  }
};

export const userCanAccess = async (req, res, next) => {
  const { cookie_token } = req.cookies;
  if (cookie_token) {
    try{
      const verified = jwt.verify(cookie_token, SECRET_KEY);
      if(verified){
        next();
      }else{
        res.redirect("/");
      }
    }catch(e){
      console.log(e);
      res.status(401).json({message: "No autorizado", status: 401});
    }
  } else {
    res.redirect("/");
  }
}
