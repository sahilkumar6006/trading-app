const { MongoClient } = require("mongodb");

async function runAggregationPractice() {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();

  const db = client.db("practiceDB"); // use a separate DB for practice
  const orders = db.collection("orders");

  // Insert static data (you can skip if data already exists)
  await orders.deleteMany({}); // clear previous practice data
  await orders.insertMany([
    {
      _id: 1,
      product: "Apple",
      category: "Fruit",
      price: 10,
      quantity: 5,
      date: new Date("2025-01-01"),
    },
    {
      _id: 2,
      product: "Banana",
      category: "Fruit",
      price: 5,
      quantity: 10,
      date: new Date("2025-01-02"),
    },
    {
      _id: 3,
      product: "Carrot",
      category: "Vegetable",
      price: 8,
      quantity: 7,
      date: new Date("2025-01-03"),
    },
    {
      _id: 4,
      product: "Apple",
      category: "Fruit",
      price: 10,
      quantity: 3,
      date: new Date("2025-01-04"),
    },
    {
      _id: 5,
      product: "Spinach",
      category: "Vegetable",
      price: 12,
      quantity: 2,
      date: new Date("2025-01-05"),
    },
  ]);

  // Example Aggregation: total quantity per category
  const pipeline = [
    {
      $group: {
        _id: "$category",
        totalQuantity: { $sum: "$quantity" },
        totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } },
      },
    },
    { $sort: { totalRevenue: -1 } },
  ];

  const result = await orders.aggregate(pipeline).toArray();
  console.log("Aggregation Result:", result);

  await client.close();
}

runAggregationPractice();
