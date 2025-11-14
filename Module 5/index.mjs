import express from "express";
import cors from "cors";
import path from "path";
import passport from "passport";
import { fileURLToPath } from "url";
import session from "express-session";
import "./Stratery/local-stratergy.mjs";
import mongoose from "mongoose";
import router from "./Routes/Routes.mjs";
import MongoStore from "connect-mongo";
const app = express();


mongoose.connect("mongodb://localhost:27017/FitMate")
    .then(console.log("MongoDB connected"))
    .catch((err)=>{console.error(err)})

const __filename = fileURLToPath(import.meta.url);    
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(session({
    secret:"Atul",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000*60*60*24 },
    store: MongoStore.create({ client: mongoose.connection.getClient() })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/matchuploads', express.static(path.join(__dirname, "matchuploads"), {
  fallthrough: true
}));
app.use('/uploads', express.static(path.join(__dirname, "uploads")));


app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({   
      message: `Invalid JSON`
    });
  }
  next();
});

app.use(router);

app.get("/",(req,res)=>{
    res.send("hello");
})


const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server runninng on http://localhost:${PORT}`)
})