import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ConnexionScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    // Simulation du rôle
    if (email.includes('tech')) {
      Alert.alert('Technicien connecté', 'Bienvenue technicien!');
    } else {
      Alert.alert('Citoyen connecté', 'Bienvenue citoyen!');
    }

    router.push('/signalement');
  };

  return (
    <LinearGradient colors={["#edf1f4", "#d4e7f5"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="#2c3e50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{isLogin ? 'Connexion' : "Inscription"}</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.formBox}>
          <Text style={styles.description}>Connectez-vous ou inscrivez-vous sur MboaSignal et participez activement à l'évolution de notre pays.</Text>

          {!isLogin && (
            <View>
              <Text style={styles.label}>Nom complet</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Votre nom complet"
                style={styles.input}
              />
            </View>
          )}

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Adresse email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>{isLogin ? 'Se connecter' : "S'inscrire"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleTextLink}>
              {isLogin ? "Pas encore de compte ? Inscrivez-vous" : "Déjà un compte ? Connectez-vous"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 20, paddingBottom: 80 },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 20,
    marginBottom: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
  },
  formBox: {
    backgroundColor: '#ffffffee',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    color: '#34495e'
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    marginBottom: 10
  },
  submitButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleTextLink: {
    marginTop: 15,
    textAlign: 'center',
    color: '#2980b9',
    fontWeight: '600',
    textDecorationLine: 'none',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 15,
    color: '#2c3e50',
  }
});
