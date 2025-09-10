import redis from "redis";

const client = redis.createClient({
  url: "redis://localhost:6379",
});

client.on("error", (err) => console.log("Redis Client Error", err));

const fakeDatabase = {
  "1": { id: 1, name: "John Doe", age: 30 },
  "2": { id: 2, name: "Jane Smith", age: 25 },
};

(async () => {
  await client.connect();
})();

//Middleware to Check Cache how can i do that
export { client };
