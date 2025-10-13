import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import colors from '../../constants/colors';
import AppTextInput from '../../components/common/TextInput';
import AppButton from '../../components/common/Button';
import { getUserProfile, updateUserProfile } from '../../api/userApi';

const EditProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = await getUserProfile();
      setName(user.name);
      setEmail(user.email);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      await updateUserProfile({ name, email });
      Alert.alert('Success', 'Profile saved!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <AppTextInput placeholder="Name" value={name} onChangeText={setName} />
      <AppTextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <AppButton title="Save Changes" onPress={handleSave} />
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: colors.primary },
});
