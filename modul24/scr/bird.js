import React from "react";
import { View } from "react-native";

const Bird = () => {
    const birdwith = 50;
    const birdheight = 50;
  return (
    <View style={{
        position: "absolute",
        beckgroundColor: "red",
        height: birdheight,
        width: birdwith,
        left: birdleft-(birdwith/2),
        bottom: birdBottom - (birdheight/2),
    }}>

      
    </View>
  );
}

export default Bird;