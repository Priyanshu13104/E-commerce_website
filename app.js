import { express } from "express";
import { mongoose } from "mongoose";
import { path } from "path";
import { dotenv } from "dotenv";

// laod environment variables
dotenv.config()

// mongodb connection

const connectDB = async ()=> {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`mongodb connected : ${conn.connection.host}`);
    } catch (error) {
        console.error(`error : ${error.message}`);
        process.exit(1);
    }
};
connectDB();
// const port = 3030
// const mongo_url = "mongodb://localhost:27017"

// initialise express
const app = express()

//set ejs as the template engine
app.set('view engine', 'ejs');

//middleware
app.use(express.json())
app.use(express.urlencodded({ extended : true }));