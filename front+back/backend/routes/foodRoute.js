import express from "express"
import {addFood,listFood,removeFood} from "../controllers/foodControllers.js"
import multer from "multer"

//crée les méthods
const foodRouter =express.Router();

//image storage engin 
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);

export default foodRouter;
