import React from "react";
import {
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from "rmwc";
import {Link} from "react-router-dom";

interface HeaderProps {
  onSearch: (evt: React.SyntheticEvent<HTMLElement>) => void;
  title: React.ReactNode;
}

export function Header({
                         onSearch,
                         title,
                       }: HeaderProps) {
  return (
    <>
      <TopAppBar fixed className="app__top-app-bar">
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarTitle tag={Link} to="/">
              {title}
            </TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <TopAppBarNavigationIcon onClick={onSearch} icon={'search'}/>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust/>
    </>
  );
}