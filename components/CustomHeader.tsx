import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

type CustomHeaderProps = {
  title: string;
  LeftIcon?: React.FC;
  RightIcon?: React.FC;
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  LeftIcon,
  RightIcon,
  onLeftPress,
  onRightPress,
}) => {
  const router = useRouter();
  const isWeb = Platform.OS === "web"; // Detect if running on web

  const handleBackPress = () => {
    console.log('called')
    if (onLeftPress) {
      onLeftPress();
    } else {
      if (isWeb) {
        window.history.back(); // Web navigation
      } else {
        router.push("/(tabs)/home"); // For Android/iOS navigate back to home
      }
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        {/* Left Icon */}
        <Pressable onPress={handleBackPress} style={styles.iconContainer}>
          {LeftIcon && <LeftIcon />}
        </Pressable>
   
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>


        {/* Right Icon */}
        <TouchableOpacity onPress={onRightPress} style={styles.iconContainer}>
          {RightIcon && <RightIcon />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 15,
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomHeader;
