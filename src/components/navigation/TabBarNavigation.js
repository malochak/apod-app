import React from 'react';
import { View, Text } from 'react-native';

import {createAppContainer} from 'react-navigation';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';

import {tabNavigationElements, tabNavigatorConfig} from './TabBarConfig'


const TabNavigator = createMaterialTopTabNavigator(tabNavigationElements, tabNavigatorConfig)

export default AppContainer = createAppContainer(TabNavigator);