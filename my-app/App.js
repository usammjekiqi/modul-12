import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PostsScreen from './screens/postsScreen';
import CommentsScreen from './screens/commentsScreen';
import AlbumsScreen from './screens/albumsScreen';
import PhotosScreen from './screens/photosScreen';
import UserScreen from './screens/userScreen';
import TodosScreen from './screens/todosScreen';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator
      ScreenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'TodosScreen') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'AlbumsScreen') {
            iconName = focused ? 'albums' : 'albums-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'RED',
        tabBarInactiveTintColor: 'BLUE',
      })}
      
      >
      <Tabs.Screen name="TodosScreen" component={TodosScreen}/>
      <Tabs.Screen name="AlbumsScreen" component={AlbumsScreen}/>
       
     </Tabs.Navigator>
    </NavigationContainer>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  screenName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});