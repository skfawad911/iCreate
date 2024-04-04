const { User, UsageModel } = require("../models/userModel");
const adminModel = require("../models/adminmodel");
const bcrypt = require("bcrypt");

const userRegistration = async (req, res) => {
  try {
    const {
      MRID,
      USERNAME,
      PASSWORD,
      EMAIL,
      ROLE,
      HQ,
      REGION,
      BUSINESSUNIT,
      DOJ,
    } = req.body;

    // Find the admin by ID or some unique identifier
    const AdminId = req.params.AdminId;
    console.log(AdminId);
    console.log("req.params:", req.params);

    const admin = await adminModel.findOne({ AdminId: AdminId });
    console.log(admin);

    if (!admin) {
      return res.status(400).json({ msg: "Admin not found" });
    }

    // Check if the username is already taken
    const user = await User.findOne({ USERNAME: USERNAME });
    if (user) {
      return res.status(400).json({ msg: "Username is taken" });
    }

    // Create a new MR
    const userToSave = await new User({
      MRID,
      USERNAME,
      PASSWORD,
      EMAIL,
      ROLE,
      HQ,
      REGION,
      BUSINESSUNIT,
      DOJ,
    }).save();

    // Add the created MR to the admin's Mrs array
    admin.Mrs.push(userToSave._id);
    await admin.save();

    console.log(userToSave);

    return res.status(200).json({
      msg: "User created and linked to admin",
      userToSave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { MRID, PASSWORD } = req.body;
    const user = await User.findOne({ MRID: MRID });

    if (user) {
      // Check the password (you may want to compare the hashed password)
      const isPasswordValid = PASSWORD === user.PASSWORD;
      console.log(PASSWORD, user.PASSWORD);

      if (isPasswordValid) {
        // User exists, increment login count
        user.loginLogs.push({
          timestamp: new Date(),
          cnt: user.loginLogs.length + 1,
        });

        // Save the updated user document
        await user.save();

        return res.status(200).json({
          msg: "Login Successful",
          success: true,
          user,
        });
      } else {
        return res.status(401).json({
          msg: "Incorrect Password",
          success: false,
        });
      }
    } else {
      return res.status(200).json({
        msg: "Login Successful",
        success: true,
        newUser,
      });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    const errorMessage = error.message;
    return res.status(500).json({
      msg: "Internal Server Error",
      success: false,
      errorMessage,
    });
  }
};
/*
const submitController = async (req, res) => {
  try {
    console.log("UpComing Data :", req.body);
    const { type, doctorName, videoname, fileName, processTime } = req.body;
    const mrId = req.params.id;

    //Check the MR is present or not...
    const existMr = await User.findById(mrId).populate("cardCategories");

    if (!existMr) {
      res.status(404).send({ message: "Mr not found..!!!", success: false });
    }

    //Check the doctor name is presen or not...
    if (!doctorName) {
      res
        .status(404)
        .send({ message: "Doctor Name not found..!!!", success: false });
    }

    //Format Data before store...
    const formatedData = {
      type: type,
      doctorName: doctorName,
      videoname: videoname,
      fileName: fileName,
      processTime: processTime,
    };

    //Store the database in server....
    const newUsage = new UsageModel(formatedData);
    const saveUsage = await newUsage.save();

    //After save push in userSchema Also...
    existMr.cardCategories.push(saveUsage);
    await existMr.save();

    res
      .status(201)
      .send({ message: "Usage successfully tracked.....", success: true });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Failed to track the Usage..!!!", success: false });
  }
};
// ends here
*/

const submitController = async (req, res) => {
  try {
    console.log("UpComing Data :", req.body);
    const { type, doctorName, videoname, fileName, processTime, MRID } =
      req.body;
    //   const mrId = req.params.id;

    //Check the MR is present or not...
    const existMr = await User.findOne({ MRID: MRID }).populate(
      "cardCategories"
    );
    if (!existMr) {
      return res
        .status(404)
        .send({ message: "Mr not found..!!!", success: false });
    }

    // Check if the doctor name is present or not...
    if (!doctorName) {
      return res
        .status(404)
        .send({ message: "Doctor Name not found..!!!", success: false });
    }

    // Format Data before storing...
    const formatedData = {
      type: type,
      doctorName: doctorName,
      videoname: videoname,
      fileName: fileName,
      processTime: processTime,
    };

    // Store the data in the database...
    const newUsage = new UsageModel(formatedData);

    // Run the saving operations in parallel with a limit of 2 (adjust as needed)
    const saveOperations = [
      async () => await newUsage.save(),
      async () => {
        existMr.cardCategories.push(newUsage);
        await existMr.save();
      },
    ];

    await async.parallelLimit(saveOperations, 10);

    res
      .status(201)
      .send({ message: "Usage successfully tracked.....", success: true });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "Failed to track the Usage..!!!", success: false });
  }
};

module.exports = {
  userRegistration,
  userLogin,
  submitController,
};
