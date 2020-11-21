import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Animated,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const DATA = [
  {
    key: "3571572",
    title: "Multi-lateral intermediate moratorium",
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: "https://image.flaticon.com/icons/png/256/3571/3571572.png",
  },
  {
    key: "3571747",
    title: "Automated radical data-warehouse",
    description:
      "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    image: "https://image.flaticon.com/icons/png/256/3571/3571747.png",
  },
  {
    key: "3571680",
    title: "Inverse attitude-oriented system engine",
    description:
      "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    image: "https://image.flaticon.com/icons/png/256/3571/3571680.png",
  },
  {
    key: "3571603",
    title: "Monitored global data-warehouse",
    description: "We need to program the open-source IB interface!",
    image: "https://image.flaticon.com/icons/png/256/3571/3571603.png",
  },
];

const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: "absolute", bottom: 100, flexDirection: "row" }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 1.4, 0.6],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indictor ${i}`}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              margin: 10,
              backgroundColor: "#fff",
              opacity: opacity,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor }]} />
  );
};

const Vector = ({ scrollX }) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });
  return (
    <Animated.View
      style={{
        backgroundColor: "#FFF",
        width: height,
        height: height,
        position: "absolute",
        top: -height * 0.6,
        left: -height * 0.3,
        borderRadius: 86,
        transform: [
          {
            rotate,
          },
          {
            translateX,
          },
        ],
      }}
    />
  );
};

export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Vector scrollX={scrollX} />
      <FlatList
        horizontal
        scrollEventThrottle={32}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        data={DATA}
        onScroll={Animated.event(
          // scrollX = e.nativeEvent.contentOffset.x
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: width,
                alignItems: "center",
                padding: 20,
              }}
            >
              <View
                style={{
                  flex: 0.7,

                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: width / 2, height: width / 2 }}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 24,
                    marginBottom: 10,
                    fontWeight: "900",
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ color: "white", fontWeight: "300" }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
