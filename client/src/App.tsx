import React from "react";
import "./App.css";
import { EmojiList } from "./conponents/emojiList";
import { SearchReactions } from "./conponents/searchReactions";

function App() {
  return (
    <div className="App">
      <SearchReactions />
    </div>
  );
}

export default App;
