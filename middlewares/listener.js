const redis = require("redis");
const dotenv = require('dotenv');
dotenv.config();
const User = require("../models/user");


const subscriber = redis.createClient({ url: process.env.REDIS_URL });


(async () => {
  try {
    await subscriber.connect();
    console.log("Subscriber is connected to Redis");

    await subscriber.subscribe("project-events", async (message) => {
      const event = JSON.parse(message);
      console.log(event.type);

      switch (event.type) {
        case "user-added-to-project":
          await User.findByIdAndUpdate(event.userId, {
            $addToSet: { projects: event.projectId },
          });
          console.log("project-added-to-user");
          break;
        case "user-removed-from-project":
          await User.findByIdAndUpdate(event.userId, {
            $pull: { projects: event.projectId },
          });
          console.log("project-removed-from-user");
          break;
      }
    });
  } catch (err) {
    console.error("Redis Subscriber connection error:", err);
  }
})();
