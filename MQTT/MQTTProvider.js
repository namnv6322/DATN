import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {}
});

const MQTTContext = createContext();

const MQTTProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [status, setStatus] = useState('disconnected');
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const options = {
      host: '00223d1dc96f4e34a761a5b5ee950faa.s1.eu.hivemq.cloud',
      port: 8884,
      id: 'App_to_devices',
    };
    const newClient = new Paho.MQTT.Client(options.host, options.port, options.id);
    newClient.onConnectionLost = onConnectionLost;
    newClient.onMessageArrived = onMessageArrived;
    setClient(newClient);
  }, []);

  const onConnect = () => {
    console.log('Connected to MQTT broker');
    setStatus('connected');
  };

  const onFailure = (err) => {
    console.log('Connect failed!', err);
    setStatus('failed');
  };

  const connect = () => {
    if (client) {
      setStatus('connecting');
      client.connect({
        onSuccess: onConnect,
        userName: "namnv1",
        password: "matkhau63",
        useSSL: false,
        timeout: 3,
        onFailure: onFailure,
      });
    }
  };

  const onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
    setStatus('disconnected');
  };

  const onMessageArrived = (message) => {
    console.log('onMessageArrived:' + message.payloadString);
    setMessage(message.payloadString);
    //setMessageList((prevMessageList) => [message.payloadString, ...prevMessageList]);
  };

  const sendMessage = (topic, message) => {
    if (client && status === 'connected') {
      const newMessage = new Paho.MQTT.Message(message);
      newMessage.destinationName = topic;
      client.send(newMessage);
    }
  };

  const subscribe = (topic) => {
    if (client && status === 'connected') {
      client.subscribe(topic, { qos: 0 });
    }
  };

  const unsubscribe = (topic) => {
    if (client && status === 'connected') {
      client.unsubscribe(topic);
    }
  };
  const disconnected = ()=>{
    client.disconnect();
    console.log('disconnect');
    setStatus('disconnect');
  }

  return (
    <MQTTContext.Provider value={{ connect, sendMessage, subscribe, unsubscribe, status, message, disconnected}}>
      {children}
    </MQTTContext.Provider>
  );
};

export const useMQTT = () => useContext(MQTTContext);

export default MQTTProvider;
