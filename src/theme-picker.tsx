import * as RMWC from '@rmwc/types';
import React from 'react';

import {toDashCase} from '@rmwc/base';
import {getAutoColorsForTheme} from '@rmwc/theme';

const DEFAULT_THEME = {
  '--mdc-theme-primary': 'rgb(63, 58, 96)',
  '--mdc-theme-secondary': '#03dac4',
  '--mdc-theme-background': '#fff',
  '--mdc-theme-surface': '#fff',
  '--mdc-theme-error': '#b00020'
};

const TEXT_DEFAULTS = {
  '--mdc-theme-on-primary': '#fff',
  '--mdc-theme-on-secondary': '#fff',
  '--mdc-theme-on-surface': '#000',
  '--mdc-theme-on-error': '#fff',
  '--mdc-theme-text-primary-on-background': 'rgba(0, 0, 0, 0.87)',
  '--mdc-theme-text-secondary-on-background': 'rgba(0, 0, 0, 0.54)',
  '--mdc-theme-text-hint-on-background': 'rgba(0, 0, 0, 0.38)',
  '--mdc-theme-text-disabled-on-background': 'rgba(0, 0, 0, 0.38)',
  '--mdc-theme-text-icon-on-background': 'rgba(0, 0, 0, 0.38)',
  '--mdc-theme-text-primary-on-light': 'rgba(0, 0, 0, 0.87)',
  '--mdc-theme-text-secondary-on-light': 'rgba(0, 0, 0, 0.54)',
  '--mdc-theme-text-hint-on-light': 'rgba(0, 0, 0, 0.38)',
  '--mdc-theme-text-disabled-on-light': 'rgba(0, 0, 0, 0.38)',
  '--mdc-theme-text-icon-on-light': 'rgba(0, 0, 0, 0.38)',
  '--mdc-theme-text-primary-on-dark': 'white',
  '--mdc-theme-text-secondary-on-dark': 'rgba(255, 255, 255, 0.7)',
  '--mdc-theme-text-hint-on-dark': 'rgba(255, 255, 255, 0.5)',
  '--mdc-theme-text-disabled-on-dark': 'rgba(255, 255, 255, 0.5)',
  '--mdc-theme-text-icon-on-dark': 'rgba(255, 255, 255, 0.5)'
};

const THEMES: { [key: string]: { [key: string]: string } } = {
  Baseline: {
    '--mdc-theme-primary': 'rgb(63, 58, 96)',
    '--mdc-theme-secondary':
      '#03dac4' /** Any theme option pointing to a valid CSS value. */
  },
  Crane: {
    '--mdc-theme-primary': '#5d1049',
    '--mdc-theme-secondary': '#fa3336'
  },
  Fortnightly: {
    '--mdc-theme-primary': '#303030',
    '--mdc-theme-secondary': '#661fff'
  },
  Miami: {
    '--mdc-theme-primary': '#fc318c',
    '--mdc-theme-secondary': '#31fcee'
  },
  Dark: {
    '--mdc-theme-background': '#212121',
    '--mdc-theme-surface': '#37474F',
    '--mdc-theme-on-surface': 'rgba(255,255,255,.87)',
    '--mdc-theme-primary': '#24aee9',
    '--mdc-theme-on-primary': 'rgba(255,255,255,.87)',
    '--mdc-theme-secondary': '#e539ff',
    '--mdc-theme-on-secondary': 'rgba(0,0,0,0.87)'
  }
};

export const getTheme = (themeName: string) => {
  const theme = {
    ...DEFAULT_THEME,
    ...(THEMES[themeName] || {})
  };

  const colors = getAutoColorsForTheme(theme);
  const merged: { [key: string]: string } = {
    ...TEXT_DEFAULTS,
    ...colors
  };

  const order: RMWC.ThemeOptionT[] = [
    'primary',
    'secondary',
    'error',
    'background',
    'surface',
    'onPrimary',
    'onSecondary',
    'onSurface',
    'onError',
    'textPrimaryOnBackground',
    'textSecondaryOnBackground',
    'textHintOnBackground',
    'textDisabledOnBackground',
    'textIconOnBackground',
    'textPrimaryOnLight',
    'textSecondaryOnLight',
    'textHintOnLight',
    'textDisabledOnLight',
    'textIconOnLight',
    'textPrimaryOnDark',
    'textSecondaryOnDark',
    'textHintOnDark',
    'textDisabledOnDark',
    'textIconOnDark'
  ];

  return order.reduce<{ [key: string]: string }>((acc, key) => {
    const newKey = `--mdc-theme-${toDashCase(key!)}`;
    acc[newKey] = merged[newKey];
    return acc;
  }, {});
};

const ColorBlock = ({
                      color,
                      size = 1.5
                    }: {
  color: string;
  size?: number;
}) => (
  <div
    style={{
      display: 'inline-block',
      backgroundColor: color,
      border: '1px solid rgba(0,0,0,.25)',
      verticalAlign: 'middle',
      marginLeft: '0.5rem',
      height: `${size}rem`,
      width: `${size}rem`,
      borderRadius: '3px',
      boxSizing: 'border-box'
    }}
  />
);
