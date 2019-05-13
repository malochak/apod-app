import { createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import {tabNavigationElements, tabNavigatorConfig} from './TabBarConfig'

const TabNavigator = createMaterialTopTabNavigator(tabNavigationElements, tabNavigatorConfig)

export default AppContainer = createAppContainer(TabNavigator);