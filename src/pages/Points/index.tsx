import React, { useCallback, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import { PermissionsAndroid, Alert, Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';

import api from '../../services/api';

import {
  Container,
  Title,
  Description,
  Notice,
  MapContainer,
  Map,
  MapMarker,
  MapMarkerContainer,
  MapMarkerImage,
  MapMarkerTitle,
  Arrow,
  ItemsContainer,
  Item,
  ItemTitle,
} from './styles';

interface IItem {
  id: string;
  title: string;
  image_url: string;
}

interface IPoint {
  id: string;
  name: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface IRouteParams {
  state?: {
    uf: string;
    name: string;
  };
  city?: {
    name: string;
  };
}

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface IGoogleResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
}

const Points: React.FC = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');

  const route = useRoute();
  const routeParams = route.params as IRouteParams;
  const { city, state } = routeParams;

  const [items, setItems] = useState<IItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [points, setPoints] = useState<IPoint[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<IRegion>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.011,
    longitudeDelta: 0.011 * (width / height),
  });
  const [mapReady, setMapReady] = useState(0);

  useEffect(() => {
    async function loadItems() {
      const response = await api.get('items');

      setItems(response.data);
    }

    loadItems();
  }, []);

  useEffect(() => {
    async function loadSelectedPosition() {
      const selectedLocation = `${city?.name || ''}, ${state?.name || ''}`;

      const response = await axios.get<IGoogleResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${selectedLocation}&key=AIzaSyCrcTIDgo7GRhc0kUe0CyNbt-LyFXx5ndA`,
      );

      const { lat, lng } = response.data.results[0].geometry.location;

      setSelectedRegion((prevState) => ({
        ...prevState,
        latitude: lat,
        longitude: lng,
      }));
    }

    async function loadCurrentPosition() {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (permission !== 'granted') {
        Alert.alert(
          'Ooops...',
          'Precisamos de sua permissão para saber a sua localização',
        );
        return;
      }
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setSelectedRegion((prevState) => ({
            ...prevState,
            latitude,
            longitude,
          }));
        },
        () => {
          Alert.alert(
            'Ooops...',
            'Ocorreu algum erro ao obter a sua localização',
          );
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }

    if (state) {
      loadSelectedPosition();
    } else {
      loadCurrentPosition();
    }
  }, [city?.name, state]);

  useEffect(() => {
    async function loadPoints() {
      const response = await api.get('points', {
        params: {
          city: city?.name,
          uf: state?.uf,
          items: selectedItems,
        },
      });

      setPoints(response.data);
    }

    loadPoints();
  }, [city?.name, selectedItems, state?.uf]);

  const handleSelectItem = useCallback(
    (item_id: string) => {
      const itemSelected = selectedItems.findIndex((item) => item === item_id);

      if (itemSelected >= 0) {
        setSelectedItems(selectedItems.filter((item) => item !== item_id));
      } else {
        setSelectedItems([...selectedItems, item_id]);
      }
    },
    [selectedItems],
  );

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNavigateToDetail = useCallback(
    (point_id: string) => {
      navigation.navigate('Details', { point_id });
    },
    [navigation],
  );

  return (
    <>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Title>Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta.</Description>
        <Notice>
          Apenas serão exibidos pontos de coleta para a cidade selecionada na
          tela anterior, para visualizar pontos de coleta em outra cidade, volte
          à tela anterior e selecione a cidade desejada.
        </Notice>

        <MapContainer style={{ paddingTop: mapReady }}>
          {selectedRegion.latitude !== 0 && (
            <Map
              provider={PROVIDER_GOOGLE}
              showsUserLocation
              followsUserLocation
              showsMyLocationButton
              onMapReady={() => setMapReady(1)}
              initialRegion={selectedRegion}
            >
              {points.length > 0 &&
                points.map((point) => (
                  <MapMarker
                    key={point.id}
                    onPress={() => handleNavigateToDetail(point.id)}
                    coordinate={{
                      latitude: point.latitude,
                      longitude: point.longitude,
                    }}
                  >
                    <MapMarkerContainer>
                      <MapMarkerImage source={{ uri: point.image_url }} />
                      <MapMarkerTitle>{point.name}</MapMarkerTitle>
                    </MapMarkerContainer>
                    <Arrow />
                  </MapMarker>
                ))}
            </Map>
          )}
        </MapContainer>
      </Container>
      <ItemsContainer>
        <FlatList
          style={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          data={items}
          scrollEnabled
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              key={item.id}
              activeOpacity={0.6}
              isSelected={selectedItems.includes(item.id)}
              onPress={() => handleSelectItem(item.id)}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <ItemTitle>{item.title}</ItemTitle>
            </Item>
          )}
        />
      </ItemsContainer>
    </>
  );
};

export default Points;
