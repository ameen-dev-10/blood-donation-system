function getBloodGroups(bloodGroup) {
  //   const bloodGroups = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

  let donorsGroup = [];
  switch (bloodGroup) {
    case "O-":
      donorsGroup = ["O-"];
      break;
    case "O+":
      donorsGroup = ["O-", "O+"];
      break;
    case "A-":
      donorsGroup = ["O-", "A-"];
      break;
    case "B-":
      donorsGroup = ["O-", "B-"];
      break;
    case "A+":
      donorsGroup = ["O-", "O+", "A-", "A+"];
      break;
    case "B+":
      donorsGroup = ["O-", "O+", "B-", "B+"];
      break;
    case "AB-":
      donorsGroup = ["O-", "A-", "B-", "AB-"];
      break;
    case "AB+":
      donorsGroup = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];
      break;
  }

  return donorsGroup;
}

export { getBloodGroups };
