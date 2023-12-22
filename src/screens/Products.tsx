import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import mockData from './products.json';
import {fetchProducts , fetchCategories} from '../api/api';
import {ProductsPageProps } from '../navigation/mainNav';

const Products = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadProductsAndCategories = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
      }

      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories.slice(0, 4));
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    loadProductsAndCategories();
  }, []);


  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetails', { id: item.id })}>
      <Image style={styles.productImage} source={{ uri: item.product_image }} />
      <Text style={styles.productName}>{item.product_name}</Text>
      <Text style={styles.productPrice}>AED{item.product_price}</Text>
    </TouchableOpacity>
  );

  // const renderCategoryItem = ({ item }) => (
  //   <TouchableOpacity style={styles.card}>
  //     <Text style={styles.cardText}>{item.name}</Text>
  //   </TouchableOpacity>
  // );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.card}>
            <Text style={styles.cardText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Catogeries')}>
        <Text style={styles.buttonText}>View All Categories</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Products</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        style={styles.productList}
      />
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
    borderWidth: 1,
    borderColor: '#ccc',
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
  card: {
    flex: 1,
    margin: 2,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  buttonText : {
    padding : 10,
  }
});

export default Products;
