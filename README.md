# README: Organização da Instalação de Pacotes

Este README serve como um guia para lembrar o propósito dos pacotes instalados em seu projeto e fornecer exemplos de uso simples.

## Pacotes e suas finalidades

### 1. **expo-font e @expo-google-fonts/rubik**

```bash
npx expo install expo-font @expo-google-fonts/rubik
```

**Finalidade:**

- `expo-font`: Utilizado para carregar fontes personalizadas no projeto Expo.
- `@expo-google-fonts/rubik`: Permite o uso da fonte Rubik da biblioteca de fontes do Google de forma otimizada.

**Exemplo de Uso:**

```javascript
import { useFonts } from "expo-font";
import { Rubik_400Regular } from "@expo-google-fonts/rubik";

const [fontsLoaded] = useFonts({
  Rubik_400Regular,
});

if (!fontsLoaded) return null;
```

### 2. **@tabler/icons-react-native**

```bash
npm install @tabler/icons-react-native
```

**Finalidade:**

- Biblioteca de ícones escaláveis baseada nos ícones do Tabler, projetada especificamente para React Native.

**Exemplo de Uso:**

```javascript
import { IconHome } from "@tabler/icons-react-native";

const HomeIcon = () => <IconHome size={24} color="black" />;
```

### 3. **react-native-svg**

```bash
npx expo install react-native-svg
```

**Finalidade:**

- Biblioteca essencial para renderizar gráficos vetoriais SVG em projetos React Native.

**Exemplo de Uso:**

```javascript
import Svg, { Circle } from "react-native-svg";

const MySvg = () => (
  <Svg height="100" width="100">
    <Circle cx="50" cy="50" r="40" stroke="black" strokeWidth="2" fill="red" />
  </Svg>
);
```

### 4. **@gorhom/bottom-sheet**

```bash
npm install @gorhom/bottom-sheet
```

**Finalidade:**

- Componente altamente personalizável para criar bottom sheets no React Native.

**Exemplo de Uso:**

```javascript
import BottomSheet from "@gorhom/bottom-sheet";

const MyBottomSheet = () => (
  <BottomSheet index={0} snapPoints={["25%", "50%"]}>
    <View>
      <Text>Conteúdo</Text>
    </View>
  </BottomSheet>
);
```

### 5. **react-native-reanimated e react-native-gesture-handler**

```bash
npx expo install react-native-reanimated react-native-gesture-handler
```

**Finalidade:**

- `react-native-reanimated`: Fornece animações fluidas e de alto desempenho.
- `react-native-gesture-handler`: Gerencia gestos como toques e deslizes de forma mais eficiente.

**Exemplo de Uso:**

```javascript
import Animated, { FadeIn } from "react-native-reanimated";

const MyAnimatedView = () => (
  <Animated.View entering={FadeIn.duration(500)}>
    <Text>Animação!</Text>
  </Animated.View>
);
```

### 6. **react-native-maps**

```bash
npx expo install react-native-maps
```

**Finalidade:**

- Permite a integração de mapas interativos no React Native.

**Exemplo de Uso:**

```javascript
import MapView from "react-native-maps";

const MyMap = () => (
  <MapView
    style={{ flex: 1 }}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
);
```

### 7. **expo-location**

```bash
npx expo install expo-location
```

**Finalidade:**

- Fornece acesso à localização do dispositivo.

**Exemplo de Uso:**

```javascript
import * as Location from "expo-location";

const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") return;
  const location = await Location.getCurrentPositionAsync();
  console.log(location);
};
```

### 8. **expo-camera**

```bash
npx expo install expo-camera
```

**Finalidade:**

- Permite o uso da câmera do dispositivo.

**Exemplo de Uso:**

```javascript
import { Camera } from "expo-camera";

const MyCamera = () => (
  <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} />
);
```

## Ordem sugerida para instalação

1. Pacotes essenciais do Expo:
   ```bash
   npx expo install expo-font @expo-google-fonts/rubik
   npx expo install react-native-svg
   npx expo install react-native-reanimated react-native-gesture-handler
   npx expo install react-native-maps
   npx expo install expo-location
   npx expo install expo-camera
   ```
2. Pacotes de terceiros:
   ```bash
   npm install @tabler/icons-react-native
   npm install @gorhom/bottom-sheet
   ```

## Notas adicionais

- Certifique-se de estar dentro da pasta do projeto antes de executar os comandos.
- Após instalar os pacotes, teste o projeto para garantir o funcionamento adequado das dependências.
