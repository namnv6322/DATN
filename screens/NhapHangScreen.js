
import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { WarehouseContext } from './WarehouseContext';
import { useMQTT } from '../MQTT/MQTTProvider';

const NhapHangScreen = ({ navigation }) => {
  const { subscribe, message, sendMessage } = useMQTT();
  const { addHangHoa, fetchProducts, hangHoa } = useContext(WarehouseContext);
  const currentDate = moment().format('DD/MM/YYYY');
  const [productName, setProductName] = useState('');
  const [id, setId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');

  // Biến cờ để theo dõi lần render đầu tiên
  const isFirstRender = useRef(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Đặt cờ thành false sau lần render đầu tiên
      return;
    }
    if (message) {
      const newProduct = { id: message, name: `Sản phẩm ${message}`, quantity: 1, location: `Kho ${message}`, importDate: currentDate, exportDate: null };
      addHangHoa(newProduct);
    }
  }, [message]);

  const handleImport = () => {
    if (id && productName && quantity && location) {
      const newItem = {
        id,
        name: productName,
        quantity: parseInt(quantity),
        location,
        importDate: new Date().toLocaleDateString(),
        exportDate: null,
      };
      addHangHoa(newItem);
      fetchProducts(); // Cập nhật danh sách sản phẩm từ cơ sở dữ liệu
      // Reset các trường sau khi nhập
      setProductName('');
      setQuantity('');
      setLocation('');
      setId('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productText}>Tên hàng hóa: {item.name}</Text>
      <Text style={styles.productText}>Số lượng: {item.quantity}</Text>
      <Text style={styles.productText}>Vị trí kho: {item.location}</Text>
      <Text style={styles.date}>Ngày nhập: {item.importDate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Nhập Hàng</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => {
          subscribe('App');
          sendMessage('testTopic', '{nhap_hang}');
        }}>
          <Text style={styles.backButtonText}>AUTO</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Tên hàng hóa"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Số lượng"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Vị trí kho"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Xác nhận nhập hàng" onPress={handleImport} />
      <FlatList
        data={hangHoa}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  productList: {
    marginTop: 20,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productText: {
    fontSize: 16,
  },
});

export default NhapHangScreen;
