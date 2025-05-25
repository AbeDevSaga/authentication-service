const Organization = require("../models/organization");

const createOrganization = async (req, res) => {
  try {
    const { name, description, address, phone, email, website, logo } =
      req.body;

    // Check if organization already exists
    const existingOrg = await Organization.findOne({ name });
    if (existingOrg)
      return res
        .status(400)
        .json({ error: "Organization name already exists" });

    // Create new organization
    const newOrg = new Organization({
      name,
      description,
      address,
      phone,
      email,
      website,
      logo,
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

const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedOrganization = await Organization.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    if (!updatedOrganization)
      return res.status(404).json({ message: "Organization not found" });
    res.status(200).json({
      message: "Organization updated successfully",
      organization: updatedOrganization,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Organization", error });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrganization = await Organization.findByIdAndDelete(id);
    if (!deletedOrganization)
      return res.status(404).json({ message: "Organization not found" });
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Organization", error });
  }
};

const getAllOrganizations = async (req, res) => {
  try {
    const organization = await Organization.find();
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ message: "Failed to get organization", error });
  }
};

const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await Organization.findById(id).populate("superAdmin");
    if (!organization)
      return res.status(404).json({ message: "Organization not found" });
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ message: "Failed to get Organization", error });
  }
};

module.exports = {
  createOrganization,
  updateOrganization,
  deleteOrganization,
  getAllOrganizations,
  getOrganizationById,
};
