import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const initialSignalements = [
  {
    id: '1',
    type: "Fuite d'eau",
    statut: 'Pris en charge',
    date: '17 juin 2025',
    description: "Fuite près de l'école primaire à Dang.",
    image: require('../assets/images/eau1.jpg'),
  },
  {
    id: '2',
    type: 'Voirie endommagée',
    statut: 'Non traité',
    date: '15 juin 2025',
    description: 'Route impraticable à Borongo.',
    image: require('../assets/images/route1.jpg'),
  },
  {
    id: '3',
    type: "Panne d'éclairage",
    statut: 'Résolu',
    date: '10 juin 2025',
    description: 'Lanterne défectueuse au stade de Dang.',
    image: require('../assets/images/eclairage.jpg'),
  },
];

export default function MesSignalements() {
  const navigation = useNavigation();
  const [signalements, setSignalements] = useState(initialSignalements);
  const [search, setSearch] = useState('');

  const supprimerSignalement = (id: string) => {
    Alert.alert(
      'Confirmation',
      'Voulez-vous vraiment supprimer ce signalement ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setSignalements((prev) => prev.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const signalementsFiltres = signalements.filter(
    (item) =>
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <LinearGradient colors={["#edf1f4", "#d4e7f5"]} style={styles.container}>
      {/* En-tête avec retour */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes signalements</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Recherche */}
      <TextInput
        style={styles.input}
        placeholder="Rechercher..."
        placeholderTextColor="#7f8c8d"
        value={search}
        onChangeText={setSearch}
      />

      {/* Liste des signalements */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {signalementsFiltres.length === 0 ? (
          <Text style={styles.emptyText}>Aucun signalement trouvé.</Text>
        ) : (
          signalementsFiltres.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={item.image} style={styles.preview} />
              <View style={styles.details}>
                <Text style={styles.type}>{item.type}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={[styles.statut, getStatutColor(item.statut)]}>{item.statut}</Text>
              </View>
              <TouchableOpacity onPress={() => supprimerSignalement(item.id)}>
                <Ionicons name="trash" size={22} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
}

function getStatutColor(statut: string) {
  switch (statut) {
    case 'Pris en charge':
      return { color: '#f39c12' };
    case 'Résolu':
      return { color: '#27ae60' };
    case 'Non traité':
    default:
      return { color: '#e74c3c' };
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
  },
  input: {
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  scrollContainer: { paddingBottom: 60 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f0f6fa',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    gap: 10,
  },
  preview: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  details: { flex: 1 },
  type: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
  },
  date: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  description: {
    fontSize: 13,
    color: '#2c3e50',
    marginVertical: 3,
  },
  statut: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
    color: '#7f8c8d',
  },
});
