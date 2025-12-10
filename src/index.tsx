import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import 'rmwc/styles';
import './styles.css';
import ReactDOM from 'react-dom/client';
import './styles';
import {DrawerAppContent, Portal, PortalProvider, RMWCProvider, ThemeProvider,} from "rmwc";
import {getTheme} from "./theme-picker";
import {Home} from "./home/Home";
import {Header} from "./Header";
import {CollectionContextProvider, LinksContextProvider, SortedLinksContextProvider} from "./Context";
import {SearchDrawer} from "./SearchDrawer";

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
    <CollectionContextProvider>
      <LinksContextProvider>
        <SortedLinksContextProvider>
          <ThemeProvider
            options={getTheme('Baseline')}
            className="app__root"
            tag="div"
            id={'Home'}
          >
            <PortalProvider>
              <Header onSearch={() => setMenuIsOpen(!menuIsOpen)}/>
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
                  </Routes>
                </DrawerAppContent>
              </div>
              <Portal/>
            </PortalProvider>
          </ThemeProvider>
        </SortedLinksContextProvider>
      </LinksContextProvider>
    </CollectionContextProvider>
  );
}
