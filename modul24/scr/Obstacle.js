import React from "react";
import { View ,     Image} from "react-native";

const Obstacle = ({
    color,
    obstacleLeft,
    obstacleWidth,
    obstacleHeight,
    gap,
    obstacleLeft}) => {
    return (
        <>
            <Image style ={{
                position: "absolute",
                backgroundColor: color,
                left: obstacleLeft,
                width: obstacleWidth,
                height: obstacleHeight,
            }} 
            source={require("../../assets/obstacle.png")}
            resizeMode="stretch" 
            />
            
        <Image
            style ={{
                position: "absolute",
                zIndex: 0,
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight ,
                left: obstacleLeft,
                bottom: randomBotton,
            }} 
            source={require("../../assets/obstacle.png")}
            resizeMode="cover"
        
        
        />

       </>

  
    );

}

export default Obstacle;