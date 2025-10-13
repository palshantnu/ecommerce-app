import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import colors from '../../constants/colors';
import AppTextInput from '../../components/common/TextInput';
import AppButton from '../../components/common/Button';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    Alert.alert('Password Reset', `Password reset link sent to ${email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <AppTextInput placeholder="Enter your email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <AppButton title="Reset Password" onPress={handleReset} />
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: colors.background },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: colors.primary },
});
