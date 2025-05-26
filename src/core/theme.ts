import React from 'react';

export type Theme = {
    headerColor?: string;
    backgroundColor?: string;
};

const defaultTheme: Theme = {};

const ThemeContext = React.createContext<Theme>(defaultTheme);
export default ThemeContext;
