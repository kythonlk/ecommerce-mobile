import { NavigationContainer } from '@react-navigation/native';
import ProductsStackNav from './src/navigation/mainNav';

export default function App() {
  return (
    <NavigationContainer>
      <ProductsStackNav />
    </NavigationContainer>
  );
}
