const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });

    if (adminExists) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: 'Admin@12345', // Change this in production!
      role: 'admin',
      isActive: true,
    });

    await adminUser.save();
    console.log('✅ Admin account created successfully');
    console.log('📝 Email: admin@example.com');
    console.log('🔑 Password: Admin@12345');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  }
};

// Connect and seed
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('📦 Connected to MongoDB for seeding...');
    await seedDatabase();
    mongoose.disconnect();
    console.log('✅ Seeding complete');
  })
  .catch(error => {
    console.error('❌ Connection error:', error.message);
    process.exit(1);
  });
