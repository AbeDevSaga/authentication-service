const User = require("../models/user");
const Organization = require("../models/organization");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const organization = req.organizationId.toString();
  try {
    const { username, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      organization,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Registration failed", details: error.message });
  }
};

const createOrg = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if organization already exists
    const existingOrg = await Organization.findOne({ name });
    if (existingOrg)
      return res.status(400).json({ error: "Organization name already exists" });

    // Create new organization
    const newOrg = new Organization({
      name,
    });
    await newOrg.save();
    res.status(201).json({
      message: "Organization created successfully",
      organization: newOrg,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create organization", details: error.message });
  }
};

const getAllOrganizations = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get services', error });
    }
};

// Get a single service by ID
const getOrganizationById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get service', error });
    }
};


module.exports = {
    createUser,
    createOrg,
    getAllOrganizations,
    getOrganizationById
  };
  