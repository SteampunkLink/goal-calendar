import app from "./app";
import env from "./util/validateEnv";
import connectDB from "./config/db";

const port = env.PORT;
connectDB();

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
