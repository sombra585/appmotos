import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function Menu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Moto Racing</Text>
      <Pressable
        style={styles.boton}
        onPress={() => router.replace("/(app)/index")}
      >
        <Text style={styles.botonTexto}>Volver al inicio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F8F6F0",
  },
  titulo: {
    color: "#3E2723",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  boton: {
    backgroundColor: "#5A3825",
    padding: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 24,
  },
  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});