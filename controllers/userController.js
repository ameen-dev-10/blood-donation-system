import Users from "../models/User";

async function getUsers(req, res) {
  try {
    const users = await Users.find({ role: "DONOR" });
    if (!users.length)
      return res.status(404).send({ message: "User not found" });
    return res.status(200).send({ message: "Data found", data: users });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function createUser(req, res) {
  // const location = JSON.parse(req.body.location);
  const payload = { ...req.body };

  try {
    if (!payload.location)
      return res.status(400).send({ message: "Invalid name" });
    Users.create(payload, (err, data) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error creating user", error: err });
      return res
        .status(200)
        .send({ message: "User Created Successfully", data });
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}
async function updateUser(req, res) {
  // const location = JSON.parse(req.body.location);
  const payload = { ...req.body };

  try {
    if (!payload._id) return res.status(400).send({ message: "Invalid user" });
    const updatedUser = await Users.findByIdAndUpdate(
      payload._id,
      { $set: { role: "DONOR" } },
      { new: true }
    );
    if (!updatedUser) return res.status(404).send({ message: "Invalid Id" });
    return res
      .status(200)
      .send({ message: "Data Updated successfully", data: updatedUser });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function userLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await Users.findOneAndUpdate(
      { email, password },
      { $set: { isLogin: true } },
      { new: true }
    );
    if (!user) return res.status(404).send({ message: "Invalid credentials" });
    return res
      .status(200)
      .send({ message: "User is logged in Successfully", data: user });
  } catch (e) {
    return res.status(500).send({ message: "Internal  Server Error" });
  }
}
async function userLogout(req, res) {
  const { email } = req.body;

  try {
    const user = await Users.findOneAndUpdate(
      { email },
      { $set: { isLogin: false } }
    );
    if (!user) return res.status(404).send({ message: "Invalid credentials" });
    return res.status(200).send({ message: "User is logged out Successfully" });
  } catch (e) {
    return res.status(500).send({ message: "Internal  Server Error" });
  }
}

export { getUsers, createUser, updateUser, userLogin, userLogout };
