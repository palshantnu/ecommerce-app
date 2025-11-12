// screens/Settings/SettingsScreen.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Switch,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [locationAccess, setLocationAccess] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);
    const navigation = useNavigation();
    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: () => console.log('User logged out') },
            ]
        );
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'This action cannot be undone. All your data will be permanently deleted.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => console.log('Account deleted') },
            ]
        );
    };

    const SettingItem = ({
        icon,
        title,
        subtitle,
        onPress,
        showSwitch = false,
        switchValue = false,
        onSwitchChange = () => { },
        showArrow = true
    }) => (
        <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={showSwitch}>
            <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={22} color={colors.primary} />
                </View>
                <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{title}</Text>
                    {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
                </View>
            </View>
            <View style={styles.settingRight}>
                {showSwitch && (
                    <Switch
                        value={switchValue}
                        onValueChange={onSwitchChange}
                        trackColor={{ false: '#767577', true: colors.primary }}
                        thumbColor={switchValue ? '#fff' : '#f4f3f4'}
                    />
                )}
                {showArrow && <Ionicons name="chevron-forward" size={20} color="#999" />}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profile</Text>
                    <View style={styles.profileCard}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face' }}
                            style={styles.profileImage}
                        />
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>John Doe</Text>
                            <Text style={styles.profileEmail}>john.doe@example.com</Text>
                            <Text style={styles.profilePhone}>+1 234 567 8900</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.editButton}>
                            <Ionicons name="create-outline" size={18} color={colors.primary} />
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Preferences Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <View style={styles.sectionCard}>
                        <SettingItem
                            icon="notifications-outline"
                            title="Push Notifications"
                            subtitle="Receive order updates and promotions"
                            showSwitch={true}
                            switchValue={notifications}
                            onSwitchChange={setNotifications}
                            showArrow={false}
                        />

                    </View>
                </View>

                {/* App Settings Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>App Settings</Text>
                    <View style={styles.sectionCard}>

                        <View style={styles.divider} />
                        <SettingItem
                            icon="document-text-outline"
                            title="Terms & Conditions"
                            onPress={() => console.log('Terms pressed')}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="shield-checkmark-outline"
                            title="Privacy Policy"
                            onPress={() => console.log('Privacy pressed')}
                        />
                    </View>
                </View>

                {/* Support Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support</Text>
                    <View style={styles.sectionCard}>
                        <SettingItem
                            icon="help-circle-outline"
                            title="Help & Support"
                            onPress={() => console.log('Help pressed')}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="chatbubble-outline"
                            title="Contact Us"
                            onPress={() => console.log('Contact pressed')}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="star-outline"
                            title="Rate Our App"
                            onPress={() => console.log('Rate pressed')}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="information-circle-outline"
                            title="About"
                            subtitle="Version 1.0.0"
                            onPress={() => console.log('About pressed')}
                        />
                    </View>
                </View>

                {/* Account Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.sectionCard}>
                        <TouchableOpacity style={styles.dangerButton} onPress={handleLogout}>
                            <Ionicons name="log-out-outline" size={22} color="#FF6B6B" />
                            <Text style={styles.dangerButtonText}>Logout</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />

                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>© 2024 FoodDelivery App. All rights reserved.</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    scrollView: {
        flex: 1,
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    sectionCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    profilePhone: {
        fontSize: 14,
        color: '#666',
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    editButtonText: {
        color: colors.primary,
        fontWeight: '600',
        fontSize: 12,
        marginLeft: 4,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f8ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    settingText: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1a1a1a',
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: 12,
        color: '#999',
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginLeft: 52,
    },
    dangerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    dangerButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FF6B6B',
        marginLeft: 12,
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    footerText: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
    },
});

export default SettingsScreen;