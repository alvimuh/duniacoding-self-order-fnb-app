import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";

const menus = [
  // Food
  {
    name: "Nasi Goreng",
    description: "Nasi goreng spesial dengan telur, ayam, dan sayuran",
    price: 25000,
    category: "food",
  },
  {
    name: "Mie Goreng",
    description: "Mie goreng dengan bumbu khas Indonesia",
    price: 22000,
    category: "food",
  },
  {
    name: "Ayam Bakar",
    description: "Ayam bakar madu dengan sambal terasi",
    price: 28000,
    category: "food",
  },
  {
    name: "Sate Ayam",
    description: "10 tusuk sate ayam dengan bumbu kacang",
    price: 25000,
    category: "food",
  },
  {
    name: "Gado-gado",
    description: "Sayuran segar dengan saus kacang",
    price: 18000,
    category: "food",
  },
  {
    name: "Soto Ayam",
    description: "Soto ayam kuning dengan suwiran ayam",
    price: 20000,
    category: "food",
  },

  // Drinks
  {
    name: "Es Teh Manis",
    description: "Teh manis dingin menyegarkan",
    price: 5000,
    category: "drink",
  },
  {
    name: "Es Jeruk",
    description: "Jeruk peras segar dingin",
    price: 8000,
    category: "drink",
  },
  {
    name: "Kopi Hitam",
    description: "Kopi tubruk khas Indonesia",
    price: 10000,
    category: "drink",
  },
  {
    name: "Jus Alpukat",
    description: "Jus alpukat segar dengan susu kental manis",
    price: 15000,
    category: "drink",
  },
  {
    name: "Air Mineral",
    description: "Air mineral botol 600ml",
    price: 4000,
    category: "drink",
  },

  // Snacks
  {
    name: "Tahu Crispy",
    description: "Tahu goreng tepung renyah",
    price: 12000,
    category: "snack",
  },
  {
    name: "Pisang Goreng",
    description: "Pisang goreng crispy dengan madu",
    price: 10000,
    category: "snack",
  },
  {
    name: "Tempe Mendoan",
    description: "Tempe goreng tepung khas Banyumas",
    price: 10000,
    category: "snack",
  },
  {
    name: "Kentang Goreng",
    description: "French fries dengan saus sambal",
    price: 15000,
    category: "snack",
  },
];

async function seed() {
  const connection = mysql.createPool({
    uri: process.env.DATABASE_URL!,
    charset: "utf8mb4",
  });
  const db = drizzle(connection, { schema, mode: "default" });

  console.log("🌱 Seeding menus...");
  await db.insert(schema.menus).values(menus);
  console.log(`✅ Seeded ${menus.length} menu items`);

  await connection.end();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
