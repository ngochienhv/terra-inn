import { View, Button, StyleSheet, TouchableOpacity, Text, Pressable } from "react-native";

const AdminButton = ({onPress, title1, title2}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.adminButtonContainer}>
        <Text style={styles.adminButtonText1}>{title1}</Text>
        <Text style={styles.adminButtonText2}>{title2}</Text>
    </TouchableOpacity>
  );
}
  export {AdminButton};
  
  const styles = StyleSheet.create({
    adminButtonContainer: {
      elevation: 8,
      backgroundColor: "BDE8E8",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 125,
      height: 125,
    },
    adminButtonText1: {
      fontSize: 12,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    adminButtonText2: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
    }
  });
