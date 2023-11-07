import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { UniqueEnforcer } from "enforce-unique";
import connection from "./db.js";

const uniqueEnforcerEmail = new UniqueEnforcer();

async function generateRandomUser() {
  const hashedPassword = async () => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(faker.internet.password(), salt);
  };
  return {
    username: faker.internet.userName(),
    email: uniqueEnforcerEmail.enforce(() => {
      return faker.internet.email();
    }),
    is_email_confirmation: faker.datatype.boolean(),
    password: await hashedPassword(),
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
}

async function generateRandomPost() {
  const [profile_id] = await connection.query(
    "SELECT id FROM user_profile ORDER BY RAND() LIMIT 1"
  );

  //@ts-ignore
  const randomId = profile_id[0].id;

  return {
    profile_id: randomId,
    post_text: faker.lorem.paragraphs({ min: 1, max: 3 }),
    media_location: faker.image.url(),
    created_at: faker.date.past({ years: 1 }),
    updated_at: faker.date.past({ years: 1 })
  };
}

async function generateRandomSharedPosts() {
  const [profile_id] = await connection.query(
    "SELECT id FROM user_profile ORDER BY RAND() LIMIT 1"
  );
  const [post_id] = await connection.query(
    "SELECT id FROM user_post ORDER BY RAND() LIMIT 1"
  );

  //@ts-ignore
  const randomProfileId = profile_id[0].id;
  //@ts-ignore
  const randomPostId = post_id[0].id;

  return {
    profile_id: randomProfileId,
    shared_post_id: randomPostId,
    post_text: faker.lorem.paragraphs({ min: 1, max: 3 }),
    media_location: faker.image.url(),
    is_shared: true,
    created_at: faker.date.past({ years: 1 }),
    updated_at: faker.date.past({ years: 1 })
  };
}
//TODO: ensure that post_id and profile_id are unique pair
async function generatePostLike() {
  const [profile_id] = await connection.query(
    "SELECT id FROM user_profile ORDER BY RAND() LIMIT 1"
  );
  const [post_id] = await connection.query(
    "SELECT id FROM user_post ORDER BY RAND() LIMIT 1"
  );

  //@ts-ignore
  const randomProfileId = profile_id[0].id;
  //@ts-ignore
  const randomPostId = post_id[0].id;

  return {
    post_id: randomPostId,
    profile_id: randomProfileId,
    created_at: faker.date.past({ years: 1 })
  };
}

async function generateRandomComment() {
  const [profile_id] = await connection.query(
    "SELECT id FROM user_profile ORDER BY RAND() LIMIT 1"
  );
  const [post_id] = await connection.query(
    "SELECT id FROM user_post ORDER BY RAND() LIMIT 1"
  );

  //@ts-ignore
  const randomProfileId = profile_id[0].id;
  //@ts-ignore
  const randomPostId = post_id[0].id;

  return {
    post_id: randomPostId,
    profile_id: randomProfileId,
    comment_text: faker.lorem.paragraphs({ min: 1, max: 3 }),
    created_at: faker.date.past({ years: 1 }),
    updated_at: faker.date.past({ years: 1 })
  };
}

async function generateCommentLike() {
  const [profile_id] = await connection.query(
    "SELECT id FROM user_profile ORDER BY RAND() LIMIT 1"
  );
  const [comment_id] = await connection.query(
    "SELECT id FROM post_comment ORDER BY RAND() LIMIT 1"
  );

  //@ts-ignore
  const randomProfileId = profile_id[0].id;
  //@ts-ignore
  const randomPostId = comment_id[0].id;

  return {
    comment_id: randomPostId,
    profile_id: randomProfileId,
    created_at: faker.date.past({ years: 1 })
  };
}

async function generateRandomFriendship() {
  const [profile_id] = await connection.query(
    "SELECT id FROM user_profile ORDER BY RAND() LIMIT 1"
  );
  const [friend_id] = await connection.query(
    "SELECT id FROM user_profile ORDER BY RAND() LIMIT 1"
  );
  const [friendship_status_id] = await connection.query(
    "SELECT id FROM friendship_status ORDER BY RAND() LIMIT 1"
  );

  //@ts-ignore
  const randomProfileId = profile_id[0].id;
  //@ts-ignore
  const randomFriendId = friend_id[0].id;
  //@ts-ignore
  const randomStatusId = friendship_status_id[0].id;

  return {
    profile_request_id: randomProfileId,
    profile_responder_id: randomFriendId,
    status_id: randomStatusId,
    created_at: faker.date.past({ years: 1 })
  };
}

async function seed(table: string, rows: number, schema: Function) {
  const data = [];

  for (let i = 0; i < rows; i++) {
    console.log(`Generating row ${i + 1} for ${table} table`);
    data.push(await schema());
  }

  const sql = `INSERT INTO ${table} SET ?`;

  data.forEach((item) => {
    connection.query(sql, item);
  });

  console.log(`Seeded ${data.length} rows into ${table} table`);
}

await seed("user_profile", 100, generateRandomUser);
// seed normal posts
await seed("user_post", 100, generateRandomPost);
// seed shared posts
await seed("user_post", 50, generateRandomSharedPosts);
await seed("post_like", 100, generatePostLike);
await seed("post_comment", 100, generateRandomComment);
await seed("comment_like", 100, generateCommentLike);
await seed("friendship", 100, generateRandomFriendship);

connection.end((err: Error | null) => {
  if (err) throw err;
  console.log("Disconnected from MySQL database");
});
