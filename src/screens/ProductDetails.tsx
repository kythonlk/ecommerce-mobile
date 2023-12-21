import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import mockData from './products.json';
import { ProductDetailsPageProps } from '../navigation/mainNav';
import useCartStore from '../navigation/cart';

const ProductDetails = ({ route }: ProductDetailsPageProps) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const { addProduct } = useCartStore((state) => ({
    addProduct: state.addProduct,
  }));

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    const productData = mockData.products.find((product) => product.id === id);
    if (productData) {
      setProduct(productData);
    }
  };

  const handleAddToCart = () => {
    addProduct({ ...product, quantity: 1 });
  };

  return (
    <View style={styles.container}>
      {product && (
        <>
          <Image style={styles.productImage} source={{ uri: product.product_image }} />
          <Text style={styles.productName}>{product.product_name}</Text>
          <Text style={styles.productCategory}>{product.product_category}</Text>
          <Text style={styles.productDescription}>{product.product_description}</Text>
          <Text style={styles.productPrice}>Price: ${product.product_price}</Text>
          
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  productName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  productCategory: {
    marginTop: 5,
    fontSize: 16,
    color: '#666',
  },
  productDescription: {
    marginTop: 10,
    fontSize: 16,
  },
  productPrice: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  addToCartButton: {
    marginTop: 20,
    backgroundColor: '#1FE687',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetails;
