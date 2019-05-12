import {createAppContainer} from 'react-navigation';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';

import {tabNavigationElements, tabNavigatorConfig} from './'

const TabNavigator = createMaterialTopTabNavigator(tabNavigationElements, tabNavigatorConfig)

export default AppContainer = createAppContainer(TabNavigator);