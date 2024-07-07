
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useMQTT } from '../MQTT/MQTTProvider';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { deleteAllProducts } from './database';  // Import hàm xóa tất cả dữ liệu

const Settings = ({ navigation }) => {
  const { sendMessage, disconnected } = useMQTT();

  const handleStop = () => {
    sendMessage('testTopic', '{stop}');
  };

  const handleLogout = () => {
    disconnected();
    navigation.navigate('Welcome');
  };

  const handleExportDatabase = async () => {
    try {
      const dbPath = `${RNFS.DocumentDirectoryPath}/warehouse.db`;
      const exists = await RNFS.exists(dbPath);

      if (exists) {
        const shareOptions = {
          title: 'Export Database',
          url: `file://${dbPath}`,
          failOnCancel: false,
        };

        Share.open(shareOptions)
          .then((res) => console.log(res))
          .catch((err) => {
            err && console.log(err);
          });
      } else {
        Alert.alert('Error', 'Database file not found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to export database');
    }
  };

  const handleDeleteAllProducts = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa tất cả dữ liệu?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            deleteAllProducts();
            Alert.alert('Thông báo', 'Tất cả dữ liệu đã được xóa');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStop}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.exportButton]} onPress={handleExportDatabase}>
          <Text style={styles.buttonText}>Export Database</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteAllProducts}>
          <Text style={styles.buttonText}>Delete All Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={() => navigation.navigate('ViewDatabase')}>
          <Text style={styles.buttonText}>View Database</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: '#FF9500',
  },
  exportButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
  },
  viewButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Settings;
