import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";
import { Text, View } from "react-native";
import { Info } from "../info";
import { s } from "./styles";

export type DetailProps = {
  address: string;
  coupons: number;
  description: string;
  name: string;
  phone: string;
  rules: RuleProps[];
};

export type RuleProps = {
  description: string;
  id: string;
};

type Props = {
  data: DetailProps;
};

export function Details({ data }: Props) {
  return (
    <View style={s.container}>
      <Text style={s.name}>{data.name}</Text>
      <Text style={s.description}>{data.description}</Text>
      <View style={s.group}>
        <Text style={s.title}>Informações</Text>
        <Info
          icon={IconTicket}
          description={`${data.coupons} cupons disponíveis`}
        />
        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>

      <View style={s.group}>
        <Text style={s.title}>Regulamento</Text>
        {data.rules.map((rule) => (
          <Text key={rule.id} style={s.rule}>
            {`\u2022 ${rule.description}`}
          </Text>
        ))}
      </View>
    </View>
  );
}
