import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation';
import { AuthProvider } from './src/context/AuthContext';
import colors from './src/constants/colors';
import { CartProvider } from './src/context/CartContext';
import SplashScreen from 'react-native-splash-screen';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

    useEffect(() => {
      // Hide splash screen after loading
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000); // optional delay for demo
    }, []);
  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.primary}
        translucent={false}
      />
      <AuthProvider>
      <CartProvider>
        <AppContent />
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <SafeAreaView
      edges={['top', 'bottom', 'left', 'right']}
      style={[
        styles.container,
        // { paddingTop: safeAreaInsets.top }
      ]}
    >
      {/* <NavigationContainer> */}
        <AppNavigator />
      {/* </NavigationContainer> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary || '#fff'
  },
});

export default App;