// src/screens/TrashScreen.js
import React, { useContext } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { NoteContext } from '../context/NoteContext';
import NoteItem from '../components/NoteItem';

const { width } = Dimensions.get('window');

const TrashScreen = () => {
  const { state, dispatch } = useContext(NoteContext);

  const restoreNote = (id) => {
    dispatch({ type: 'RESTORE_NOTE', payload: id });
  };

  const deleteNote = (id) => {
    dispatch({ type: 'DELETE_NOTE', payload: id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.noteContainer}>
      <View style={styles.tarjeta}>
        <NoteItem note={item} />
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => restoreNote(item.id)}
      >
        <Text style={styles.buttonText}>Restaurar</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => deleteNote(item.id)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        key="two-column-list"
        data={state.trash}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.column}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
    padding: 4,
  },
  tarjeta: {
   marginLeft: -9,
  },
  column: {
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  noteContainer: {
    width: (width / 2) - 7,
    backgroundColor: '#ffffff', 
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: 10,
  },
  button: {
    backgroundColor: '#337397',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF4B5C', // Color para eliminar
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TrashScreen;
