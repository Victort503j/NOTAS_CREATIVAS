
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { NoteProvider } from './src/context/NoteContext';

const App = () => {
  return (
    <NavigationContainer>
      <NoteProvider>
        <DrawerNavigator />
      </NoteProvider>
    </NavigationContainer>
  );
};

export default App;
