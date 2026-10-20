import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ title: "Inicio" }} />
      <Stack.Screen name="formulario" options={{ title: "Formulario" }} />
      <Stack.Screen name="resultado" options={{ title: "Datos registrados" }} />
      <Stack.Screen name="registros" options={{ title: "Registros" }} />
      <Stack.Screen name="imagenes" options={{ title: "Galería" }} />
      <Stack.Screen name="contacto" options={{ title: "Contacto" }} />
      <Stack.Screen name="productos" options={{ title: "Motocicletas" }} />
      <Stack.Screen name="menu" options={{ title: "Menú" }} />
      <Stack.Screen name="explore" options={{ title: "Explorar" }} />
    </Stack>
  );
}
