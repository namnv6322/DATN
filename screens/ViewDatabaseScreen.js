/*import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'warehouse.db',
    location: 'default',
  },
  () => {
    console.log('Database opened');
  },
  error => {
    console.log('Error opening database', error);
  }
);

const ViewDatabaseScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM products',
        [],
        (tx, results) => {
          const rows = results.rows;
          let products = [];
          for (let i = 0; i < rows.length; i++) {
            products.push(rows.item(i));
          }
          setProducts(products);
        },
        error => {
          console.log('Error fetching products', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Xem Cơ Sở Dữ Liệu</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>ID: {item.id}</Text>
            <Text style={styles.itemText}>Tên: {item.name}</Text>
            <Text style={styles.itemText}>Số lượng: {item.quantity}</Text>
            <Text style={styles.itemText}>Vị trí kho: {item.location}</Text>
            <Text style={styles.itemText}>Ngày nhập: {item.importDate}</Text>
            <Text style={styles.itemText}>Ngày xuất: {item.exportDate || 'Chưa xuất'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
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

export default ViewDatabaseScreen;
*/



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'warehouse.db',
    location: 'default',
  },
  () => {
    console.log('Database opened');
  },
  error => {
    console.log('Error opening database', error);
  }
);

const ViewDatabaseScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM products',
        [],
        (tx, results) => {
          const rows = results.rows;
          let products = [];
          for (let i = 0; i < rows.length; i++) {
            products.push(rows.item(i));
          }
          setProducts(products);
        },
        error => {
          console.log('Error fetching products', error);
        }
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Xem Cơ Sở Dữ Liệu</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>ID</Text>
          <Text style={styles.tableHeaderText}>Tên</Text>
          <Text style={styles.tableHeaderText}>Số lượng</Text>
          <Text style={styles.tableHeaderText}>Vị trí kho</Text>
          <Text style={styles.tableHeaderText}>Ngày nhập</Text>
          <Text style={styles.tableHeaderText}>Ngày xuất</Text>
        </View>
        {products.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.id}</Text>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>{item.location}</Text>
            <Text style={styles.tableCell}>{item.importDate}</Text>
            <Text style={styles.tableCell}>{item.exportDate || 'Chưa xuất'}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CED4DA',
    paddingBottom: 8,
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
  table: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E9ECEF',
    borderBottomWidth: 1,
    borderBottomColor: '#CED4DA',
  },
  tableHeaderText: {
    flex: 1,
    padding: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#495057',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CED4DA',
  },
  tableCell: {
    flex: 1,
    padding: 12,
    textAlign: 'center',
    color: '#495057',
  },
});

export default ViewDatabaseScreen;
