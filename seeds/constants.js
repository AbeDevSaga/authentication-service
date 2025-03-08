const { faker } = require("@faker-js/faker"); 
const bcrypt = require("bcryptjs");



const generateFakeUser = async () => { 
  const profileImage = faker.image.personPortrait(); // Generate a random profile image URL
  const password = "password123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const profileImageBase64 = Buffer.from(profileImage, "binary").toString("base64");

  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: hashedPassword,
    isPremium: faker.datatype.boolean(),
    profileImage: profileImageBase64,
  };
};

const getRandomDate = () => {
  const start = new Date(2022, 0, 1); // Start date (January 1, 2022)
  const end = new Date(); // End date (current date)
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const adminUser = {
  username: "admin",
  email: "admin@gmail.com",
  password: "admin123",
  role: "Admin",
  isPremium: true,
  organization: null,
  services: [],
  chatGroups: [],
  files: [],
  profileImage: "",
};

const organizations = [
  {
    name: "Tech Innovators",
    description: "Leading the way in technology innovation.",
    address: "123 Tech Street, Silicon Valley, CA, USA",
    phone: "+1 123 456 7890",
    email: "info@techinnovators.com",
    website: "https://techinnovators.com",
    logo: "https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?t=st=1741389019~exp=1741392619~hmac=62cb12ed7cd6ff048cfbf2dc538117901cb318b9ae412373ae220c23c700b3bb&w=1060",
    created_at: getRandomDate(),
  },
  {
    name: "Green Solutions",
    description: "Providing eco-friendly solutions for a sustainable future.",
    address: "456 Green Avenue, Portland, OR, USA",
    phone: "+1 234 567 8901",
    email: "info@greensolutions.com",
    website: "https://greensolutions.com",
    logo: "https://img.freepik.com/free-psd/gradient-versus-logo-template_23-2151514112.jpg?t=st=1741389265~exp=1741392865~hmac=7312b8defcf4c92f3297cf7de210da5e0741a498f8eb0879db76eea40eb97f14&w=1060",
    created_at: getRandomDate(),
  },
  {
    name: "Health Plus",
    description: "Your partner in health and wellness.",
    address: "789 Health Road, Boston, MA, USA",
    phone: "+1 345 678 9012",
    email: "info@healthplus.com",
    website: "https://healthplus.com",
    logo: "https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?t=st=1741389414~exp=1741393014~hmac=af8027c90708ba330bcdb78a8bc8255a865e4641b7b639a2bf83d91f4ccaef4a&w=1060",
    created_at: getRandomDate(),
  },
  {
    name: "EduTech",
    description: "Revolutionizing education through technology.",
    address: "101 Edu Street, Austin, TX, USA",
    phone: "+1 456 789 0123",
    email: "info@edutech.com",
    website: "https://edutech.com",
    logo: "https://img.freepik.com/free-vector/international-student-day-banner-design_1308-122226.jpg?t=st=1741389470~exp=1741393070~hmac=5a732fe57989c2ef0416c4755db90640f7d4ea1f1d9000fffa5d8e8e88b2240b&w=1060",
    created_at: getRandomDate(),
  },
  {
    name: "Foodies Delight",
    description: "Delivering delicious meals to your doorstep.",
    address: "202 Food Lane, Chicago, IL, USA",
    phone: "+1 567 890 1234",
    email: "info@foodiesdelight.com",
    website: "https://foodiesdelight.com",
    logo: "https://img.freepik.com/free-vector/detailed-chef-logo-template_23-2148987940.jpg?t=st=1741389724~exp=1741393324~hmac=82f9d2ef75339fae61b166a70ea2a5704c888716e926770792568ae64d805525&w=1060",
    created_at: getRandomDate(),
  },
  {
    name: "Fashion Forward",
    description: "Setting trends in the fashion industry.",
    address: "303 Style Avenue, New York, NY, USA",
    phone: "+1 678 901 2345",
    email: "info@fashionforward.com",
    website: "https://fashionforward.com",
    logo: "https://img.freepik.com/free-vector/hand-drawn-clothing-store-logo-design_23-2149577874.jpg?t=st=1741389820~exp=1741393420~hmac=57c07e109e694505c6d4715ca7b5efc5f78a5c217bb95dabd574dd924a0e2d12&w=1800",
    created_at: getRandomDate(),
  },
  {
    name: "Travel Masters",
    description: "Your gateway to unforgettable travel experiences.",
    address: "404 Wanderlust Road, Miami, FL, USA",
    phone: "+1 789 012 3456",
    email: "info@travelmasters.com",
    website: "https://travelmasters.com",
    logo: "https://img.freepik.com/free-vector/detailed-travel-logo_23-2148627268.jpg?t=st=1741389914~exp=1741393514~hmac=810cdc2f4358e69a029b9fe6523e56050f66c0b28b8f78bac92e6e033a243db3&w=1060",
    created_at: getRandomDate(),
  },
  {
    name: "Fitness Zone",
    description: "Helping you achieve your fitness goals.",
    address: "505 Gym Street, Los Angeles, CA, USA",
    phone: "+1 890 123 4567",
    email: "info@fitnesszone.com",
    website: "https://fitnesszone.com",
    logo: "https://img.freepik.com/free-vector/fitness-logo-template-flat-style_23-2148220483.jpg?t=st=1741389976~exp=1741393576~hmac=92f4328330b9fab249fbfa19b24ecf1b52d477ec078a5830b596430c449e45c8&w=1060",
    created_at: getRandomDate(),
  },
  {
    name: "Artistry Hub",
    description: "Celebrating creativity and artistic expression.",
    address: "606 Art Lane, San Francisco, CA, USA",
    phone: "+1 901 234 5678",
    email: "info@artistryhub.com",
    website: "https://artistryhub.com",
    logo: "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?t=st=1741390042~exp=1741393642~hmac=d28484509b71e7c7b8cbeb1095cc86fec5fd907813b384dab204fd3f03d9828d&w=1060",
    created_at: getRandomDate(),
  },
  {
    name: "Finance Pro",
    description: "Expert financial advice for your business.",
    address: "707 Money Street, Seattle, WA, USA",
    phone: "+1 012 345 6789",
    email: "info@financepro.com",
    website: "https://financepro.com",
    logo: "https://img.freepik.com/free-vector/gradient-accounting-logo-template_23-2148867917.jpg?t=st=1741390095~exp=1741393695~hmac=4b399b96a1cc7249843b9299fae1c9df914bff374c25d317c70f9a086ad14a82&w=1060",
    created_at: getRandomDate(),
  },
];


module.exports = { organizations, adminUser, generateFakeUser };
