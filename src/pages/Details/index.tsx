import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, Linking, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import qs from 'qs';

import api from '../../services/api';

import Button from '../../components/ButtonWithIconInside';

import {
  Container,
  PointImage,
  PointName,
  PointItems,
  Address,
  AdressTitle,
  AdressContent,
  Footer,
} from './styles';

interface IPointDetails {
  name: string;
  email: string;
  phone: string;
  city: string;
  uf: string;
  image_url: string;
  point_items: {
    item: {
      id: string;
      title: string;
      image_url: string;
    };
  }[];
}

interface IRouteParams {
  point_id: string;
}

const Details: React.FC = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const routeParams = route.params as IRouteParams;

  const [pointDetails, setPointDetails] = useState<IPointDetails>();

  useEffect(() => {
    async function loadPointDetails() {
      const response = await api.get(`points/${routeParams.point_id}`);

      setPointDetails(response.data);
    }

    loadPointDetails();
  }, [routeParams.point_id]);

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleWhatsapp = useCallback(async () => {
    if (!pointDetails) return;

    const whathsappQuery = qs.stringify({
      phone: `+55${pointDetails.phone}`,
      text: `Olá ${pointDetails.name}, tenho alguns materiais separados para reciclagem, quando poderia deixar aí com vocês?`,
    });

    const canOpen = await Linking.canOpenURL(
      `whatsapp://send?${whathsappQuery}`,
    );

    if (!canOpen) {
      Alert.alert(
        'Falha ao tentar abrir aplicativo do whathsapp',
        'Tente novamente.',
      );

      return;
    }

    Linking.openURL(`whatsapp://send?${whathsappQuery}`);
  }, [pointDetails]);

  const handlePhoneCall = useCallback(async () => {
    if (!pointDetails) return;

    Linking.openURL(`tel:${pointDetails.phone}`);
  }, [pointDetails]);

  const handleSendEmail = useCallback(async () => {
    if (!pointDetails) return;

    const emailQuery = qs.stringify({
      subject: 'Entrega de materiais recicláveis',
      body: `Olá ${pointDetails.name}, tenho alguns materiais separados para reciclagem, quando poderia deixar aí com vocês?`,
    });

    const canOpen = await Linking.canOpenURL(
      `mailto:${pointDetails.email}?${emailQuery}`,
    );

    if (!canOpen) {
      Alert.alert(
        'Falha ao tentar abrir aplicativo de email',
        'Tente novamente.',
      );

      return;
    }

    Linking.openURL(`mailto:${pointDetails.email}?${emailQuery}`);
  }, [pointDetails]);

  return (
    <>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        {pointDetails && (
          <>
            <PointImage
              resizeMode="cover"
              source={{
                uri: pointDetails.image_url,
              }}
            />

            <PointName>{pointDetails.name}</PointName>
            <PointItems>
              {pointDetails.point_items
                .map((detail) => detail.item.title)
                .join(', ')}
            </PointItems>
            <Address>
              <AdressTitle>Endereço</AdressTitle>
              <AdressContent>
                {pointDetails.city}, {pointDetails.uf}
              </AdressContent>
            </Address>
          </>
        )}
      </Container>
      <Footer>
        <Button
          title="Whatsapp"
          enabled={!!pointDetails}
          icon="whatsapp"
          onPress={handleWhatsapp}
        >
          Whatsapp
        </Button>
        <Button
          title="Telefone"
          enabled={!!pointDetails}
          icon="phone"
          onPress={handlePhoneCall}
        >
          Whatsapp
        </Button>
        <Button
          title="E-mail"
          enabled={!!pointDetails}
          icon="envelope-o"
          onPress={handleSendEmail}
        >
          E-mail
        </Button>
      </Footer>
    </>
  );
};

export default Details;
