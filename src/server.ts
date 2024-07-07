import mongoose from "mongoose";
import app from "./app"
import config from "./app/config"
import { error } from "console";

async function main() {
    await mongoose.connect(config.db_url as string);
    
    app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`)
      })
  
}

main().then(() => console.log("Mongodb is connected successfully!"))
.catch(error => console.log(error));