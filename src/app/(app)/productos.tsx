import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function Productos() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Catálogo de motocicletas</Text>
      <Text style={styles.texto}>
        Estamos preparando nuestros modelos. Si deseas información, puedes
        enviarnos una solicitud.
      </Text>
      <Pressable
        style={styles.boton}
        onPress={() => router.push("/formulario")}
      >
        <Text style={styles.botonTexto}>Solicitar información</Text>
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
  texto: {
    color: "#6D4C41",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 12,
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