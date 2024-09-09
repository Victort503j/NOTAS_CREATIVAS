  // screens/HomeScreen.js
  import React, { useContext, useState } from 'react';
  import { View, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
  import { NoteContext } from '../context/NoteContext';
  import NoteItem from '../components/NoteItem';

  const HomeScreen = () => {
    const { state, dispatch } = useContext(NoteContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const addNote = () => {
      dispatch({ type: 'ADD_NOTE', payload: { id: Date.now(), title, content, date: new Date() } });
      setTitle('');
      setContent('');
      setShowAddModal(false);
    };

    const deleteNote = (id) => {
      dispatch({ type: 'DELETE_NOTE', payload: id });
    };

    const editNote = (id, newTitle, newContent) => {
      dispatch({ type: 'EDIT_NOTE', payload: { id, title: newTitle, content: newContent, date: new Date() } });
    };

    const filteredNotes = state.notes.filter(note => note.title.toLowerCase().includes(search.toLowerCase()));

    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Buscar..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
        <FlatList
          data={filteredNotes.sort((a, b) => new Date(b.date) - new Date(a.date))}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <NoteItem note={item} onDelete={deleteNote} onEdit={editNote} />
          )}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
        
        {/* Botón flotante para agregar nota */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        
        {/* Modal o pantalla para agregar nota */}
        {showAddModal && (
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {/* Campos de entrada */}
              <TextInput
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
                style={styles.modalInput}
              />
              <TextInput
                placeholder="Contenido"
                value={content}
                onChangeText={setContent}
                multiline
                style={[styles.modalInput, { height: 100 }]}
              />
              {/* Contenedor para alinear los botones horizontalmente */}
              <View style={styles.buttonContainer}>
                <Button title="Guardar" onPress={addNote} />
                <Button title="Cancelar" onPress={() => setShowAddModal(false)} color="red" />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: 'white',
    },
    input: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      marginBottom: 10,
    },
    flatListContainer: {
      flexGrow: 1,
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: 'green',
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
      zIndex: 10,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 30,
    },
    modalBackground: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)', 
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      elevation: 10,
    },
    modalInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 10,
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
  });

  export default HomeScreen;
