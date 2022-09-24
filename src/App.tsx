/** @jsxImportSource @emotion/react */
import Document from "./components/Document/Document";
import { css, SerializedStyles } from "@emotion/react";

function App() {
  return (
    <div css={containerStyle}>
      <Document></Document>
    </div>
  );
}

const containerStyle: SerializedStyles = css`
  width: 90%;
  margin: auto;
  max-width: 1600px;
`;

export default App;
