import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { colors, fontFamily } from "@/styles/theme";
import { router } from "expo-router";

type MarketProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MarketProps[]>([]);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      Alert.alert("Categorias", "Não foi possível carregar as categorias");
    }
  };

  const fetchMarkets = async () => {
    try {
      if (!category) {
        return;
      }
      const { data } = await api.get(`/markets/category/${category}`);
      setMarkets(data);
    } catch (error) {
      Alert.alert("Locais", "Não foi possível carregar os locais");
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        setCurrentLocation((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));
      }
    } catch {
      Alert.alert("Localização", "Não foi possível carregar sua localização");
    }
  };

  useEffect(() => {
    fetchCategories();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: "silver" }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />

      <MapView style={{ flex: 1 }} region={currentLocation}>
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />
        {markets.map((item) => (
          <Marker
            key={item.id}
            identifier={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {item.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places data={markets} />
    </View>
  );
}
