import { Document as CrDOM } from "crdom";
import { EditorState } from "draft-js";

interface EditorProps {
  className?: string;
  document: CrDOM<EditorState>;
  blockId: string;
  blockCRC: string;
  compoundCRC: string;
}

export default EditorProps;
