/**
 * @format
 */
import React from 'react';
import {Text} from 'react-native';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Welcome,Home, NhapHangScreen, DatHangScreen, Namnv, Hanghoa, Root} from './screens';
import MQTTconnection from './MQTT/MQTTconnection'
import App from './App';
import BasicFlatList from './components/BasicFlatList';
import test from './components/test';


//AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerComponent(appName, () => () => <Root />);

//AppRegistry.registerComponent(appName, () => BasicFlatList);
//AppRegistry.registerComponent(appName, () => test);