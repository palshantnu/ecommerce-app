import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Types
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  totalOrders: number;
  defaultShipping: ShippingAddress;
}

interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<'personal' | 'shipping'>('personal');
  
  const [profile, setProfile] = useState<UserProfile>({
    id: 'USR-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    joinDate: 'January 2023',
    totalOrders: 47,
    defaultShipping: {
      fullName: 'Sarah Johnson',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true,
    },
  });

  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handlePersonalInfoChange = (field: keyof UserProfile, value: string) => {
    setTempProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleShippingChange = (field: keyof ShippingAddress, value: string) => {
    setTempProfile(prev => ({
      ...prev,
      defaultShipping: {
        ...prev.defaultShipping,
        [field]: value,
      },
    }));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#2C3E50" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>My Profile</Text>
      {!isEditing ? (
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Ionicons name="create-outline" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      ) : (
        <View style={styles.editButton} />
      )}
    </View>
  );

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: tempProfile.avatar }}
          style={styles.avatar}
        />
        {isEditing && (
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.profileInfo}>
        <Text style={styles.name}>{tempProfile.name}</Text>
        <Text style={styles.email}>{tempProfile.email}</Text>
        <Text style={styles.memberSince}>Member since {tempProfile.joinDate}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profile.totalOrders}</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
        </View>
      </View>
    </View>
  );

  const renderNavigationTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[
          styles.tab,
          activeSection === 'personal' && styles.activeTab
        ]}
        onPress={() => setActiveSection('personal')}
      >
        <Ionicons 
          name="person-outline" 
          size={20} 
          color={activeSection === 'personal' ? '#FF6B6B' : '#666'} 
        />
        <Text style={[
          styles.tabText,
          activeSection === 'personal' && styles.activeTabText
        ]}>
          Personal
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          styles.tab,
          activeSection === 'shipping' && styles.activeTab
        ]}
        onPress={() => setActiveSection('shipping')}
      >
        <Ionicons 
          name="location-outline" 
          size={20} 
          color={activeSection === 'shipping' ? '#FF6B6B' : '#666'} 
        />
        <Text style={[
          styles.tabText,
          activeSection === 'shipping' && styles.activeTabText
        ]}>
          Shipping
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPersonalInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Full Name</Text>
        {isEditing ? (
          <TextInput
            style={styles.textInput}
            value={tempProfile.name}
            onChangeText={(text) => handlePersonalInfoChange('name', text)}
            placeholder="Enter your full name"
          />
        ) : (
          <Text style={styles.fieldValue}>{profile.name}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Email Address</Text>
        {isEditing ? (
          <TextInput
            style={styles.textInput}
            value={tempProfile.email}
            onChangeText={(text) => handlePersonalInfoChange('email', text)}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        ) : (
          <Text style={styles.fieldValue}>{profile.email}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Phone Number</Text>
        {isEditing ? (
          <TextInput
            style={styles.textInput}
            value={tempProfile.phone}
            onChangeText={(text) => handlePersonalInfoChange('phone', text)}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        ) : (
          <Text style={styles.fieldValue}>{profile.phone}</Text>
        )}
      </View>
    </View>
  );

  const renderShippingInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Default Shipping Address</Text>
      
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Full Name</Text>
        {isEditing ? (
          <TextInput
            style={styles.textInput}
            value={tempProfile.defaultShipping.fullName}
            onChangeText={(text) => handleShippingChange('fullName', text)}
            placeholder="Enter recipient name"
          />
        ) : (
          <Text style={styles.fieldValue}>{profile.defaultShipping.fullName}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Address Line 1</Text>
        {isEditing ? (
          <TextInput
            style={styles.textInput}
            value={tempProfile.defaultShipping.addressLine1}
            onChangeText={(text) => handleShippingChange('addressLine1', text)}
            placeholder="Street address"
          />
        ) : (
          <Text style={styles.fieldValue}>{profile.defaultShipping.addressLine1}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Address Line 2 (Optional)</Text>
        {isEditing ? (
          <TextInput
            style={styles.textInput}
            value={tempProfile.defaultShipping.addressLine2 || ''}
            onChangeText={(text) => handleShippingChange('addressLine2', text)}
            placeholder="Apt, suite, unit, etc."
          />
        ) : (
          <Text style={styles.fieldValue}>
            {profile.defaultShipping.addressLine2 || 'Not provided'}
          </Text>
        )}
      </View>

      <View style={styles.row}>
        <View style={[styles.fieldContainer, styles.halfWidth]}>
          <Text style={styles.fieldLabel}>City</Text>
          {isEditing ? (
            <TextInput
              style={styles.textInput}
              value={tempProfile.defaultShipping.city}
              onChangeText={(text) => handleShippingChange('city', text)}
              placeholder="City"
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.defaultShipping.city}</Text>
          )}
        </View>

        <View style={[styles.fieldContainer, styles.halfWidth]}>
          <Text style={styles.fieldLabel}>State</Text>
          {isEditing ? (
            <TextInput
              style={styles.textInput}
              value={tempProfile.defaultShipping.state}
              onChangeText={(text) => handleShippingChange('state', text)}
              placeholder="State"
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.defaultShipping.state}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.fieldContainer, styles.halfWidth]}>
          <Text style={styles.fieldLabel}>ZIP Code</Text>
          {isEditing ? (
            <TextInput
              style={styles.textInput}
              value={tempProfile.defaultShipping.zipCode}
              onChangeText={(text) => handleShippingChange('zipCode', text)}
              placeholder="ZIP code"
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.defaultShipping.zipCode}</Text>
          )}
        </View>

        <View style={[styles.fieldContainer, styles.halfWidth]}>
          <Text style={styles.fieldLabel}>Country</Text>
          {isEditing ? (
            <TextInput
              style={styles.textInput}
              value={tempProfile.defaultShipping.country}
              onChangeText={(text) => handleShippingChange('country', text)}
              placeholder="Country"
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.defaultShipping.country}</Text>
          )}
        </View>
      </View>
    </View>
  );

  const renderActionButtons = () => {
    if (!isEditing) return null;

    return (
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfo();
      case 'shipping':
        return renderShippingInfo();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {renderProfileHeader()}
        {renderNavigationTabs()}
        {renderCurrentSection()}
        <View style={styles.spacer} />
      </ScrollView>
      
      {renderActionButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop:  10,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  editButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECF0',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FF6B6B',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF6B6B',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#95A5A6',
  },
  statsContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B6B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECF0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B6B',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#FF6B6B',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7F8C8D',
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 16,
    color: '#2C3E50',
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  textInput: {
    fontSize: 16,
    color: '#2C3E50',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E8ECF0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8ECF0',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E8ECF0',
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  spacer: {
    height: 100,
  },
});

export default ProfileScreen;