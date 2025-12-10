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
import logo from './powered-by-bgg-rgb.svg';

interface HeaderProps {
  onSearch: (evt: React.SyntheticEvent<HTMLElement>) => void;
}

export function Header({
                         onSearch,
                       }: HeaderProps) {
  return (
    <>
      <TopAppBar fixed className="app__top-app-bar">
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarTitle tag={Link} to="https://boardgamegeek.com/" target={"_blank"} rel={"noopener noreferrer"}>
              <img src={logo} alt={'bgg'} style={{height: '35px'}}/>
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