
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { WarehouseContext } from './WarehouseContext';
import { images, icons } from '../constants';
import { useMQTT } from '../MQTT/MQTTProvider';

const DatHangScreen = ({ navigation }) => {
  const { hangHoa, placeOrder, fetchProducts } = useContext(WarehouseContext);
  const { sendMessage } = useMQTT();

  const handleOrder = (item) => {
    placeOrder(item.id);
    sendMessage('testTopic', `{san_pham_${item.id}}`);
    fetchProducts(); // Cập nhật danh sách sản phẩm sau khi đặt hàng
  };

  // Lọc ra những sản phẩm có số lượng > 0
  const filteredProducts = hangHoa.filter(item => item.quantity > 0);

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={images.product} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>Mô tả: Mô tả sản phẩm</Text>
        <Text style={styles.productPrice}>Price: 1000$</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => handleOrder(item)}>
        <Image source={icons.cart} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.addToFavoritesButton}>
        <Image source={icons.heart} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Danh sách sản phẩm</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => sendMessage('testTopic', '{dat_hang}')}>
          <Text style={styles.backButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  headerButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productList: {
    padding: 20,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#D8D9DA',
    borderRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
  },
  addToCartButton: {
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 5,
  },
  addToFavoritesButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default DatHangScreen;
