import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MissionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Missions</Text>
      <Text style={styles.text}>Ici s'afficheront les missions assignées au technicien.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16 },
});
