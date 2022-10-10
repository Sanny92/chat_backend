const express = require('express');
const authRouter = require('./authRouter');
const conn = require('./config');
const PORT = 5000;
const app = express();

app.use(express.json());
app.use("/auth",authRouter)


const start = async () => {
     try{
        // await conn.connect(err => {
        //     if(err){
        //         console.log("----Ошибка---- " + err);
        //         console.log(err);
        //         return err;
        //     } else {
        //         console.log("----Connect DB is OK!----")
        //     }
        // })

app.listen(PORT, ()=>console.log("Server start on: http://"+ "localhost" + ':' + PORT + '/'  ))
    }
    catch (e) {
        console.log (e)
    }
}


start()