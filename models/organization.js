const OrganizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    superAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
});

module.exports = mongoose.model('Organization', OrganizationSchema);