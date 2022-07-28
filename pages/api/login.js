import dbConnect from "../../utils/dbConnect";
import { userLogin } from "../../controllers/userController";

dbConnect();
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      await userLogin(req, res);
      break;

    default:
      return res.status(405).send({ message: "This request is not allowed" });
  }
}
