/** @jsxImportSource @emotion/react */
import { ToolbarChildrenProps } from "@draft-js-plugins/inline-toolbar/lib/components/Toolbar";
import { css, SerializedStyles } from "@emotion/react";
import React from "react";

import HeadlinesPicker from "./HeadlinesPicker";

function HeadlinesButton(props: ToolbarChildrenProps) {
  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => event.preventDefault();
  const onClick = () => props.onOverrideContent(HeadlinesPicker);

  return (
    <div onMouseDown={onMouseDown} css={buttonContainerStyle}>
      <button onClick={onClick} css={buttonStyle}>
        H
      </button>
    </div>
  );
}

const buttonContainerStyle: SerializedStyles = css`
  display: inline-block;
`;

const buttonStyle: SerializedStyles = css`
  background: #fbfbfb;
  color: #888;
  font-size: 18px;
  border: 0;
  padding-top: 5px;
  vertical-align: bottom;
  height: 34px;
  width: 36px;
`;

export default HeadlinesButton;
