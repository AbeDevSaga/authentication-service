const User = require("../models/user");
const Organization = require("../models/organization");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  console.log("createUser");
  try {
    const { username, email, password, role, organization, phone } = req.body;

    const orgId = organization || req.organizationId || req.params.organizationId;
    if (!orgId) {
      return res.status(400).json({ error: "Organization ID is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      phone,
      organization: orgId.toString(),
    });

    await user.save();
  
    if(orgId) {
      const orgDoc = await Organization.findById(orgId);
      console.log("org: ", orgDoc);
      if(role === "Super Admin"){
        orgDoc.superAdmin = user._id;
      }else {
        orgDoc.users.push(user._id);
      }

      await orgDoc.save();
    }
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Registration failed", details: error.message });
  }
};


const updateUser = async (req, res) => {
  console.log("updateUser");
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      message: "User updated successfully",
      User: updateUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update User", error });
  }
};

const deleteUser = async (req, res) => {
  console.log("deleteUser");
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const orgId = user.organization;

    // Remove user from organization
    if (orgId) {

      const org = await Organization.findById(orgId);
      if (org) {
        if (org.superAdmin?.toString() === id) {
          org.superAdmin = null;
        }
        org.users.pull(id);
        await org.save();
      }
    }

    // Delete user
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete User", error });
  }
};


const getAllUsers = async (req, res) => {
  console.log("getAllUsers");
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get users", error });
  }
};

const getUserById = async (req, res) => {
  console.log("getUserById");
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get User", error });
  }
};

const getUsersByOrganizationId = async (req, res) => {
  console.log("getUsersByOrganizationId");
  try {
    const { id } = req.params;
    const users = await User.find({ organization: id });
    if (!users) return res.status(404).json({ message: "User not found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get User", error });
  }
};

const getPremiumUsers = async (req, res) => {
  console.log("get premium");
  try {
    const premiumUsers = await User.find({ isPremium: true });
    if (!premiumUsers)
      return res.status(404).json({ message: "Premium Users not found" });
    res.status(200).json(premiumUsers);
  } catch (error) {
    res.status(500).json({ message: "Failed to get Premium Users", error });
  }
};

const addProjectToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: "projectId is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if project already exists
    if (user.projects.includes(projectId)) {
      return res.status(400).json({ message: "Project already added to user" });
    }

    user.projects.push(projectId);
    await user.save();

    res.status(200).json({
      message: "Project added to user successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add project to user", error });
  }
};

const removeProjectFromUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: "projectId is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.projects.indexOf(projectId);
    if (index === -1) {
      return res.status(404).json({ message: "Project not associated with this user" });
    }

    user.projects.splice(index, 1);
    await user.save();

    res.status(200).json({
      message: "Project removed from user successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove project from user", error });
  }
};



module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUsersByOrganizationId,
  getPremiumUsers,
  addProjectToUser,
  removeProjectFromUser
};
