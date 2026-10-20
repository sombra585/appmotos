import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

function RootNavigator() {
  const { session, cargando, error } = useAuth();

  if (cargando) {
    return (
      <View style={styles.estado}>
        <ActivityIndicator size="large" color="#FF5722" />
        <Text style={styles.textoEstado}>Verificando sesión...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.estado}>
        <Text style={styles.errorTitulo}>No se pudo recuperar la sesión</Text>
        <Text style={styles.textoEstado}>{error}</Text>
      </View>
    );
  }

  return (
    <Stack
      initialRouteName="(auth)"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#5A3825",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#F8F6F0",
        },
      }}
    >
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={Boolean(session)}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  estado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F8F6F0",
  },
  textoEstado: {
    color: "#6D4C41",
    textAlign: "center",
    marginTop: 12,
  },
  errorTitulo: {
    color: "#5A3825",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
