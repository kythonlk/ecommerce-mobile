import { getWoocommerceApiConfig } from './apiConfig';

export async function fetchProducts(): Promise<Product[]> {
  const { Url, Key, Secret } = getWoocommerceApiConfig();
  const url = new URL(`${Url}/products`);
  url.searchParams.append('consumer_key', Key);
  url.searchParams.append('consumer_secret', Secret);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch products.');
    }
    const data = await response.json();
    return data.map(item => ({
      id: item.id,
      product_name: item.name,
      product_category: item.categories.map(cat => cat.name).join(', '),
      product_description: item.description,
      product_price: item.price,
      product_stock: item.stock_quantity,
      product_image: item.images[0]?.src || ''
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductDetails(productId: number): Promise<Product | null> {
  const { Url, Key, Secret } = getWoocommerceApiConfig();
  const url = new URL(`${Url}/products/${productId}`);
  url.searchParams.append('consumer_key', Key);
  url.searchParams.append('consumer_secret', Secret);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch product details.');
    }
    const item = await response.json();
    return {
      id: item.id,
      product_name: item.name,
      product_category: item.categories.map(cat => cat.name).join(', '),
      product_description: item.description,
      product_price: item.price,
      product_stock: item.stock_quantity,
      product_image: item.images[0]?.src || ''
    };
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

// export async function createOrder(orderData: CreateOrder): Promise<Order | null> {
//   try {
//     const response = await fetch(`${API_URL}/orders`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(orderData),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch order details.');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching order details:', error);
//     return null;
//   }
// }
