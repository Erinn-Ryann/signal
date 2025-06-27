import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';

const zonesMock = [
  {
    id: '1',
    name: 'Dang',
    coordinates: { latitude: 7.321, longitude: 13.575 },
    type: 'Inondation',
    description: 'Zone sujette aux inondations fréquentes lors des pluies.',
    signalsCount: 15,
  },
  {
    id: '2',
    name: 'Borongo',
    coordinates: { latitude: 7.338, longitude: 13.563 },
    type: 'Insécurité',
    description: 'Haute fréquence de cambriolages signalés.',
    signalsCount: 22,
  },
  {
    id: '3',
    name: 'Dang Sud',
    coordinates: { latitude: 7.314, longitude: 13.580 },
    type: 'Panne électrique',
    description: 'Coupures de courant fréquentes affectant le quartier.',
    signalsCount: 8,
  },
];

const typesRisque = ['Tous', 'Inondation', 'Insécurité', 'Panne électrique'];

function getColor(type: string) {
  switch (type) {
    case 'Inondation':
      return 'rgba(0, 123, 255, 0.3)'; // bleu transparent
    case 'Insécurité':
      return 'rgba(220, 53, 69, 0.3)'; // rouge transparent
    case 'Panne électrique':
      return 'rgba(255, 193, 7, 0.3)'; // jaune transparent
    default:
      return 'rgba(100, 100, 100, 0.3)';
  }
}

function getPinColor(type: string) {
  switch (type) {
    case 'Inondation':
      return 'blue';
    case 'Insécurité':
      return 'red';
    case 'Panne électrique':
      return 'orange';
    default:
      return 'gray';
  }
}

type Zone = {
  id: string;
  name: string;
  coordinates: { latitude: number; longitude: number };
  type: string;
  description: string;
  signalsCount: number;
};

export default function ZonesScreen() {
  const [selectedType, setSelectedType] = useState('Tous');
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  const filteredZones =
    selectedType === 'Tous'
      ? zonesMock
      : zonesMock.filter((z) => z.type === selectedType);

  return (
    <LinearGradient colors={['#edf1f4', '#d4e7f5']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Zones a risque</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Filtre */}
      <View style={styles.filterContainer}>
        {typesRisque.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              selectedType === type && styles.filterButtonSelected,
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text
              style={[
                styles.filterText,
                selectedType === type && styles.filterTextSelected,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Carte */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 7.32,
          longitude: 13.57,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {filteredZones.map((zone) => (
          <React.Fragment key={zone.id}>
            {/* Cercle autour de la zone */}
            <Circle
              center={zone.coordinates}
              radius={400} // rayon en mètres, ajuste selon besoin
              fillColor={getColor(zone.type)}
              strokeColor={getColor(zone.type).replace('0.3', '0.7')}
              strokeWidth={2}
            />
            {/* Marker interactif */}
            <Marker
              coordinate={zone.coordinates}
              title={zone.name}
              description={`${zone.type} — ${zone.signalsCount} signalements`}
              pinColor={getPinColor(zone.type)}
              onPress={() => setSelectedZone(zone)}
            />
          </React.Fragment>
        ))}
      </MapView>

      {/* Liste des zones */}
      <FlatList
        data={filteredZones.sort((a, b) => b.signalsCount - a.signalsCount)}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => setSelectedZone(item)}
          >
            <Text style={styles.zoneName}>{item.name}</Text>
            <Text style={styles.zoneType}>{item.type}</Text>
            <Text style={styles.signalsCount}>
              Signalements : {item.signalsCount}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal détail */}
      <Modal
        visible={selectedZone !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedZone(null)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedZone && (
              <>
                <Text style={styles.modalTitle}>{selectedZone.name}</Text>
                <Text style={styles.modalType}>{selectedZone.type}</Text>
                <Text style={styles.modalDesc}>{selectedZone.description}</Text>
                <Text style={styles.modalSignals}>
                  Nombre de signalements : {selectedZone.signalsCount}
                </Text>
                <Button title="Fermer" onPress={() => setSelectedZone(null)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 12,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 15,
    color: '#2c3e50',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#888',
  },
  filterButtonSelected: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  filterText: {
    color: '#444',
  },
  filterTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  map: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 16,
  },
  list: {
    maxHeight: 180,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    paddingVertical: 6,
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  zoneName: {
    fontWeight: '700',
    fontSize: 16,
    color: '#222',
  },
  zoneType: {
    fontSize: 14,
    color: '#666',
  },
  signalsCount: {
    fontSize: 13,
    color: '#999',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 10,
    color: '#2c3e50',
  },
  modalType: {
    fontSize: 18,
    color: '#555',
    marginBottom: 12,
    width: '85%',
  },
  modalDesc: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSignals: {
    fontWeight: '600',
    marginBottom: 20,
  },
});
