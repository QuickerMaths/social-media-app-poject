import { faker } from "@faker-js/faker";
import connection from "./db.js";

// Function to seed user_profile table
function seedUserProfileTable() {
  const profiles = [];
  for (let i = 1; i <= 100; i++) {
    const profile = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      is_email_confirmation: faker.datatype.boolean(),
      password: faker.internet.password(),
      avatar_url: faker.internet.avatar(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      country: faker.location.country(),
      state: faker.location.state(),
      city: faker.location.city(),
      street: faker.location.streetAddress(true),
      postal_code: faker.location.zipCode(),
      created_at: faker.date.past({ years: 1 })
    };
    profiles.push(profile);
  }

  const sql = "INSERT INTO user_profile SET ?";
  profiles.forEach((profile) => {
    connection.query(sql, profile);
  });

  console.log("Seeded user_profile table with 100 profiles");
}

// Add functions to seed other tables (post_like, friendship, etc.) similarly

// Call the seed functions here
seedUserProfileTable();

// Close the database connection when done
connection.end((err: Error | null) => {
  if (err) throw err;
  console.log("Disconnected from MySQL database");
});
