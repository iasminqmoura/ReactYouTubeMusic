import React from 'react';
import Routes from './src/routes';
import { StatusBar } from 'react-native';
import { Colors } from './src/colors';

export default function App() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={Colors.barraNavegacao} />
            <Routes />
        </>
    );
}
