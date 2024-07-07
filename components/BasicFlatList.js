import React, { Component } from "react";
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import flatListData from "../data/flatListData";
import { images } from "../constants";
import MQTTconnection from "../MQTT/MQTTconnection";

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
    id: 'App_to_devices',
};
client = new Paho.MQTT.Client(options.host, options.port, options.id);

class FlatListItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'green',
                }}>
                    <Image
                        source={{ uri: this.props.item.uri }}
                        style={{ width: 100, height: 100, margin: 5 }}
                    >
                    </Image>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        //backgroundColor: 'black'
                    }}>
                        <Text style={styles.flatListItem}> {this.props.item.name} </Text>
                        <Text style={styles.flatListItem}> {this.props.item.foodDescription} </Text>
                        <View style={{
                            backgroundColor: 'white',
                            height: 30,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity
                                onPress={this.props.action}>
                                <Image
                                    style={{
                                        height: 25,
                                        width: 25,
                                    }}
                                    source={images.cart}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={{
                    flex: 1,
                    height: 1,
                }}>
                </View>
            </View>

        );
    }
}
export default class BasicFlatList extends Component {
    constructor(props) {
        super(props)
        this.MQTTRef = React.createRef();
    }
    state = {
        feature: '',
        message: '',
    }
    _onPressAdd() {
        alert("you press button");
    }
    render() {

        return (
            <View style={{
                flex: 1,
                marginTop: 0
            }}>

                <MQTTconnection options={options} client={client} feature={this.state.feature} message={this.state.message} ref={this.MQTTRef} />
                <View style={{
                    backgroundColor: 'tomato',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingRight: 10,
                    height: 50,
                }}>
                    <TouchableOpacity onPress={() => { this.setState({ feature: 'connect' }) }}>
                        <Text> connect </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.setState({ feature: 'subscribe' }) }}>
                        <Text> subscribe </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.setState({ feature: 'disconnect' }) }}>
                        <Text> disconnect </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._onPressAdd}>
                        <Image style={{
                            height: 35,
                            width: 35,
                        }}
                            source={images.add}>

                        </Image>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={flatListData}
                    renderItem={({ item, index }) => {
                        return (
                            <FlatListItem
                                item={item}
                                index={index}
                                action={() => {
                                    // this.MQTTRef.current.testRef();
                                    // this.setState({message:item.send_Mqtt});
                                    // this.setState({feature: 'public'})
                                    this.MQTTRef.current.sendMessage(item.send_Mqtt);
                                }}
                            >

                            </FlatListItem>
                        );
                    }}>

                </FlatList>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
    }
})