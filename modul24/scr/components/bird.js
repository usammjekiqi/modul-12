import React from "react";
import { Image } from "react-native";

const Bird = ({birdBottom, birdLeft}) => {
    const birdWidth = 40;
    const birdHeight = 40;
    return (
        <Image
            style={{
                position: "absolute",
                left: birdLeft - (birdWidth / 2),
                bottom: birdBottom - (birdHeight / 2),
                width: 40,
                height: 40,
            }}
            source={require("../../assets/bird1.png")}
            resizeMode="stretch"
        />
    );
}

export default Bird;