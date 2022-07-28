import mongoose from "mongoose";

const env = {
  MONGO_URI: `mongodb+srv://ameenilyas786:$F-59MrcUQ-78g5@cluster0.wzmng.mongodb.net/?retryWrites=true&w=majority`,
};

const connection = {};

async function dbConnect() {
  console.log("I Ran");
  if (connection?.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URI || env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db?.connections[0]?.readyState;

  console.log({ connection });
}

export default dbConnect;
