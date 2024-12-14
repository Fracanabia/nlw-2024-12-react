import { Button } from "@/components/button";
import Loading from "@/components/loading";
import { Coupon } from "@/components/market/coupon";
import { Cover } from "@/components/market/cover";
import { DetailProps, Details } from "@/components/market/details";
import { api } from "@/services/api";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Alert, Modal, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type MarketProps = DetailProps & {
  cover: string;
};

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>();

  const [market, setMarket] = useState<MarketProps>();
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const [_, requestPermission] = useCameraPermissions();
  const qrLock = useRef(false);

  const fetchMarket = async () => {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setMarket(data);
      setIsLoading(false);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os dados", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  };

  const handleOpenCamera = async () => {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera");
      }
      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch {
      Alert.alert("Câmera", "Não foi possível utilizar a câmera");
    }
  };

  const getCoupon = async (id: string) => {
    try {
      setCouponIsFetching(true);
      const { data } = await api.patch(`/coupons/${id}`);
      Alert.alert("Cupom", data.coupon);
      setCoupon(data.coupon);
    } catch (e) {
      Alert.alert("Erro", "Não foi utilizar o cupom");
    } finally {
      setCouponIsFetching(false);
    }
  };

  const handleUseCoupon = (id: string) => {
    setIsVisibleCameraModal(false);
    Alert.alert(
      "Cupom",
      "Não é possível utilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        {
          style: "cancel",
          text: "Não",
        },
        { text: "Sim", onPress: () => getCoupon(id) },
      ]
    );
  };

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  if (isLoading) {
    return <Loading />;
  }

  if (!market) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={market.cover} />
        <Details data={market} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera} isLoading={couponIsFetching}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => {
                handleUseCoupon(data);
              }, 500);
            }
          }}
        />
        <View style={{ position: "absolute", left: 32, bottom: 32, right: 32 }}>
          <Button onPress={() => setIsVisibleCameraModal(false)}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
