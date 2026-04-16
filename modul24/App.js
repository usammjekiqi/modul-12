import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Bird from './src/bird';
import { use } from 'react';
import { useState , useEffect } from 'react';

export default function App() {
  const screenwidth = Dimensions.get("screen").width;
  const screenheight = Dimensions.get("screen").height;
  const birdLeft = screenwidth / 2;
  const [birdBottom , setBirdBottom] = useState(screenheight / 2);
  const gravitiy = 3;
  let gameTimerId;

  useEffect(() => {
    if(birdBottom > 0){
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravitiy);
      }, 30);
      return () => {
        clearInterval(gameTimerId );
      }
    } 




  } , [birdBottom]) 
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Bird />
    </View>
  );
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
