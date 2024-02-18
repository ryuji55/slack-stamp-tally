import { FC, useEffect, useState } from "react";

interface Message {
  text: string;
}

export const SearchReactions: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/search/reactions/thumbsup");
        console.log("response:", response);
        if (!response.ok) {
          throw new Error(
            "Slackからのメッセージの取得中にエラーが発生しました"
          );
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h1>Thumbs Up Messages</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <p>{message.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
