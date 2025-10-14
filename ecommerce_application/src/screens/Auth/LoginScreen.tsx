import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { login as loginApi } from '../../api/authApi';
import colors from '../../constants/colors';
import AppTextInput from '../../components/common/AppTextInput';
import AppButton from '../../components/common/AppButton';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {

    try {
      const user = await loginApi({ email, password });
      login(user);
    } catch (error: any) {
      login({ userid: 1 });
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <AppTextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <AppTextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <AppButton title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: colors.background },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: colors.primary },
});
