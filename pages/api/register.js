import dbConnect from "../../utils/dbConnect";
import { createUser, updateUser } from "../../controllers/userController";

dbConnect();
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      await createUser(req, res);
      break;
    case "PUT":
      await updateUser(req, res);
      break;

    default:
      return res.status(405).send({ message: "This request is not allowed" });
  }
}
