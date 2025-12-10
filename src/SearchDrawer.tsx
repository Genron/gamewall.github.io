import React, {ChangeEvent, useEffect, useState} from "react";
import {Drawer, DrawerContent, DrawerProps, TextField} from "rmwc";

interface SearchDrawerProps extends DrawerProps {
  dir: "ltr" | "rtl"
}

export function SearchDrawer(props: SearchDrawerProps) {
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
      </DrawerContent>
    </Drawer>
  );
}