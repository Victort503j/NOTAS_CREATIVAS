// src/context/NoteContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  notes: [],
  trash: [],
};

const NoteContext = createContext(initialState);

const noteReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'SET_TRASH':
      return { ...state, trash: action.payload };
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] };
    case 'DELETE_NOTE':
      const deletedNote = state.notes.find(note => note.id === action.payload);
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
        trash: [...state.trash, deletedNote],
      };
    case 'RESTORE_NOTE':
      const restoredNote = state.trash.find(note => note.id === action.payload);
      return {
        ...state,
        notes: [...state.notes, restoredNote],
        trash: state.trash.filter(note => note.id !== action.payload),
      };
      case 'UPDATE_NOTE':
      const updatedNotes = state.notes.map(note => {
        if (note.id === action.payload.id) {
          return { ...note, content: action.payload.content };
        }
        return note;
      });
      return { ...state, notes: updatedNotes };
    default:
      return state;
  }
};

const NoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await AsyncStorage.getItem('notes');
        const trash = await AsyncStorage.getItem('trash');
        if (notes !== null) {
          dispatch({ type: 'SET_NOTES', payload: JSON.parse(notes) });
        }
        if (trash !== null) {
          dispatch({ type: 'SET_TRASH', payload: JSON.parse(trash) });
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    };
    loadNotes();
  }, []);

  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem('notes', JSON.stringify(state.notes));
        await AsyncStorage.setItem('trash', JSON.stringify(state.trash));
      } catch (error) {
        console.error('Error saving notes:', error);
      }
    };
    saveNotes();
  }, [state.notes, state.trash]);

  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteProvider };
