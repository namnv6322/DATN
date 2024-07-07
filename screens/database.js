
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'warehouse.db',
    location: 'default',
  },
  () => {
    console.log('Database opened or created');
  },
  error => {
    console.log('Error opening database', error);
  }
);

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT,
        quantity INTEGER,
        location TEXT,
        importDate TEXT,
        exportDate TEXT
      )`,
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Error creating table', error);
      }
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS totals (
        id INTEGER PRIMARY KEY,
        totalProducts INTEGER,
        totalOrders INTEGER,
        totalRevenue INTEGER
      )`,
      [],
      () => {
        console.log('Table totals created successfully');
      },
      error => {
        console.log('Error creating table totals', error);
      }
    );
  });
};

export const addProduct = (item) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO products (id, name, quantity, location, importDate, exportDate) VALUES (?, ?, ?, ?, ?, ?)`,
      [item.id, item.name, item.quantity, item.location, item.importDate, null],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('Product added successfully');
          updateTotalProducts(item.quantity);
        }
      },
      error => {
        console.log('Error adding product', error);
      }
    );
  });
};

export const updateProductQuantity = (id, quantity) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE products SET quantity = ? WHERE id = ?',
      [quantity, id],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('Product quantity updated successfully');
        }
      },
      error => {
        console.log('Error updating product quantity', error);
      }
    );
  });
};

export const updateProductExportDate = (id, exportDate) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE products SET exportDate = ? WHERE id = ?',
      [exportDate, id],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('Product export date updated successfully');
        }
      },
      error => {
        console.log('Error updating product export date', error);
      }
    );
  });
};

export const updateTotalProducts = (quantity) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE totals SET totalProducts = totalProducts + ? WHERE id = 1',
      [quantity],
      (tx, results) => {
        if (results.rowsAffected === 0) {
          tx.executeSql(
            'INSERT INTO totals (id, totalProducts) VALUES (1, ?)',
            [quantity],
            (tx, results) => {
              console.log('Total products initialized successfully');
            }
          );
        }
      },
      error => {
        console.log('Error updating total products', error);
      }
    );
  });
};

export const updateTotalOrders = () => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE totals SET totalOrders = totalOrders + 1 WHERE id = 1',
      [],
      (tx, results) => {
        if (results.rowsAffected === 0) {
          tx.executeSql(
            'INSERT INTO totals (id, totalOrders) VALUES (1, 1)',
            [],
            (tx, results) => {
              console.log('Total orders initialized successfully');
            }
          );
        }
      },
      error => {
        console.log('Error updating total orders', error);
      }
    );
  });
};

export const updateTotalRevenue = (revenue) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE totals SET totalRevenue = totalRevenue + ? WHERE id = 1',
      [revenue],
      (tx, results) => {
        if (results.rowsAffected === 0) {
          tx.executeSql(
            'INSERT INTO totals (id, totalRevenue) VALUES (1, ?)',
            [revenue],
            (tx, results) => {
              console.log('Total revenue initialized successfully');
            }
          );
        }
      },
      error => {
        console.log('Error updating total revenue', error);
      }
    );
  });
};

export const getProducts = (setProducts) => {
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

export const getTotalProducts = (setTotal) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT totalProducts FROM totals WHERE id = 1',
      [],
      (tx, results) => {
        if (results.rows.length > 0) {
          setTotal(results.rows.item(0).totalProducts || 0);
        } else {
          setTotal(0);
        }
      },
      error => {
        console.log('Error fetching total products', error);
      }
    );
  });
};

export const getTotalOrders = (setTotal) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT totalOrders FROM totals WHERE id = 1',
      [],
      (tx, results) => {
        if (results.rows.length > 0) {
          setTotal(results.rows.item(0).totalOrders || 0);
        } else {
          setTotal(0);
        }
      },
      error => {
        console.log('Error fetching total orders', error);
      }
    );
  });
};

export const getTotalRevenue = (setTotal) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT totalRevenue FROM totals WHERE id = 1',
      [],
      (tx, results) => {
        if (results.rows.length > 0) {
          setTotal(results.rows.item(0).totalRevenue || 0);
        } else {
          setTotal(0);
        }
      },
      error => {
        console.log('Error fetching total revenue', error);
      }
    );
  });
};

export const getSoldProducts = (setSoldProducts) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT name, SUM(quantity) as soldQuantity FROM products WHERE exportDate IS NOT NULL GROUP BY name',
      [],
      (tx, results) => {
        const rows = results.rows;
        let products = [];
        for (let i = 0; i < rows.length; i++) {
          products.push(rows.item(i));
        }
        setSoldProducts(products);
      },
      error => {
        console.log('Error fetching sold products', error);
      }
    );
  });
};

export const deleteAllProducts = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM products',
      [],
      (tx, results) => {
        console.log('All products deleted successfully');
      },
      error => {
        console.log('Error deleting all products', error);
      }
    );
  });
};
