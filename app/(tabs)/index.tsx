import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  const fullSubtitle = " Rejoignez MboaSignal : signalez, agissez, transformez votre ville !";
  const [subtitle, setSubtitle] = useState('');
  const [index, setIndex] = useState(0);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scaleAnim, { toValue: 1.2, duration: 1200, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        ])
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (index < fullSubtitle.length) {
      const timeout = setTimeout(() => {
        setSubtitle((prev) => prev + fullSubtitle.charAt(index));
        setIndex(index + 1);
      }, 35);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/ville-propre.jpg')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(44,62,80,0.7)", "rgba(52,73,94,0.7)"]}
          style={styles.gradient}
        >
          <View style={styles.overlay}>
            <Animated.View style={{
              transform: [
                { rotate: rotateInterpolate },
                { scale: scaleAnim }
              ],
              shadowColor: '#27ae60',
              shadowOpacity: 0.5,
              shadowRadius: 15,
            }}>
              <Ionicons name="alert-circle" size={100} color="#fff" />
            </Animated.View>

            <Text style={styles.title}>MboaSignal</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => router.push('/signalement')}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={['#27ae60', '#2ecc71', '#1abc9c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Ionicons name="alert-circle-outline" size={22} color="#fff" />
                <Text style={styles.mainButtonText}>Faire un signalement</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageBackground: { flex: 1 },
  gradient: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  overlay: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    marginTop: 15,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#ecf0f1',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 40,
    lineHeight: 24,
  },
  mainButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    paddingVertical: Platform.OS === 'ios' ? 16 : 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
});
