import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async () => {
    const correoNormalizado = correo.trim().toLowerCase();

    if (!correoNormalizado || !password.trim()) {
      Alert.alert("Campos incompletos", "Ingresa tu correo y contraseña.");
      return;
    }

    if (!correoValido.test(correoNormalizado)) {
      Alert.alert("Correo no válido", "Revisa el formato de tu correo.");
      return;
    }

    try {
      setCargando(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: correoNormalizado,
        password,
      });

      if (error) {
        Alert.alert("No se pudo iniciar sesión", error.message);
      }
    } catch (error: unknown) {
      Alert.alert(
        "Error de conexión",
        error instanceof Error
          ? error.message
          : "No fue posible iniciar sesión. Inténtalo de nuevo."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.pantalla}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formulario}>
          <Text style={styles.logo}>🏍️</Text>
          <Text style={styles.marca}>MOTO RACING</Text>
          <Text style={styles.titulo}>Inicia sesión</Text>
          <Text style={styles.subtitulo}>
            Accede para continuar con tu experiencia.
          </Text>

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="tu@correo.com"
            placeholderTextColor="#888888"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            textContentType="emailAddress"
            editable={!cargando}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu contraseña"
            placeholderTextColor="#888888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="current-password"
            textContentType="password"
            editable={!cargando}
            onSubmitEditing={() => void iniciarSesion()}
            returnKeyType="done"
          />

          <Pressable
            style={[styles.boton, cargando && styles.botonDeshabilitado]}
            onPress={() => void iniciarSesion()}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.botonTexto}>Iniciar sesión</Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => router.push("/registro")}
            disabled={cargando}
            accessibilityRole="button"
          >
            <Text style={styles.enlace}>¿No tienes cuenta? Regístrate</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#101010",
  },
  contenido: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  formulario: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },
  logo: {
    fontSize: 54,
    textAlign: "center",
    marginBottom: 8,
  },
  marca: {
    color: "#FF5722",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 3,
    textAlign: "center",
    marginBottom: 12,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitulo: {
    color: "#BDBDBD",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },
  label: {
    color: "#EEEEEE",
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    color: "#111111",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 54,
    fontSize: 16,
    marginBottom: 20,
  },
  boton: {
    minHeight: 54,
    backgroundColor: "#FF5722",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  botonDeshabilitado: {
    opacity: 0.7,
  },
  botonTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  enlace: {
    color: "#FF8A65",
    textAlign: "center",
    fontWeight: "600",
    marginTop: 22,
  },
});
