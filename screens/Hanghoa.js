
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { WarehouseContext } from './WarehouseContext';

const Hanghoa = ({ navigation }) => {
  const { hangHoa, fetchProducts } = useContext(WarehouseContext);

  useEffect(() => {
    fetchProducts(); // Lấy dữ liệu sản phẩm từ cơ sở dữ liệu khi màn hình được tải
  }, []);

  // Lọc ra những sản phẩm có số lượng > 0
  const filteredProducts = hangHoa.filter(item => item.quantity > 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hàng hóa</Text>
        <View style={styles.rightButton}></View>
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemText}>Số lượng: {item.quantity}</Text>
            <Text style={styles.itemText}>Ngày nhập: {item.importDate}</Text>
            <Text style={styles.itemText}>Vị trí kho: {item.location}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rightButton: {
    width: 50, // Đảm bảo tiêu đề của header nằm giữa
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'green',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default Hanghoa;
