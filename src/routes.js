import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from './pages/main-page';
import LoginPage from './pages/login-page';
import SearchPage from './pages/search-page';

const Stack = createStackNavigator();

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={MainPage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Search" component={SearchPage} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;
