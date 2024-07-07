import React, { Component } from "react";
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import flatListData from "../data/flatListData";
import { images } from "../constants";
import MQTTconnection from "../MQTT/MQTTconnection";
import { Input, Button } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {}
});
const options = {
    host: '00223d1dc96f4e34a761a5b5ee950faa.s1.eu.hivemq.cloud',
    port: 8884,
    //path: '/wss',
    id: 'App_to_devices',
};
client = new Paho.MQTT.Client(options.host, options.port, options.id);
export default class test extends Component {
    state = {
        feature: '12',
    }
    render() {
        return (
            <View>
                <View>
                    <MQTTconnection options={options} client={client} feature={this.state.feature} />
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => { this.setState({ feature: 'connect' }) }}>
                        <Text>connect</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.setState({ feature: 'disconnect' }) }}>
                        <Text> disconnect </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.setState({ feature: 'subscribe' }) }}>
                        <Text>subscribe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.setState({ feature: 'unsubscribe' }) }}>
                        <Text> unsubscribe </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.setState({ feature: 'public' }) }}>
                        <Text> public </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}
