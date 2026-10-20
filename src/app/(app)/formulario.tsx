import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { supabase } from '../../lib/supabase';

export default function Formulario() {
  const [nombre, setNombre] = useState('');
  const [moto, setMoto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [financiacion, setFinanciacion] = useState(false);

  const [procesando, setProcesando] = useState(false);
  const [resultado, setResultado] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const realizarPedido = async () => {
    if (
      nombre.trim() === '' ||
      moto.trim() === '' ||
      cantidad.trim() === ''
    ) {
      setResultado('Debes completar todos los campos.');
      return;
    }

    try {
      setProcesando(true);
      setResultado('');

      // Insertar en la tabla clientes_motos de Supabase
      const { data, error } = await supabase
        .from('clientes_motos')
        .insert([
          {
            nombre: nombre.trim(),
            correo: 'cliente@motos.com',
            telefono: '3000000000',
            ciudad: 'No especificada',
            moto_favorita: moto.trim(),
            tipo_preparacion: `Cantidad: ${cantidad} | Financiación: ${financiacion ? 'Sí' : 'No'}`,
          },
        ])
        .select();

      if (error) {
        console.log('Error Supabase:', error);
        setResultado(`Error al guardar en Supabase: ${error.message}`);
        return;
      }

      setResultado(
        `Cliente: ${nombre}\nMotocicleta: ${moto}\nCantidad: ${cantidad}\nFinanciación: ${financiacion ? 'Sí' : 'No'}`
      );

      setModalVisible(true);
    } catch (err: any) {
      console.log('Error atrapado:', err);
      setResultado('No fue posible guardar la información. Revisa tu conexión.');
    } finally {
      setProcesando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.pantalla}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contenido}
      >
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <Text style={styles.logo}>🏍</Text>
          <Text style={styles.titulo}>Moto Racing</Text>
          <Text style={styles.subtitulo}>
            Tu próxima aventura comienza aquí.
          </Text>
        </View>

        {/* IMAGEN */}
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800',
          }}
          style={styles.imagen}
        />

        {/* TÍTULO DEL FORMULARIO */}
        <Text style={styles.tituloFormulario}>Solicita tu motocicleta</Text>
        <Text style={styles.descripcionFormulario}>
          Completa los datos para registrar tu solicitud.
        </Text>

        {/* NOMBRE */}
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          placeholderTextColor="#888888"
          value={nombre}
          onChangeText={setNombre}
        />

        {/* MOTOCICLETA */}
        <Text style={styles.label}>Motocicleta</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Yamaha MT-07"
          placeholderTextColor="#888888"
          value={moto}
          onChangeText={setMoto}
        />

        {/* CANTIDAD */}
        <Text style={styles.label}>Número de motocicletas</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 1"
          placeholderTextColor="#888888"
          value={cantidad}
          onChangeText={setCantidad}
          keyboardType="numeric"
        />

        {/* FINANCIACIÓN */}
        <View style={styles.filaSwitch}>
          <View style={styles.textoSwitch}>
            <Text style={styles.switchTitulo}>Solicitar financiación</Text>
            <Text style={styles.switchDescripcion}>
              Activa si deseas financiar tu motocicleta
            </Text>
          </View>

          <Switch
            value={financiacion}
            onValueChange={setFinanciacion}
            trackColor={{
              false: '#555555',
              true: '#FF5722',
            }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* BOTÓN */}
        <Pressable
          style={[styles.boton, procesando && { opacity: 0.7 }]}
          onPress={realizarPedido}
          disabled={procesando}
        >
          <Text style={styles.botonTexto}>
            {procesando ? 'Procesando...' : 'Solicitar motocicleta'}
          </Text>
        </Pressable>

        {/* CARGANDO */}
        {procesando && (
          <View style={styles.cargando}>
            <ActivityIndicator size="large" color="#FF5722" />
            <Text style={styles.cargandoTexto}>
              Procesando solicitud...
            </Text>
          </View>
        )}

        {/* RESULTADO */}
        {resultado !== '' && (
          <View style={styles.resultado}>
            <Text style={styles.resultadoTitulo}>Resumen de la solicitud</Text>
            <Text style={styles.resultadoTexto}>{resultado}</Text>
          </View>
        )}
      </ScrollView>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalFondo}>
          <View style={styles.modalContenido}>
            <Text style={styles.modalIcono}>🏍️</Text>
            <Text style={styles.modalTitulo}>¡Solicitud recibida!</Text>
            <Text style={styles.modalTexto}>Hola {nombre}.</Text>
            <Text style={styles.modalTexto}>
              Hemos recibido tu solicitud para la {moto}.
            </Text>
            <Text style={styles.modalTexto}>
              Uno de nuestros asesores se pondrá en contacto contigo.
            </Text>

            <Pressable
              style={styles.modalBoton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalBotonTexto}>¡Excelente!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#101010',
  },
  contenido: {
    padding: 22,
    paddingTop: 45,
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    fontSize: 48,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitulo: {
    fontSize: 14,
    color: '#BDBDBD',
    marginTop: 4,
    textAlign: 'center',
  },
  imagen: {
    width: '100%',
    height: 190,
    borderRadius: 22,
    marginBottom: 30,
  },
  tituloFormulario: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  descripcionFormulario: {
    color: '#BDBDBD',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 25,
  },
  label: {
    color: '#EEEEEE',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 54,
    backgroundColor: '#FFFFFF',
    color: '#000000', // Fuerza el color del texto visible
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  filaSwitch: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#333333',
  },
  textoSwitch: {
    flex: 1,
    paddingRight: 10,
  },
  switchTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  switchDescripcion: {
    color: '#AAAAAA',
    fontSize: 11,
    marginTop: 3,
  },
  boton: {
    height: 56,
    backgroundColor: '#FF5722',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cargando: {
    alignItems: 'center',
    marginTop: 25,
  },
  cargandoTexto: {
    color: '#FF8A65',
    marginTop: 10,
  },
  resultado: {
    backgroundColor: '#252525',
    borderRadius: 18,
    padding: 20,
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  resultadoTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  resultadoTexto: {
    fontSize: 15,
    color: '#DDDDDD',
    lineHeight: 25,
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  modalContenido: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
  },
  modalIcono: {
    fontSize: 55,
  },
  modalTitulo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 10,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalTexto: {
    color: '#616161',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 21,
  },
  modalBoton: {
    width: '100%',
    backgroundColor: '#FF5722',
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 25,
  },
  modalBotonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});