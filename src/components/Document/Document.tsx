/** @jsxImportSource @emotion/react */
import { Document as CrDOM } from "crdom";
import { EditorState } from "draft-js";
import { createEditorStateWithText } from "@draft-js-plugins/editor";

import { DocumentBlock } from "../DocumentBlock";
import { SerializedStyles, css } from "@emotion/react";
import { memo, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";

const document = new CrDOM<EditorState>("My First Document", (c: EditorState) => JSON.stringify(c.toJS()));
const blockId = document.insertBlockAtRootEnd({
  content: createEditorStateWithText(
    "This is the initial content of the editor. This is the initial content of the editor. This is the initial content of the editor. This is the initial content of the editor."
  ),
});

const blockId2 = document.insertSubblockAtBlockEnd(blockId, {
  content: createEditorStateWithText("This is a subblock"),
});

document.insertSubblockAtBlockEnd(blockId2, {
  content: createEditorStateWithText("This is a subblock"),
});

document.insertSubblockAtBlockEnd(blockId, {
  content: createEditorStateWithText("This is a subblock"),
});

document.insertBlockAtRootEnd({
  content: createEditorStateWithText(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in porta nulla. Cras eu risus ut risus ornare mattis. Sed tincidunt, magna euismod pharetra finibus, purus lectus congue purus, sed porttitor libero urna ac dui. Morbi molestie ultricies odio, lobortis sodales quam dapibus vel. Quisque at consequat sem. Sed nec aliquam ipsum, non tincidunt magna. Phasellus vitae ante nec metus mollis iaculis. Vestibulum feugiat tincidunt ornare. "
  ),
});

function Document() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const listenerId = document.addListener((blockId: string, blockCRC: string, compoundCRC: string) => setCounter(counter + 1));

    return () => {
      document.removeListener(listenerId);
    };
  });

  return (
    <Paper css={containerStyle}>
      <h1>{document.name}</h1>
      {Array.from(document.blockIterator()).map((block) => (
        <DocumentBlock document={document} blockId={block.id} blockCRC={block.crc} compoundCRC={block.compoundCRC} key={block.id} />
      ))}
    </Paper>
  );
}

const containerStyle: SerializedStyles = css`
  width: 100%;
`;

export default memo(Document);
