import React, {ChangeEvent, useMemo, useState} from "react";
import {Drawer, DrawerContent, DrawerProps, TextField} from "rmwc";
import {Typography} from "@rmwc/typography";
import {Item} from "./game.types";
import {useCollectionContext} from "./Context";
import {getPlayerRecommendation, getPlayTimeRecommendation} from "./home/CategoryCard";

interface SearchDrawerProps extends DrawerProps {
    dir: "ltr" | "rtl"
}

export function SearchDrawer(props: SearchDrawerProps) {
    const items = useCollectionContext();
    const [search, setSearch] = useState<string>('');

    const results = useMemo(() => findGames(items, search), [items, search]);
    const trimmedSearch = search.trim();

    const onResultClick = (item: Item) => {
        window.open(item.externalSrc, '_blank', 'noopener,noreferrer');
        props.onClose?.({} as never);
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const onClick = (e) => props.onClose?.(e);

    return (
        <Drawer id="search-drawer" {...props}>
            <DrawerContent dir={'ltr'} className="search-drawer__content">
                <TextField
                    autoFocus
                    value={search}
                    onChange={(c: ChangeEvent<HTMLInputElement>) => setSearch(c.target.value)}
                    fullwidth
                    outlined={false}
                    placeholder="Nach Spiel suchen..."
                    aria-label="Nach Spiel suchen"
                    icon={{
                        icon: 'west',
                        onClick,
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
                <SearchSection title={`${results.length} ${results.length === 1 ? 'Spiel' : 'Spiele'}`}>
                    {results.length > 0 ? results.map((item) => (
                        <SearchResultItem
                            key={item.id}
                            item={item}
                            query={trimmedSearch}
                            onClick={() => onResultClick(item)}
                        />
                    )) : (
                        <div className="search-drawer__empty">
                            <Typography use="body1" tag="span">Keine passenden Spiele gefunden.</Typography>
                            <Typography use="body2" tag="span" theme="textSecondaryOnBackground">
                                Prüfe die Schreibweise oder suche nach einem anderen Begriff.
                            </Typography>
                        </div>
                    )}
                </SearchSection>
            </DrawerContent>
        </Drawer>
    );
}

function SearchSection({
                           title,
                           actionLabel,
                           onAction,
                           children,
                       }: {
    title: string;
    actionLabel?: string;
    onAction?: () => void;
    children: React.ReactNode;
}) {
    return (
        <section className="search-drawer__section" aria-label={title}>
            <div className="search-drawer__section-header">
                <Typography use="subtitle2" tag="span">{title}</Typography>
                {actionLabel && onAction && (
                    <button type="button" className="search-drawer__text-button" onClick={onAction}>
                        {actionLabel}
                    </button>
                )}
            </div>
            <div>{children}</div>
        </section>
    );
}

function SearchResultItem({item, query, onClick}: { item: Item; query: string; onClick: () => void }) {
    return (
        <button type="button" className="search-drawer__result" onClick={onClick}>
            <span
                className="search-drawer__thumbnail"
                aria-hidden="true"
                style={{backgroundImage: `url("${item.thumbnail}")`}}
            />
            <span className="search-drawer__result-content">
                <Typography use="body1" tag="span" className="max-row-2">
                  {highlightMatch(item.name, query)}
                </Typography>
                <Typography use="body2" tag="span" theme="textSecondaryOnBackground" className="max-row-1">
                  {highlightMatch(`${item.year}`, query)}, Spieler {getPlayerRecommendation(item)}, {getPlayTimeRecommendation(item)}, {item.weight}
                </Typography>
                {item.tags.length > 0 && (
                    <Typography use="caption" tag="span" theme="textSecondaryOnBackground" className="max-row-1">
                        {highlightMatch(item.tags.join(', '), query)}
                    </Typography>
                )}
            </span>
            <span className="material-icons search-drawer__result-arrow" aria-hidden="true">chevron_right</span>
        </button>
    );
}

function findGames(items: Item[], query: string): Item[] {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) {
        return items;
    }

    const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
    return items
        .map((item) => ({item, score: getSearchScore(item, normalizedQuery, tokens)}))
        .filter(({score}) => score > 0)
        .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name, 'de'))
        .map(({item}) => item);
}

function getSearchScore(item: Item, query: string, tokens: string[]): number {
    const name = normalize(item.name);
    const tags = item.tags.map(normalize);
    const caption = normalize(item.caption);
    const year = String(item.year);

    const allTokensMatch = tokens.every((token) =>
        name.includes(token) ||
        tags.some((tag) => tag.includes(token)) ||
        caption.includes(token) ||
        year.includes(token)
    );

    if (!allTokensMatch) {
        return 0;
    }

    let score = 0;
    if (name === query) score += 1000;
    if (name.startsWith(query)) score += 800;
    if (name.includes(query)) score += 600;

    tokens.forEach((token) => {
        if (name.startsWith(token)) score += 180;
        else if (name.includes(token)) score += 120;

        if (tags.some((tag) => tag.startsWith(token))) score += 45;
        else if (tags.some((tag) => tag.includes(token))) score += 25;

        if (caption.includes(token)) score += 15;
        if (year.includes(token)) score += 10;
    });

    return score;
}

function highlightMatch(value: string, query: string): React.ReactNode {
    const tokens = query.trim().split(/\s+/).filter(Boolean).sort((a, b) => b.length - a.length);
    if (tokens.length === 0) {
        return value;
    }

    const pattern = tokens.map(escapeRegExp).join('|');
    const regex = new RegExp(`(${pattern})`, 'gi');
    return value.split(regex).map((part, index) =>
        tokens.some((token) => part.toLocaleLowerCase() === token.toLocaleLowerCase())
            ? <mark key={index}>{part}</mark>
            : <React.Fragment key={index}>{part}</React.Fragment>
    );
}

function normalize(value: string): string {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ß/g, 'ss')
        .toLocaleLowerCase('de')
        .trim();
}

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
