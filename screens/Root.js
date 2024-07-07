import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './Welcome';
import ViewDatabaseScreen from './ViewDatabaseScreen';
import UITab from './UITab';
import { WarehouseProvider } from './WarehouseContext';
import MQTTProvider from '../MQTT/MQTTProvider';

const Stack = createNativeStackNavigator();
export default function Root() {
    return (
        <MQTTProvider>
        <WarehouseProvider>
        <NavigationContainer>
            {/* Rest of your app code */}
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="UITab" component={UITab} />
                <Stack.Screen name="ViewDatabase" component={ViewDatabaseScreen} options={{ title: 'Xem Cơ Sở Dữ Liệu' }} />
            </Stack.Navigator>
        </NavigationContainer>
        </WarehouseProvider>
        </MQTTProvider>
    );
}