import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Namnv from './Namnv'
import NhapHangScreen from './NhapHangScreen';
import DatHangScreen from './DatHangScreen';
import Hanghoa from './Hanghoa';
import Settings from './Settings';
import { images, icons } from '../constants';
const Tab = createBottomTabNavigator();
export default function UITab() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false, tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#8E8E93',
            tabBarStyle: {
                paddingBottom: 5,
                height: 60,
            },
            tabBarLabelStyle: {
                fontSize: 14,  
                fontWeight: 'bold',
            },
        }}>
            <Tab.Screen name="Tổng quan" component={Namnv} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.home}
                        style={{ width: 24, height: 24, tintColor: focused ? '#007AFF' : '#8E8E93' }}
                    />
                )
            }} />
            <Tab.Screen name="Nhập hàng" component={NhapHangScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.shopping_bag}
                        style={{ width: 24, height: 24, tintColor: focused ? '#007AFF' : '#8E8E93' }}
                    />
                )
            }}/>
            <Tab.Screen name="Đặt hàng" component={DatHangScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.checkout}
                        style={{ width: 24, height: 24, tintColor: focused ? '#007AFF' : '#8E8E93' }}
                    />
                )
            }}/>
            <Tab.Screen name="Hàng hóa" component={Hanghoa} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.box}
                        style={{ width: 24, height: 24, tintColor: focused ? '#007AFF' : '#8E8E93' }}
                    />
                )
            }}/>
            <Tab.Screen name="Cài đặt" component={Settings} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.setting}
                        style={{ width: 24, height: 24, tintColor: focused ? '#007AFF' : '#8E8E93' }}
                    />
                )
            }}/>
        </Tab.Navigator>
    );
}