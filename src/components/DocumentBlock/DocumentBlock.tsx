/** @jsxImportSource @emotion/react */
import { memo, useState } from "react";
import { createEditorStateWithText } from "@draft-js-plugins/editor";
import { css, SerializedStyles } from "@emotion/react";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Editor } from "../Editor";
import DocumentBlockProps from "./DocumentBlockProps";

function DocumentBlock(props: DocumentBlockProps) {
  const [isShown, setIsShown] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `popover-${props.blockId}` : undefined;

  const deleteBlock = () => {
    props.document.deleteBlock(props.blockId);
    handleClose();
  };

  const addBlockBefore = () => {
    props.document.insertBlockBeforeBlock(props.blockId, {
      content: createEditorStateWithText("Type here ...."),
    });
    handleClose();
  };

  const addBlockAfter = () => {
    props.document.insertBlockAfterBlock(props.blockId, {
      content: createEditorStateWithText("Type here ...."),
    });
    console.log(Array.from(props.document.blockIterator()).map((a) => a.compoundCRC));
    handleClose();
  };

  const addSubblockAtBlockEnd = () => {
    props.document.insertSubblockAtBlockEnd(props.blockId, {
      content: createEditorStateWithText("Some subblock"),
    });
    handleClose();
  };

  return (
    <div css={containerStyle} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
      <div css={contentStyle}>
        <Editor document={props.document} blockId={props.blockId} blockCRC={props.blockCRC} compoundCRC={props.compoundCRC}></Editor>
        <div css={subblockContainerStyle}>
          {Array.from(props.document.getBlockById(props.blockId).childrenIterator()).map((subblock) => (
            <DocumentBlock
              document={props.document}
              blockId={subblock.data!.id}
              blockCRC={subblock.data!.crc}
              compoundCRC={subblock.data!.compoundCRC}
              key={subblock.data!.id}
            />
          ))}
        </div>
      </div>
      <div css={iconContainerStyle}>
        {isShown && (
          <Stack direction="column" css={iconContainerStyle}>
            <IconButton aria-describedby={id} onClick={handleClick} size="small">
              <MoreIcon />
            </IconButton>
          </Stack>
        )}
        <Popover
          id={`popover-${props.blockId}`}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div css={popoverStyle}>
            <Typography variant="body1" onClick={addBlockBefore}>
              Insert block before
            </Typography>
            <Typography variant="body1" onClick={addBlockAfter}>
              Insert block after
            </Typography>
            <Typography variant="body1" onClick={addSubblockAtBlockEnd}>
              Insert subblock at the end
            </Typography>
            <Typography variant="body1" onClick={deleteBlock}>
              Delete
            </Typography>
          </div>
        </Popover>
      </div>
    </div>
  );
}

const containerStyle: SerializedStyles = css`
  width: 100%;
  min-height: 34px;
  display: flex;
  flex-direction: row;
`;

const contentStyle: SerializedStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const iconContainerStyle: SerializedStyles = css`
  width: 34px;
`;

const popoverStyle: SerializedStyles = css`
  display: flex;
  flex-direction: column;
  padding: 0 5px;
`;

const subblockContainerStyle: SerializedStyles = css`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

export default memo(DocumentBlock);
