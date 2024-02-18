import express from "express";
import { WebClient } from "@slack/web-api";
import * as dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config();

const slackClient = new WebClient(process.env.SLACK_BOT_USER_TOKEN);

app.get("/emojis", async (req, res) => {
  try {
    const response = await slackClient.emoji.list({});
    res.json(response.emoji);
  } catch (error) {
    console.error(error);
    res.status(500).send("Slackから絵文字を取得中にエラーが発生しました");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
