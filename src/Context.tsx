import React, {PropsWithChildren, useContext, useEffect, useState} from "react";
import {Collection, Links} from "./game.types";

const CollectionContext = React.createContext<Collection>([]);

export function CollectionContextProvider({children}: PropsWithChildren) {

  const [collection, setCollection] = useState<Collection>();
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/collection.json`).then(res => res.json()).then(setCollection)
  }, []);

  if (!collection) {
    return null;
  }
  return (
    <CollectionContext value={collection}>
      {children}
    </CollectionContext>
  )

}

export function useCollectionContext() {
  return useContext(CollectionContext);
}

export function useLinksContext() {
  return useContext(LinksContext);
}

export function useSortedLinksContext() {
  return useContext(SortedLinksContext);
}

const LinksContext = React.createContext<Links>({
  // boardgamecategory: {},
  // boardgamemechanic: {},
  // boardgamefamily: {},
  // boardgameexpansion: {},
  // boardgameaccessory: {},
  // boardgameintegration: {},
  // boardgamecompilation: {},
  // boardgameimplementation: {},
  // boardgamedesigner: {},
  // boardgameartist: {},
  // boardgamepublisher: {},
});
const SortedLinksContext = React.createContext<Links>({
  // boardgamecategory: {},
  // boardgamemechanic: {},
  // boardgamefamily: {},
  // boardgameexpansion: {},
  // boardgameaccessory: {},
  // boardgameintegration: {},
  // boardgamecompilation: {},
  // boardgameimplementation: {},
  // boardgamedesigner: {},
  // boardgameartist: {},
  // boardgamepublisher: {},
});

export function LinksContextProvider({children}: PropsWithChildren) {
  const [links, setLinks] = useState<Links>();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/links.json`).then(res => res.json()).then(setLinks)
  }, []);

  if (!links) {
    return null;
  }

  return (
    <LinksContext value={links}>
      {children}
    </LinksContext>
  )
}

export function SortedLinksContextProvider({children}: PropsWithChildren) {
  const [links, setLinks] = useState<Links>();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/sortedlinks.json`).then(res => res.json()).then(setLinks)
  }, []);

  if (!links) {
    return null;
  }

  return (
    <SortedLinksContext value={links}>
      {children}
    </SortedLinksContext>
  )
}