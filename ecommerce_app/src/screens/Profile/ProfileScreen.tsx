import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import colors from '../../constants/colors';
import AppTextInput from '../../components/common/TextInput';
import AppButton from '../../components/common/Button';
import { getUserProfile, updateUserProfile } from '../../api/userApi';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = await getUserProfile();
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUserProfile({ name, email, phone });
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <AppTextInput placeholder="Full Name" value={name} onChangeText={setName} />
      <AppTextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <AppTextInput placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <AppButton title="Update Profile" onPress={handleUpdate} />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: colors.primary },
});
