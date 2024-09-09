import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider'; // Updated import
import { useColorScheme } from 'react-native';

const { width } = Dimensions.get('window');

const SettingsScreen = () => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const [fontSize, setFontSize] = useState(16); // Tamaño de fuente inicial
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);
  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ajustes</Text>
      
      <View style={styles.settingContainer}>
        <Text style={styles.label}>Tema:</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        />
        <Text style={styles.value}>{isDarkMode ? 'Oscuro' : 'Claro'}</Text>
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.label}>Tamaño del texto:</Text>
        <Slider
          style={styles.slider}
          minimumValue={12}
          maximumValue={30}
          step={1}
          value={fontSize}
          onValueChange={setFontSize}
          minimumTrackTintColor="#1fb28f"
          maximumTrackTintColor="#cccccc"
          thumbTintColor="#1f65ff"
        />
        <Text style={styles.value}>{`${fontSize}px`}</Text>
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.label}>Notificaciones:</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
        />
        <Text style={styles.value}>{notificationsEnabled ? 'Activadas' : 'Desactivadas'}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => { /* Implementar funcionalidad de guardar */ }}>
        <Text style={styles.buttonText}>Guardar Configuración</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    marginTop: 5,
  },
  slider: {
    width: width - 40,
    height: 40,
  },
  button: {
    backgroundColor: '#337397',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default SettingsScreen;
