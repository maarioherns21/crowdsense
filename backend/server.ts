import cors from "cors"
import mongoose, {ConnectOptions} from "mongoose"
import express, { Application, request, response} from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"


import routeRestaurants  from "./routes/restaurants"
import routeBars from "./routes/bars"
import routeUser from "./routes/users"



const app : Application = express()
dotenv.config()


app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit:"30mb" , extended: true}))
app.use(cors())




app.use("/api/restaurants", routeRestaurants)
app.use("/api/bars" , routeBars)
app.use("/api/users", routeUser)
// app.use("/uploads",express.static("./uploads"));
app.use('/uploads', express.static('./uploads'));

const PORT = process.env.PORT

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.CONNECTION_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions)
  .then(() => app.listen(PORT, () => {
    console.log(`Express is listening ${PORT}`)
  }))
  .catch((err) => {
    console.log(
      `Initial Distribution API Database connection error occured -`,
      err
    );
  });
