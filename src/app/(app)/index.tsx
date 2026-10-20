import {
  Alert,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { useState } from 'react';

import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function Inicio() {
  const [cerrandoSesion, setCerrandoSesion] = useState(false);

  const cerrarSesion = async () => {
    try {
      setCerrandoSesion(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        Alert.alert('No se pudo cerrar sesión', error.message);
      }
    } catch (error: unknown) {
      Alert.alert(
        'Error al cerrar sesión',
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado. Inténtalo de nuevo.'
      );
    } finally {
      setCerrandoSesion(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contenido}
    >
      {/* ENCABEZADO */}
      <Text style={styles.logo}>MOTO RACING</Text>

      <Text style={styles.titulo}>
        Vive la pasión por las motocicletas
      </Text>

      <Text style={styles.subtitulo}>
        Potencia, diseño y aventura en un solo lugar.
      </Text>

      {/* IMAGEN PRINCIPAL */}
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80',
        }}
        style={styles.imagenPrincipal}
      />

      {/* BIENVENIDA */}
      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>
          Bienvenido a Moto Racing 🏍️
        </Text>

        <Text style={styles.texto}>
          Encuentra motocicletas, conoce nuestros modelos,
          explora la galería y solicita información sobre
          la moto que más te guste.
        </Text>

        <Pressable
          style={styles.boton}
          onPress={() => router.push('/productos')}
        >
          <Text style={styles.textoBoton}>
            Ver motocicletas
          </Text>
        </Pressable>
      </View>

      {/* ESTADÍSTICAS */}
      <View style={styles.estadisticas}>
        <View style={styles.estadistica}>
          <Text style={styles.numero}>20+</Text>
          <Text style={styles.etiqueta}>Modelos</Text>
        </View>

        <View style={styles.estadistica}>
          <Text style={styles.numero}>10+</Text>
          <Text style={styles.etiqueta}>Años</Text>
        </View>

        <View style={styles.estadistica}>
          <Text style={styles.numero}>500+</Text>
          <Text style={styles.etiqueta}>Clientes</Text>
        </View>
      </View>

      {/* MENÚ RÁPIDO */}
      <Text style={styles.seccion}>
        Accesos rápidos
      </Text>

      <View style={styles.menuRapido}>

        <Pressable
          style={styles.menuItem}
          onPress={() => router.push('/imagenes')}
        >
          <Text style={styles.menuIcono}>🖼️</Text>
          <Text style={styles.menuTexto}>Galería</Text>
        </Pressable>

        <Pressable
          style={styles.menuItem}
          onPress={() => router.push('/contacto')}
        >
          <Text style={styles.menuIcono}>📞</Text>
          <Text style={styles.menuTexto}>Contacto</Text>
        </Pressable>

        <Pressable
          style={styles.menuItem}
          onPress={() => router.push('/explore')}
        >
          <Text style={styles.menuIcono}>🔎</Text>
          <Text style={styles.menuTexto}>Explorar</Text>
        </Pressable>

      </View>

      {/* FORMULARIO */}
      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>
          Solicita información
        </Text>

        <Text style={styles.texto}>
          ¿Te interesa una motocicleta?
          Déjanos tus datos y nos pondremos en contacto contigo.
        </Text>

        <Pressable
          style={styles.boton}
          onPress={() => router.push('/formulario')}
        >
          <Text style={styles.textoBoton}>
            Ir al formulario
          </Text>
        </Pressable>
      </View>

      {/* CONTACTO */}
      <View style={styles.tarjetaContacto}>
        <Text style={styles.tituloContacto}>
          ¿Necesitas ayuda?
        </Text>

        <Text style={styles.textoContacto}>
          Nuestro equipo está listo para atenderte.
        </Text>

        <Pressable
          style={styles.botonOscuro}
          onPress={() => router.push('/contacto')}
        >
          <Text style={styles.textoBoton}>
            Contactarnos
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.botonCerrar, cerrandoSesion && styles.botonDeshabilitado]}
        onPress={() => void cerrarSesion()}
        disabled={cerrandoSesion}
      >
        <Text style={styles.textoCerrar}>
          {cerrandoSesion ? 'Cerrando sesión...' : 'Cerrar sesión'}
        </Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1EF',
  },

  contenido: {
    padding: 20,
    paddingBottom: 40,
  },

  logo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C65D3B',
    letterSpacing: 2,
    marginBottom: 12,
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222222',
    lineHeight: 38,
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 23,
    marginBottom: 20,
  },

  imagenPrincipal: {
    width: '100%',
    height: 230,
    borderRadius: 20,
    marginBottom: 20,
  },

  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,

    elevation: 3,

    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  tituloTarjeta: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 10,
  },

  texto: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 23,
    marginBottom: 18,
  },

  boton: {
    backgroundColor: '#C65D3B',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  botonOscuro: {
    backgroundColor: '#222222',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  estadisticas: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 20,
    marginBottom: 25,
  },

  estadistica: {
    flex: 1,
    alignItems: 'center',
  },

  numero: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#C65D3B',
  },

  etiqueta: {
    fontSize: 13,
    color: '#666666',
    marginTop: 4,
  },

  seccion: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 12,
  },

  menuRapido: {
    flexDirection: 'row',
    backgroundColor: '#D79B8A',
    borderRadius: 15,
    marginBottom: 25,
    overflow: 'hidden',
  },

  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },

  menuIcono: {
    fontSize: 22,
    marginBottom: 5,
  },

  menuTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  tarjetaContacto: {
    backgroundColor: '#D79B8A',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  tituloContacto: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },

  textoContacto: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 22,
    marginBottom: 18,
  },

  botonCerrar: {
    backgroundColor: '#8E3B46',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 4,
  },

  botonDeshabilitado: {
    opacity: 0.7,
  },

  textoCerrar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});