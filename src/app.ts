import express from "express";
import { WebClient } from "@slack/web-api";
import * as dotenv from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;

dotenv.config();

const slackClientBot = new WebClient(process.env.SLACK_BOT_USER_TOKEN);
const slackClientUser = new WebClient(process.env.SLACK_USER_TOKEN);

app.use(cors());

app.get("/emojis", async (req, res) => {
  try {
    const response = await slackClientBot.emoji.list({});
    res.json(response.emoji);
  } catch (error) {
    console.error(error);
    res.status(500).send("Slackから絵文字を取得中にエラーが発生しました");
  }
});

app.get("/search/reactions/thumbsup", async (req, res) => {
  try {
    const query = "has:reaction :thumbsup:";
    const response = await slackClientUser.search.messages({
      query,
      sort: "timestamp",
      sort_dir: "desc",
    });

    console.log("response:", response);

    const messages =
      response.messages &&
      response.messages.matches &&
      response.messages.matches.map((match) => ({
        user: match.username,
        text: match.text,
        ts: match.ts,
        reactions: match.no_reactions,
      }));

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send("リアクションの検索中にエラーが発生しました");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
