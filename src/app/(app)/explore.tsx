import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de Ejemplares</Text>
      <Text style={styles.subtitle}>Caballos de Paso Fino y Cuarto de Milla</Text>

      {/* Botón para regresar a la pantalla principal */}
      <Pressable style={styles.botonVolver} onPress={() => router.back()}>
        <Text style={styles.textoBoton}>Volver a Inicio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
  },
  botonVolver: {
    marginTop: 30,
    backgroundColor: '#6C757D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
