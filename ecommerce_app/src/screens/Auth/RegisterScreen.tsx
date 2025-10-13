import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { register as registerApi } from '../../api/authApi';
import colors from '../../constants/colors';
import AppTextInput from '../../components/common/TextInput';
import AppButton from '../../components/common/Button';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await registerApi({ name, email, password });
      Alert.alert('Success', 'Account created! Please login.');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <AppTextInput placeholder="Name" value={name} onChangeText={setName} />
      <AppTextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <AppTextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <AppButton title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: colors.background },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: colors.primary },
});
