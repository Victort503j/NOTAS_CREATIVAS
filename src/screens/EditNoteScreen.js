import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, TextInput, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NoteContext } from '../context/NoteContext';

function EditNoteScreen({ route, navigation }) {
  const { note, onUpdateNote } = route.params;
  const [content, setContent] = useState(note.content);
  const { state, dispatch } = useContext(NoteContext);

  useFocusEffect(
    React.useCallback(() => {
      setContent(note.content);
    }, [note.content])
  );

  useEffect(() => {
    const saveContent = () => {
      onUpdateNote && onUpdateNote({ ...note, content });
      // Dispatch action to update note content in context
      dispatch({ type: 'UPDATE_NOTE', payload: { id: note.id, content } });
    };

    const unsubscribe = navigation.addListener('blur', saveContent);

    return unsubscribe;
  }, [content, navigation, note, onUpdateNote, dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.paperBackground}>
      <View style={styles.line} />
      <TextInput
        style={styles.content}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <View style={styles.line} />
    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  paperBackground: {
    padding: 20,
    backgroundColor: '#f5f5dc',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    height: '100%',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
});

export default EditNoteScreen;
