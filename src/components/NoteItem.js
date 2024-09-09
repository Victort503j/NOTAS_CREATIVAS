import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const NoteItem = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.content);
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const navigation = useNavigation();

  const handleCardPress = () => {
    const serializedNote = {
      ...note,
      date: note.date instanceof Date ? note.date.toISOString() : new Date(note.date).toISOString(),
    };
    navigation.navigate('EditNote', { note: serializedNote });
  };

  const handleEdit = () => {
    onEdit({
      ...note,
      title: newTitle,
      content: newContent,
    });
    setIsEditing(false);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
  };

  const handleLongPress = () => {
    setShowConfirmation(true); 
  };

  const handleDelete = () => {
    onDelete(note.id); 
    setShowConfirmation(false); 
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.editContent}>
          <TextInput style={styles.input} value={newTitle} onChangeText={setNewTitle} />
          <TextInput style={styles.input} value={newContent} onChangeText={setNewContent} />
          <Button title="Guardar" onPress={handleEdit} />
          <Button title="Cancelar" onPress={() => setIsEditing(false)} />
        </View>
      ) : (
        <>
          <TouchableOpacity activeOpacity={1} onLongPress={handleLongPress} onPress={handleCardPress}>
            <View>
              <Text style={styles.title}>{note.title}</Text>
              <Text style={{ marginBottom: 7, marginLeft: 4 }}>{formatDate(note.date)}</Text>
              <Card style={styles.card}>
                <ScrollView style={styles.scrollView}>
                  <Text style={styles.contentText}>{note.content}</Text>
                </ScrollView>
                <View style={styles.fadeContainer}>
                  <View style={styles.fade} />
                </View>
              </Card>
            </View>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showConfirmation}
            onRequestClose={() => setShowConfirmation(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>¿Estás seguro de eliminar esta nota?</Text>
                <View style={styles.buttonContainer}>
                  <Button title="Aceptar" color={'#D82020'} onPress={handleDelete} />
                  <Button title="Cancelar" color={'gray'} onPress={() => setShowConfirmation(false)} />
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  card: {
    width: (windowWidth / 2) - 18,
    marginLeft: 4,
    height: 200,
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  title: {
    marginLeft: 4,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  input: {
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  scrollView: {
    marginLeft: 0,
  },
  contentText: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    backgroundColor: '#f1f1f1',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 300,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default NoteItem;
