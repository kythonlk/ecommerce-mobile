import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { ProductDetailsPageProps } from '../navigation/mainNav';
import useCartStore from '../navigation/cart';
import { fetchProductDetails } from '../api/api';

const ProductDetails = ({ route }: ProductDetailsPageProps) => {
  const { width } = useWindowDimensions();
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const { addProduct } = useCartStore((state) => ({
    addProduct: state.addProduct,
  }));

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const productData = await fetchProductDetails(id);
    if (productData) {
      setProduct(productData);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addProduct({ ...product, quantity: 1 });
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {product && (
          <>
            <View style={styles.productImageContainer}>
              <Image style={styles.productImage} source={{ uri: product.product_image }} />
            </View>
            <Text style={styles.productName}>{product.product_name}</Text>
            <Text style={styles.productCategory}>{product.product_category}</Text>
            <RenderHtml
              contentWidth={width}
              source={{ html: product.product_description || "" }}
            />
            <View style={styles.productPriceContainer}>
              <Text style={styles.productPrice}>Price: AED {product.product_price}</Text>
              <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScrollView>
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
    resizeMode: 'cover',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccfff',
  },
  productImageContainer: {

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
  productPriceContainer:{
    backgroundColor :"#fff",
  }
});

export default ProductDetails;
