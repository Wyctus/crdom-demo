import React, { useEffect } from "react";
import { HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton, DraftJsStyleButtonProps } from "@draft-js-plugins/buttons";
import { ToolbarChildrenProps } from "@draft-js-plugins/inline-toolbar/lib/components/Toolbar";

const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];

type OverrideContent = NonNullable<Parameters<ToolbarChildrenProps["onOverrideContent"]>[0]>;
type FindType<TWhere> = TWhere extends React.ComponentClass<infer U> ? (U extends object ? U : never) : never;
type OverrideContentProps = FindType<OverrideContent>;

function HeadlinesPicker(props: OverrideContentProps) {
  const onWindowClick = () => props.onOverrideContent(undefined);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", onWindowClick);
    });

    return () => window.removeEventListener("click", onWindowClick);
  });

  return (
    <div>
      {buttons.map((Button, i) => (
        <Button key={i} {...(props as OverrideContentProps & DraftJsStyleButtonProps)} />
      ))}
    </div>
  );
}

export default HeadlinesPicker;
