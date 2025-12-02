// eslint-disable-next-line
import React, {ChangeEvent, useEffect, useState} from 'react';
import {BrowserRouter, Link, Route, Routes, useLocation} from 'react-router-dom';
import 'rmwc/styles';
import './styles.css';
import ReactDOM from 'react-dom/client';
import './styles';
import {
  CollapsibleList,
  Drawer,
  DrawerAppContent,
  DrawerContent,
  DrawerProps,
  ListItem,
  Portal,
  PortalProvider,
  RMWCProvider,
  SimpleListItem,
  TextField,
  ThemeProvider,
} from "rmwc";
import {getTheme} from "./theme-picker";
import {menuContent, MenuItemT} from "./menu-content";
import Home from "./home";
import {Header} from "./Header";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
//   <React.StrictMode>
  <RMWCProvider>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App/>
    </BrowserRouter>
  </RMWCProvider>
//   </React.StrictMode>
);

function App() {
  const [isMobile, setMobile] = useState(window.innerWidth < 640);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    const listener = () => {
      setMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  console.log({isMobile, menuIsOpen})

  return (
    <ThemeProvider
      options={getTheme('Baseline')}
      className="app__root"
      tag="div"
      id={'Home'}
    >
      <PortalProvider>
        <Header
          title={'Gamewall'}
          onSearch={() => setMenuIsOpen(!menuIsOpen)}
        />
        <div className="demo-content">
          <SearchDrawer
            open={menuIsOpen}
            dismissible={!isMobile}
            modal={isMobile}
            onClose={() => setMenuIsOpen(false)}
            dir="rtl"
          />
          <DrawerAppContent tag="main" className="app__content">
            <Routes>
              <Route key={'home'} path="/" element={<Home/>}/>
              {getDocRoutes({options: menuContent})}
            </Routes>
          </DrawerAppContent>
        </div>
        <Portal/>
      </PortalProvider>
    </ThemeProvider>
  );
}

interface SearchDrawerProps extends DrawerProps {
  dir: "ltr" | "rtl"
}

function SearchDrawer(props: SearchDrawerProps) {
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    console.log(`search is ${search}`);
  }, [search]);

  return (
    <Drawer id="search-drawer" {...props}>
      <DrawerContent dir={'ltr'}>
        <TextField
          autoFocus
          value={search}
          onChange={(c: ChangeEvent<HTMLInputElement>) => setSearch(c.target.value)}
          fullwidth
          placeholder="Nach Spiel suchen..."
          icon={{
            icon: 'west',
            onClick: (e: any) => {
              props.onClose?.(e);
            },
            tabIndex: 0,
          }}
          style={{
            paddingLeft: '16px',
          }}
          trailingIcon={search && {
            icon: 'close',
            tabIndex: 0,
            onClick: () => setSearch(''),
          }}
        />
        {/*  <List>*/}
        {/*    <ListItem>Cookies</ListItem>*/}
        {/*    <ListItem>Pizza</ListItem>*/}
        {/*    <ListItem>Icecream</ListItem>*/}
        {/*  </List>*/}
      </DrawerContent>
    </Drawer>
  );
}

function NavItems({options}: { options: MenuItemT[] }) {
  const location = useLocation();
  return (
    <>
      {options.map((m) => {
        if (m.options) {
          return (
            <CollapsibleList
              key={m.label}
              defaultOpen={
                m.label === 'Components' ||
                m.options?.some((o) => o.url && location.pathname === o.url)
              }
              handle={
                <SimpleListItem text={m.label} metaIcon="chevron_right"/>
              }
            >
              <NavItems options={m.options!}/>
            </CollapsibleList>
          );
        }
        return <MainMenuItem label={m.label} url={m.url!} key={m.label}/>;
      })}
    </>
  );
}

const MainMenuItem = ({url, label}: { url?: string; label: string }) => {
  const location = useLocation();
  return (
    <ListItem
      tag={Link}
      to={url}
      onClick={() => window.scrollTo(0, 0)}
      activated={location.pathname === url}
    >
      <span>{label}</span>
    </ListItem>
  );
};


function getDocRoutes({
                        options
                      }: {
  options: MenuItemT[];
}): React.ReactElement[] {
  return options.flatMap((value) => {
    if (value.options) {
      return getDocRoutes({options: value.options});
    }

    const Component = () => {
      const Inner = value.component!;
      document.title = `RMWC | React Material Web Components | ${value.label}`;
      return <Inner/>;
    };

    return [
      <Route path={value.url!} key={value.label} element={<Component/>}/>
    ];
  });
}
