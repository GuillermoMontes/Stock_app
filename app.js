import express from "express"
import config from "./config.js";
import cors from "cors"
import stockRoutes from "./routes/stock.routes.js"

const app = express();

app.set("port",config.port)

const corsOptions = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(stockRoutes)

app.get("/", (req, res) => {
  res.send("API Backend está en línea");
});

export default app;