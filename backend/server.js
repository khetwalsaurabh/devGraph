import dotenv from "dotenv";
dotenv.config();
import express from "express";
import driver from "./db/db.js"
import router from "./router/router.js"
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router)

const port = process.env.PORT

const testConnection = async () => {
    const session = driver.session();

    try {
        const result = await session.run("RETURN 'CognoDB Connected!' AS message");

        console.log(result.records[0].get("message"));
    } catch (error) {
        console.error("CognoDB connection failed:", error.message);
    } finally {
        await session.close();
    }
};

testConnection();

// app.listen(port,()=>{
//     console.log(`Server is running on port ${port}`);
    
// })

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});


