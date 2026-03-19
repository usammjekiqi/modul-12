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
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();


function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1, backgroundColor:"blue" }}>
      <View style={StyleSheet.drawerHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={80} color="#fff" />
          </View>
          <Text style={styles.drawerHeaderText}>My App</Text>
          <Text style={styles.drawerHeaderSubText}>Welcome to the app!</Text> 
      </View>
      <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop:10}}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.drawerFooter}>
      <Ionicons name="code-slash-outline" size={24} color="#fff" />
      <Text style={styles.drawerFooterText}>react native</Text>

      </View>

      </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{
        drawerStyle: {
          backgroundColor: '#333',
          width: 240,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          marginLeft: -10,
        },
        drawerActiveTintColor: '#e91e63',
        drawerInactiveTintColor: '#a0a0a0',
        drawerActiveBackgroundColor: '#16213e',
        drawerItemStyle: { 
          borderRadius: 8,
          marginHorizontal: 8,
          marginVertical: 4,
          paddingVertical: 12,
        },
        headerStyle: {
          backgroundColor: '#16213e',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#aaa',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',

        },

      }}>

        <Drawer.Screen name="Albums" component={AlbumsScreen} options={{title:"albums",  drawerIcon:({color,size}) =>(
          <Ionicons name="albums-outline" size={size} color={color} />
        )}}/>

        <Drawer.Screen name="Todos" component={TodosScreen}  options={{title:"TodosScreen",  drawerIcon:({color,size}) =>(
          <Ionicons name="albums-outline" size={size} color={color} />
        )}}/>    
        <Drawer.Screen name="Posts" component={PostsScreen} options={{title:"PostsScreen",  drawerIcon:({color,size}) =>(
          <Ionicons name="albums-outline" size={size} color={color} />
        )}}/>      
          <Drawer.Screen name="Comments" component={CommentsScreen}  options={{title:"CommentsScreen",  drawerIcon:({color,size}) =>(
          <Ionicons name="albums-outline" size={size} color={color} />
        )}}/>     
          <Drawer.Screen name="Photos" component={PhotosScreen}  options={{title:"PhotosScreen",  drawerIcon:({color,size}) =>(
          <Ionicons name="albums-outline" size={size} color={color} />
        )}}/>     
          <Drawer.Screen name="User" component={UserScreen}  options={{title:"UserScreen",  drawerIcon:({color,size}) =>(
          <Ionicons name="albums-outline" size={size} color={color} />
        )}}/>     
      </Drawer.Navigator>

      
    </NavigationContainer>  
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#16213e',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
    
  },
  avatarContainer: {
    width: 80,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#1a2ae',
    boarderwidth: 2,
    borderColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  drawerHeaderText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',

  },
  drawerHeaderSubText: {
    color: '#aaa',
    fontSize: 14,
  },
  drawerFooter: {
    backgroundColor: '#16213e',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row",
    
  },
  drawerFooterText:{
    color:"#aaa",
    marginLeft:5,
    fontSize:14,
    
  }
});