import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { HeaderBackButton } from '@react-navigation/elements';
import HomeScreen from '../screens/HomeScreen';
import TrashScreen from '../screens/TrashScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditNoteScreen from '../screens/EditNoteScreen'; 
import logo from '../../assets/images/banner.png';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  return (
    <DrawerContentScrollView style={{ backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#cbcbcb" />
      <View style={{ paddingTop: StatusBar.currentHeight }}>
        <Image source={logo} style={{ width: 610, height: 200, marginLeft: -154, marginTop: -35, marginBottom: 10 }} />
        <DrawerItem
          label="Inicio"
          onPress={() => navigation.navigate('AllNotes')}
          icon={({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />}
        />
        <DrawerItem
          label="Papelera"
          icon={({ color, size }) => <Ionicons name="trash-outline" size={size} color={color} />}
          onPress={() => navigation.navigate('Trash')}
        />
        <DrawerItem
          label="Configuración"
          icon={({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => {
          const showBackButton = ['EditNote', 'Trash', 'Settings'].includes(route.name);

          if (showBackButton) {
            return (
              <HeaderBackButton
                onPress={() => navigation.goBack()}
                labelVisible={false}
              />
            );
          }
          return (
            <Ionicons
              name="menu"
              size={30}
              color="black"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.toggleDrawer()} 
            />
          );
        },
      })}
    >
      <Drawer.Screen name="AllNotes" component={HomeScreen} />
      <Drawer.Screen name="Trash" component={TrashScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="EditNote" component={EditNoteScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
