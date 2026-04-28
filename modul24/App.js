import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, Image} from 'react-native';
import Bird from "./scr/bird";
import Obstacles from "./scr/Obstacle";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstacleLeft, setObstacleLeft] = useState(screenWidth);
  const [obstacleLeftTwo, setObstacleLeftTwo] = useState(screenWidth + screenWidth/2 +30);
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const gravity = 3;
  let obstacleWidth = 60;
  let obstacleHeight = 300;
  let gap = 200;
  let gameTimerId;
  let obstaclesTimerId;
  let obstaclesTimerIdTwo;


//Start Bird Falling

useEffect(() => {
  if (birdBottom > 0) {
    gameTimerId = setInterval(() => {
      setBirdBottom(birdBottom => birdBottom - gravity)
    }, 30);
    return () => {
      clearInterval(gameTimerId)
    }
  }
}, [birdBottom])

useEffect(() => {
  if (obstacleLeft >  -60) {
    obstaclesTimerId = setInterval(() => {
      setObstacleLeft(obstacleLeft => obstacleLeft - 5)
    }, 30);
    return () => {
      clearInterval(obstaclesTimerId)
    }
  } else {
    setScore(score => score + 1);
    setObstacleLeft(screenWidth);
    setObstaclesNegHeight(- Math.random() * 100);
  }
}, [obstacleLeft])

//start second obstacle

useEffect(() => {
  if (obstacleLeftTwo >  -60) {
    obstaclesTimerIdTwo = setInterval(() => {
      setObstacleLeftTwo(obstacleLeftTwo => obstacleLeftTwo - 5)
    }, 30);
    return () => {
      clearInterval(obstaclesTimerIdTwo)
    }
  } else {
    setScore(score => score + 1);
    setObstacleLeftTwo(screenWidth);
    setObstaclesNegHeightTwo(- Math.random() * 100);
  }
}, [obstacleLeftTwo])

//jump behavior

// jump behavior

const jump = () => {
  if (!isGameOver && birdBottom < screenHeight) {
    setBirdBottom(prevBirdBottom => prevBirdBottom + 50);
    console.log("jumped");
  }
};

useEffect(() => {
  if (
    (birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
      birdBottom > (obstaclesNegHeight + obstacleHeight + gap - 30)) &&
    (obstacleLeft > screenWidth / 2 - 30 && obstacleLeft < screenWidth / 2 + 30)
  ) {
    console.log("game over");
    gameOver();
  }
}, [birdBottom, obstaclesNegHeight, obstacleHeight, gap, obstacleLeft, screenWidth, gameOver, isGameOver]);
}

const gameOver = () => {
  clearInterval(gameTimerId);
  clearInterval(obstaclesTimerId);
  clearInterval(obstaclesTimerIdTwo);
}

  return (
    
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Image source={require("/../../assets/background.png")} style={styles.backgroundImage} resizeMode="cover" />
        <Text style={styles.score}>Score: {score}</Text>
        <Bird birdBottom={birdBottom} birdLeft={birdLeft}/>
        <Obstacles color={"green"} 
        obstacleWidth={obstacleWidth} 
        obstacleHeight={obstacleHeight} 
        randomButton={obstaclesNegHeight}
        gap={gap} obstacleLeft={obstacleLeft} 
        />
        <Obstacles color={"yellow"}
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        randomButton={obstaclesNegHeightTwo}
        gap={gap} obstacleLeft={obstacleLeftTwo}
        />
      </View>
    </TouchableWithoutFeedback>


  );



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: 32,
    top: 50,
    position: "absolute",
    zIndex: 1,
    color: "white",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});