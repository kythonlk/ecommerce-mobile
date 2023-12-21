import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import mockData from './products.json';
import { fetchProducts } from '../api/api'; 
import { ProductsPageProps } from '../navigation/mainNav';

const Products = ({ navigation }: ProductsPageProps) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    loadProducts();
  }, []);

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate('ProductDetails', { id: item.id })}>
      <Image style={styles.productImage} source={{ uri: item.product_image }} />
      <Text style={styles.productName}>{truncateText(item.product_name, 20)}</Text>
      <Text style={styles.productPrice}>AED{item.product_price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={products} renderItem={renderProductItem} keyExtractor={(item) => item.id.toString()} numColumns={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  productItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  productPrice: {
    marginTop: 4,
    fontSize: 14,
    color: 'black',
  },
});

export default Products;
