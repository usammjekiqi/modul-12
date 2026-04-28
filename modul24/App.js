import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import Bird from "./src/components/bird";
import Obstacles from "./src/components/Obstacle";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth * 0.28;

  const gravity = 2.8;
  const jumpSize = 58;
  const obstacleSpeed = 4;
  const obstacleWidth = 70;
  const obstacleHeight = 260;
  const gap = 220;
  const birdSize = 40;

  const randomBottomOffset = () => -Math.random() * 170;

  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstacleLeft, setObstacleLeft] = useState(screenWidth + 80);
  const [obstacleLeftTwo, setObstacleLeftTwo] = useState(screenWidth + screenWidth / 2 + 120);
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(randomBottomOffset());
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(randomBottomOffset());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const birdBottomRef = useRef(birdBottom);
  const obstacleLeftRef = useRef(obstacleLeft);
  const obstacleLeftTwoRef = useRef(obstacleLeftTwo);
  const obstaclesNegHeightRef = useRef(obstaclesNegHeight);
  const obstaclesNegHeightTwoRef = useRef(obstaclesNegHeightTwo);

  const gameOver = () => {
    setIsGameOver(true);
    setIsGameStarted(false);
  };

  const detectCollision = (obsLeft, obsNegHeight, nextBirdBottom) => {
    const birdHalf = birdSize / 2;
    const birdLeftEdge = birdLeft - birdHalf;
    const birdRightEdge = birdLeft + birdHalf;
    const obstacleRightEdge = obsLeft + obstacleWidth;
    const isWithinX = obstacleRightEdge > birdLeftEdge && obsLeft < birdRightEdge;

    if (!isWithinX) {
      return false;
    }

    const hitsBottomPipe = nextBirdBottom - birdHalf < obsNegHeight + obstacleHeight;
    const hitsTopPipe = nextBirdBottom + birdHalf > obsNegHeight + obstacleHeight + gap;

    return hitsBottomPipe || hitsTopPipe;
  };

  useEffect(() => {
    if (!isGameStarted || isGameOver) {
      return;
    }

    const gameTimerId = setInterval(() => {
      const nextBirdBottom = birdBottomRef.current - gravity;

      if (nextBirdBottom - birdSize / 2 <= 0) {
        gameOver();
        return;
      }

      if (nextBirdBottom + birdSize / 2 >= screenHeight) {
        birdBottomRef.current = screenHeight - birdSize / 2;
        setBirdBottom(screenHeight - birdSize / 2);
      } else {
        birdBottomRef.current = nextBirdBottom;
        setBirdBottom(nextBirdBottom);
      }

      let nextObstacleLeft = obstacleLeftRef.current - obstacleSpeed;
      let nextObstacleLeftTwo = obstacleLeftTwoRef.current - obstacleSpeed;

      if (nextObstacleLeft < -obstacleWidth) {
        nextObstacleLeft = screenWidth + 40;
        const nextNegHeight = randomBottomOffset();
        obstaclesNegHeightRef.current = nextNegHeight;
        setObstaclesNegHeight(nextNegHeight);
        setScore((currentScore) => {
          const nextScore = currentScore + 1;
          setBestScore((best) => Math.max(best, nextScore));
          return nextScore;
        });
      }

      if (nextObstacleLeftTwo < -obstacleWidth) {
        nextObstacleLeftTwo = screenWidth + 40;
        const nextNegHeightTwo = randomBottomOffset();
        obstaclesNegHeightTwoRef.current = nextNegHeightTwo;
        setObstaclesNegHeightTwo(nextNegHeightTwo);
        setScore((currentScore) => {
          const nextScore = currentScore + 1;
          setBestScore((best) => Math.max(best, nextScore));
          return nextScore;
        });
      }

      obstacleLeftRef.current = nextObstacleLeft;
      obstacleLeftTwoRef.current = nextObstacleLeftTwo;
      setObstacleLeft(nextObstacleLeft);
      setObstacleLeftTwo(nextObstacleLeftTwo);

      const collidedWithFirst = detectCollision(
        nextObstacleLeft,
        obstaclesNegHeightRef.current,
        birdBottomRef.current
      );
      const collidedWithSecond = detectCollision(
        nextObstacleLeftTwo,
        obstaclesNegHeightTwoRef.current,
        birdBottomRef.current
      );

      if (collidedWithFirst || collidedWithSecond) {
        gameOver();
      }
    }, 24);

    return () => clearInterval(gameTimerId);
  }, [isGameStarted, isGameOver, screenHeight, screenWidth]);

  const jump = () => {
    if (isGameOver) {
      return;
    }

    if (!isGameStarted) {
      setIsGameStarted(true);
    }

    const nextBirdBottom = Math.min(screenHeight - birdSize / 2, birdBottomRef.current + jumpSize);
    birdBottomRef.current = nextBirdBottom;
    setBirdBottom(nextBirdBottom);
  };

  const resetGame = () => {
    const resetBirdBottom = screenHeight / 2;
    const resetObstacleOne = screenWidth + 80;
    const resetObstacleTwo = screenWidth + screenWidth / 2 + 120;
    const resetNegHeightOne = randomBottomOffset();
    const resetNegHeightTwo = randomBottomOffset();

    birdBottomRef.current = resetBirdBottom;
    obstacleLeftRef.current = resetObstacleOne;
    obstacleLeftTwoRef.current = resetObstacleTwo;
    obstaclesNegHeightRef.current = resetNegHeightOne;
    obstaclesNegHeightTwoRef.current = resetNegHeightTwo;

    setBirdBottom(resetBirdBottom);
    setObstacleLeft(resetObstacleOne);
    setObstacleLeftTwo(resetObstacleTwo);
    setObstaclesNegHeight(resetNegHeightOne);
    setObstaclesNegHeightTwo(resetNegHeightTwo);
    setScore(0);
    setIsGameOver(false);
    setIsGameStarted(false);
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Image source={require("./assets/background.png")} style={styles.backgroundImage} resizeMode="cover" />
        <View style={styles.hud}>
          <Text style={styles.score}>Score: {score}</Text>
          <Text style={styles.bestScore}>Best: {bestScore}</Text>
        </View>
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

        {!isGameStarted && !isGameOver && (
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>Flappy Bird</Text>
            <Text style={styles.overlayText}>Tap anywhere to start</Text>
          </View>
        )}

        {isGameOver && (
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>Game Over</Text>
            <Text style={styles.overlayText}>Score: {score}</Text>
            <TouchableOpacity style={styles.playAgainButton} onPress={resetGame}>
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>


  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hud: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 48,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  score: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.45)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  bestScore: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.45)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    position: "absolute",
    zIndex: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(16, 24, 40, 0.58)",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 28,
    minWidth: 260,
  },
  overlayTitle: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 8,
  },
  overlayText: {
    color: "#e6f4ff",
    fontSize: 18,
    fontWeight: "600",
  },
  playAgainButton: {
    marginTop: 16,
    backgroundColor: "#ffb703",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
  },
  playAgainText: {
    color: "#1d1d1f",
    fontSize: 18,
    fontWeight: "800",
  },
});