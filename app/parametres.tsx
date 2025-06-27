import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

export default function ParametresScreen() {
  const navigation = useNavigation();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [localisation, setLocalisation] = useState(true);

  const togglePasswordForm = () => setShowPasswordForm(!showPasswordForm);
  const toggleProfileForm = () => setShowProfileForm(!showProfileForm);
  const router = useRouter(); // ← initialise le router

const handleLogout = () => {
  Alert.alert(
    'Déconnexion',
    'Voulez-vous vraiment vous déconnecter ?',
    [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Se déconnecter', onPress: () => {
          
          router.replace('/'); // ← redirection vers la page d'accueil
        }
      },
    ]
  );
};


  return (
    <LinearGradient colors={["#edf1f4", "#d4e7f5"]} style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#2c3e50" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Paramètres</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Préférences</Text>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Mode sombre</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Localisation</Text>
          <Switch value={localisation} onValueChange={setLocalisation} />
        </View>

        <Text style={styles.sectionTitle}>Mon Compte</Text>

        <TouchableOpacity style={styles.settingRow} onPress={togglePasswordForm}>
          <Ionicons name="lock-closed-outline" size={20} color="#34495e" />
          <Text style={styles.label}>Changer le mot de passe</Text>
        </TouchableOpacity>

        {showPasswordForm && (
          <View style={styles.formBox}>
            <TextInput style={styles.input} placeholder="Ancien mot de passe" secureTextEntry />
            <TextInput style={styles.input} placeholder="Nouveau mot de passe" secureTextEntry />
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitText}>Valider</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.settingRow} onPress={toggleProfileForm}>
          <Ionicons name="person-circle-outline" size={20} color="#34495e" />
          <Text style={styles.label}>Modifier mes informations</Text>
        </TouchableOpacity>

        {showProfileForm && (
          <View style={styles.formBox}>
            <TextInput style={styles.input} placeholder="Nom" />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.sectionTitle}>Sécurité</Text>
        <View style={[styles.settingRow, styles.dangerRow]}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#e67e22" />
          <Text style={[styles.label, { color: '#e67e22' }]}>Activer l'authentification à deux facteurs</Text>
        </View>

        <TouchableOpacity style={styles.settingRow} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#e74c3c" />
          <Text style={[styles.label, { color: '#e74c3c' }]}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  scrollContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#34495e',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    marginLeft: 10,
  },
  formBox: {
    backgroundColor: '#ffffffee',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  dangerRow: {
    backgroundColor: '#fdecea',
    borderColor: '#f5c6cb',
  },
});
