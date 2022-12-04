import express from 'express';
import 'dotenv/config';
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";

// @ts-ignore
import route from "./routes/index";

// @ts-ignore
import db from "./dbConnect/db";

// @ts-ignore
import path from "path";

const app = express();

app.use(bodyParser.json({
    limit: "50mb",
}));

app.use(bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
}));


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// HTTP logger
app.use(morgan('combined'));

// routes
route(app);

// db connect
db.connect();

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})