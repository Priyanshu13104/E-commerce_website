import { express } from "express";
import { mongoose } from "mongoose";
import { path } from "path";
import { dotenv } from "dotenv";
import cors from "cors";

// laod environment variables
dotenv.config()

// mongodb connection

// const connectDB = async ()=> {
//     try{
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log(`mongodb connected : ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`error : ${error.message}`);
//         process.exit(1);
//     }
// };
// connectDB();
// const port = 3030
// const mongo_url = "mongodb://localhost:27017"

const url = "mongodb://127.0.0.1:27017/stepswap";
const port = 3030;

mongoose
  .connect(url)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

// initialise express
const app = express()

//set ejs as the template engine
app.set('view engine', 'ejs');

//middleware
app.use(express.json())
app.use(express.urlencodded({ extended : true }));
app.use(cors());

// Set static folder for CSS
app.use(express.static(path.join(__dirname, 'public')));

// import routes
import authroutes from "./routes/auth.js"
// import productroutes from "./routes/product.js"
// import cartroutes from "./routes/cart.js"
// import adminroutes from "./routes/admin.js"
import homeroutes from "./routes/home.js"

// mount routes
app.use('/', homeroutes)
app.use('/auth', authroutes)
// app.use('/admin', adminroutes)
// app.use('/proudcts', productroutes)
// app.use('/cart', cartroutes)

// server start
// const port = process.env.PORT || 3030
app.listen(port, ()=>{
    console.log(`server running on ${port}`)
})