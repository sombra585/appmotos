import { StyleSheet, Text, View } from 'react-native';

export default function Contacto() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contáctanos</Text>

      <Text style={styles.texto}>Moto Racing</Text>
      <Text style={styles.texto}>Teléfono: 300 000 0000</Text>
      <Text style={styles.texto}>
        Correo: contacto@motoracing.com
      </Text>
      <Text style={styles.texto}>
        Estamos para ayudarte.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 22,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  texto: {
    color: '#DDDDDD',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
});