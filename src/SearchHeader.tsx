import React, {ChangeEvent, useState} from "react";
import {
  TextField,
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon,
  TopAppBarRow,
  TopAppBarSection
} from "rmwc";

import '@rmwc/textfield/styles';

interface HeaderProps {
  onClose: (evt: React.SyntheticEvent<HTMLElement>) => void;
  onSearch: (s: string) => void;
}

export function SearchHeader({
                               onClose,
                             }: HeaderProps) {
  const [search, setSearch] = useState<string>('');
  return (
    <>
      <TopAppBar fixed className="app__top-app-bar" dense dir="ltr">
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon onClick={onClose} icon={'west'}/>

          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust/>
    </>
  );
}