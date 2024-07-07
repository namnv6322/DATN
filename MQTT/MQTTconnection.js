/* @flow */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
class MQTTconnection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topic: 'testTopic',
      subscribedTopic: '',
      message: 'dsdas',
      messageList: [],
      status: ''
    };
    props.client.onConnectionLost = this.onConnectionLost;
    props.client.onMessageArrived = this.onMessageArrived;
    // this.testRef = this.testRef.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }
  testRef = () => {
    console.log('Test ref');
  }
  onConnect = () => {
    console.log('onConnect');
    this.setState({ status: 'connected' });
  }
  onFailure = (err) => {
    console.log('Connect failed!');
    console.log(err);
    this.setState({ status: 'failed' });
  }
  connect = () => {
    console.log('connecting');
    this.setState(
      { status: 'isFetching' },
      () => {
        this.props.client.connect({
          onSuccess: this.onConnect,
          userName: "namnv1",
          password: "matkhau63",
          useSSL: false,
          timeout: 3,
          onFailure: this.onFailure
        });
      }
    );
  }
  disconnect = () => {
    this.props.client.disconnect();
    console.log('disconnect');
    this.setState({ status: '', subscribedTopic: '' });
  }
  onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  }
  onMessageArrived = (message) => {
    console.log('onMessageArrived:' + message.payloadString);
    newmessageList = this.state.messageList;
    newmessageList.unshift(message.payloadString);
    this.setState({ messageList: newmessageList });
    // this.MessageListRef.scrollToEnd({animated: false});
  }
  onChangeTopic = (text) => {
    this.setState({ topic: text });
  }
  subscribeTopic = () => {
    console.log('subscribing');
    this.setState(
      { subscribedTopic: this.state.topic },
      () => {
        this.props.client.subscribe(this.state.subscribedTopic, { qos: 0 });
      }
    );
  }
  unSubscribeTopic = () => {
    this.props.client.unsubscribe(this.state.subscribedTopic);
    this.setState({ subscribedTopic: '' });
  }
  onChangeMessage = (text) => {
    this.setState({ message: text });
  }
  sendMessage = (descrition) => {
    console.log('sending');
    var message = new Paho.MQTT.Message(descrition);
    message.destinationName = this.state.subscribedTopic;
    this.props.client.send(message);
  }
  test = () => {

  }
  // componentDidMount() {
  //   this.connect();
  //   this.subscribeTopic();
  // }
  componentDidUpdate(prevProps) {
    //console.log('as');
    if (this.props.feature != prevProps.feature) {
      if (this.props.feature === 'connect')
        this.connect();
      else if (this.props.feature === 'disconnect')
        this.disconnect();
      else if (this.props.feature === 'subscribe')
        this.subscribeTopic();
      else if (this.props.feature === 'unsubscribe')
        this.unSubscribeTopic();
      else if (this.props.feature === 'public') {
        this.sendMessage();
      }
    }
  }
  renderRow = ({ item, index }) => {
    idMessage = item.split(':');
    console.log('>>>ITEM', item);
    return (
      <View
        style={[
          styles.componentMessage,
          idMessage[0] == this.props.options.id ?
            styles.myMessageComponent
            :
            (idMessage.length == 1 ? styles.introMessage : styles.messageComponent),
        ]}
      >
        <Text style={idMessage.length == 1 ? styles.textIntro : styles.textMessage}>
          {item}
        </Text>
      </View>
    )
  }
  _keyExtractor = (item, index) => item + index;
  render() {
    const { status, messageList } = this.state;
    return (
      <View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
  messageBox: {
    margin: 16,
    flex: 1,
  },
  myMessageComponent: {
    backgroundColor: 'yellow',
    borderRadius: 3,
    padding: 5,
    marginBottom: 5,
  },
  messageComponent: {
    marginBottom: 5,
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 3,
  },
  introMessage: {
  },
  textInput: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 5,
  },
  textIntro: {
    color: 'black',
    fontSize: 12,
  },
  textMessage: {
    color: 'white',
    fontSize: 16,
  },
});

export default MQTTconnection;