import { StyleSheet, Text, View } from "react-native";

export default function Imagenes() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Galería Moto Racing</Text>
      <Text style={styles.texto}>
        La galería de motocicletas estará disponible próximamente.
      </Text>
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
  texto: {
    color: "#6D4C41",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 12,
  },
});