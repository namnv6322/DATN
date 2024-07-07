
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import moment from 'moment';
import { WarehouseContext } from './WarehouseContext';

const Namnv = () => {
  const currentDate = moment().format('DD/MM/YYYY');
  const { totalOrder, totalProduct, totalRevenue, soldProducts, fetchTotalProducts, fetchTotalOrders, fetchTotalRevenue, fetchSoldProducts } = useContext(WarehouseContext);

  useEffect(() => {
    fetchTotalProducts();
    fetchTotalOrders();
    fetchTotalRevenue();
    fetchSoldProducts();
  }, []);

  const renderSoldProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productQuantity}>{item.soldQuantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>NamNV</Text>
      </View>
      <Text style={styles.date}>Hôm nay, {currentDate}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Số đơn nhập</Text>
          <Text style={styles.statNumber}>{totalProduct}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Số đơn đặt</Text>
          <Text style={styles.statNumber}>{totalOrder}</Text>
        </View>
      </View>
      <View style={styles.revenueContainer}>
        <Text style={styles.revenueTitle}>Doanh thu</Text>
        <View style={styles.revenueContent}>
          <Text style={styles.revenueAmount}>{totalRevenue}$</Text>
        </View>
      </View>
      <View style={styles.revenueContainer}>
        <Text style={styles.revenueTitle}>Sản phẩm bán chạy</Text>
        <FlatList
          data={soldProducts.sort((a, b) => b.soldQuantity - a.soldQuantity)}
          renderItem={renderSoldProductItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.productList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
  },
  date: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statBox: {
    width: '45%',
    backgroundColor: '#ADD8E6',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'green',
  },
  revenueContainer: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  revenueTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: 'green',
  },
  revenueContent: {
    alignItems: 'center',
  },
  revenuePlaceholder: {
    fontSize: 16,
    color: '#888',
  },
  revenueAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'green',
  },
  productList: {
    paddingVertical: 10,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productName: {
    fontSize: 16,
  },
  productQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Namnv;
