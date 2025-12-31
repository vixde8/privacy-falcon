import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let db: Db;

export async function getDb(): Promise<Db> {
  if (db) return db;

  client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  db = client.db("privacy_falcon");

  return db;
}
