import { FC, useEffect, useState } from "react";

export const EmojiList: FC = () => {
  const [emojis, setEmojis] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetch("/emojis")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEmojis(data as { [key: string]: string });
      })
      .catch((error) => console.error("Error fetching emojis:", error));
  }, []);

  return (
    <div>
      <h1>Emoji List</h1>
      <ul>
        {Object.entries(emojis).map(([name, url]) => (
          <li key={name}>
            <img
              src={url}
              alt={name}
              style={{ width: "50px", height: "50px" }}
            />
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
