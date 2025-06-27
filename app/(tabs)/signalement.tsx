import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'La localisation est nécessaire');
      return;
    }
  })();
}, []);
const { width } = Dimensions.get('window');
export const fakeUser = {
  nom: "Erinn Ryann",
  email: "erinnryannyambampabot@gmail.com",
  role: "technicien", // ou 'citoyen'
  entite: "Eneo Cam",
};
export default function SignalementScreen() {
  const navigation = useNavigation();

  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [markerCoords, setMarkerCoords] = useState<Location.LocationObjectCoords | null>(null);
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Voirie');
  const [image, setImage] = useState<string[]>([]);
  const [useMyLocation, setUseMyLocation] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const categories = ['Voirie', 'Déchets', 'Eau', 'Éclairage', 'Autre'];

  const handleNavigate = (route: string) => {
    navigation.navigate(route as never);
    setMenuVisible(false);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setMarkerCoords(loc.coords);
    })();
  }, []);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.canceled) {
      const uris = result.assets.map(asset => asset.uri);
      setImage(prev => [...prev, ...uris]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setImage(prev => [...prev, result.assets[0].uri]);
  };

const handleSubmit = () => {
  const finalCoords = useMyLocation ? location : markerCoords;

  if (!description.trim()) {
    Alert.alert("Champ requis", "Veuillez ajouter une description.");
    return;
  }

  if (!selectedCategory) {
    Alert.alert("Champ requis", "Veuillez choisir une catégorie.");
    return;
  }

  if (!finalCoords) {
    Alert.alert("Localisation manquante", "Veuillez activer ou définir une localisation.");
    return;
  }

  // 👉 Simuler le nombre de signalements similaires aujourd’hui
  const nombreSignalementsSimilaires = Math.floor(Math.random() * 6) + 1; // Entre 1 et 6 par ex

  Alert.alert(
    "Signalement envoyé ✅",
    `Merci pour votre contribution ! Ce problème a déjà été signalé ${nombreSignalementsSimilaires} fois aujourd'hui.`,
    [{ text: "OK", onPress: () => navigation.goBack() }]
  );

  console.log({
    description,
    category: selectedCategory,
    images: image,
    latitude: finalCoords.latitude,
    longitude: finalCoords.longitude,
  });
  
};

  return (
    <LinearGradient colors={["#edf1f4", "#d4e7f5"]} style={styles.container}>
      <View style={styles.headerContainer}>
           <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="menu" size={28} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Signalement</Text>
        <View style={{ width: 28 }} />
      </View>
  {/* MENU DÉROULANT */}
      {menuVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('connexion')}>
            <Ionicons name="log-in-outline" size={20} color="#2c3e50" />
            <Text style={styles.menuText}>Connexion / Inscription</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('mes-signalements')}>
            <Ionicons name="document-text-outline" size={20} color="#2c3e50" />
            <Text style={styles.menuText}>Mes signalements</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('parametres')}>
            <Ionicons name="settings-outline" size={20} color="#2c3e50" />
            <Text style={styles.menuText}>Paramètres</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formBox}>
          <Text style={styles.label}>Description du problème</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Décrivez le problème ici..."
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Catégorie</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}>
              {categories.map(cat => <Picker.Item label={cat} value={cat} key={cat} />)}
            </Picker>
          </View>

          <Text style={styles.label}>Photos</Text>
          <View style={styles.imageButtons}>
            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
              <Ionicons name="camera" size={24} color="white" />
              <Text style={styles.imageButtonText}>Prendre une photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={pickImages}>
              <Ionicons name="images" size={24} color="white" />
              <Text style={styles.imageButtonText}>Importer</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imagePreviewContainer}>
            {image.length > 0 && image.map((imgUri, idx) => (
              <Image key={idx} source={{ uri: imgUri }} style={styles.preview} />
            ))}
          </View>

          <Text style={styles.label}>Localisation</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              onPress={() => setUseMyLocation(true)}
              style={[styles.toggleBtn, useMyLocation && styles.toggleActive]}
            >
              <Text style={styles.toggleText}>Ma position actuelle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUseMyLocation(false)}
              style={[styles.toggleBtn, !useMyLocation && styles.toggleActive]}
            >
              <Text style={styles.toggleText}>Déplacer le marqueur</Text>
            </TouchableOpacity>
          </View>

          {location && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              onPress={(e) => {
                if (!useMyLocation) {
                  const { latitude, longitude } = e.nativeEvent.coordinate;
                  setMarkerCoords({
                    latitude,
                    longitude,
                    altitude: 0,
                    accuracy: 0,
                    altitudeAccuracy: 0,
                    heading: 0,
                    speed: 0,
                  });
                }
              }}>
              {((useMyLocation && location) || (!useMyLocation && markerCoords)) && (
                <Marker
                  coordinate={
                    useMyLocation
                      ? (location as { latitude: number; longitude: number })
                      : (markerCoords as { latitude: number; longitude: number })
                  }
                  draggable={!useMyLocation}
                />
              )}
            </MapView>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Envoyer le signalement</Text>
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
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    position: 'absolute',
    top: 90,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 100,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#2c3e50',
    borderRadius: 8,
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
    textAlignVertical: 'top',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#dcdcdc'
  },
  pickerBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#dcdcdc'
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: '#2980b9',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginRight: 5,
  },
  imageButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 10
  },
  preview: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  toggleBtn: {
    flex: 1,
    padding: 12,
    margin: 5,
    backgroundColor: '#ccc',
    borderRadius: 12,
  },
  toggleActive: {
    backgroundColor: '#27ae60',
  },
  toggleText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center'
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
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
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
});
