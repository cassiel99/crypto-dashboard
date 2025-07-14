import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/cryptos", async (req, res) => {
  const cryptos = await prisma.cryptoCurrency.findMany();
  res.json(cryptos);
});

app.post("/api/fetch-cryptos", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: {
          start: 1,
          limit: 50,
          convert: "USD",
        },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY!,
        },
      }
    );

    // Очищаем таблицу
    await prisma.cryptoCurrency.deleteMany();

    for (const coin of data.data) {
      await prisma.cryptoCurrency.create({
        data: {
          symbol: coin.symbol,
          name: coin.name,
          price: coin.quote.USD.price,
          percentChange24h: coin.quote.USD.percent_change_24h,
          marketCap: coin.quote.USD.market_cap,
          volume24h: coin.quote.USD.volume_24h,
        },
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fetch error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
