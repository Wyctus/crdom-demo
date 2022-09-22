import React from "react";

import { Document } from "crdom";

const doc = new Document("My First Document");

function App() {
  return <div className="App">{doc.name}</div>;
}

export default App;
