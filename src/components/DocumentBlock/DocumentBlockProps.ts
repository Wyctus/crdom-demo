import { Document as CrDOM } from "crdom";
import { EditorState } from "draft-js";

interface DocumentProps {
  className?: string;
  blockId: string;
  blockCRC: string;
  compoundCRC: string;
  document: CrDOM<EditorState>;
}

export default DocumentProps;
