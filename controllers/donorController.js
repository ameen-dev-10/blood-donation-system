import Users from "../models/User";
import { getBloodGroups } from "../utils/donorHandler";

async function getDonor(req, res) {
  const { coordinates, bloodGroup } = req.body;
  const bloodGroups = getBloodGroups(bloodGroup); // ruturns an array

  try {
    const donors = await Users.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates },
          $minDistance: 0,
          $maxDistance: 15000,
        },
      },
      isLogin: true,
      role: "DONOR",
      blood_group: { $in: bloodGroups },
    });
    if (!donors.length)
      return res.status(404).send({ message: "User not found" });
    return res.status(200).send({ message: "Data found", data: donors });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export { getDonor };
