import React, { useState, useMemo } from "react";
import { EditorState } from "draft-js";
import DraftEditor from "@draft-js-plugins/editor";
import createInlineToolbarPlugin, { Separator } from "@draft-js-plugins/inline-toolbar";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import EditorProps from "./EditorProps";

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";

import HeadlinesButton from "./HeadlinesButton";

function Editor(props: EditorProps) {
  const getEditorState = () => props.document.getBlockById(props.blockId).data!.content;

  const [editorState, setEditorState] = useState<EditorState>(getEditorState());

  const onChange = (newState: EditorState) => {
    props.document.editBlockData(props.blockId, {
      content: newState,
      style: props.document.getBlockById(props.blockId).data?.style,
    });
    setEditorState(newState);
  };

  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
  }, []);

  return (
    <div>
      <DraftEditor editorState={editorState} onChange={onChange} plugins={plugins} />
      <InlineToolbar>
        {(externalProps) => (
          <>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <CodeButton {...externalProps} />
            <Separator className={externalProps.theme.buttonWrapper} />
            <HeadlinesButton {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
            <CodeBlockButton {...externalProps} />
          </>
        )}
      </InlineToolbar>
    </div>
  );
}

export default Editor;
