import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Map, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { Container, Controll, Selector, Items, Header } from './styles';
import '../CreatePoint/styles.css';
import api from '../../services/api';
import backIcon from '../../assets/back.svg';

interface IBGEUFResponse {
  sigla: string;
}
interface IBGECityResponse {
  nome: string;
}

interface Item {
  id: number;
  title: string;
  imagem_url: string;
}

interface Point {
  id: number;
  name: string;
  image: string;
  imagem_url: string;
  latitude: number;
  longitude: number;
}
const MapRoute: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [initialPosition, setinitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedItems, setselectedItems] = useState<number[]>([]);
  const [ufs, setufs] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [cities, setcities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('0');
  const [points, setPoints] = useState<Point[]>([]);

  const handleGetPoints = useCallback(async () => {
    console.log({
      city: selectedCity,
      uf: selectedUf,
      items: selectedItems,
    });
    const response = await api.get('points', {
      params: {
        city: selectedCity,
        uf: selectedUf,
        items: selectedItems,
      },
    });

    setPoints(response.data);
    console.log(response.data);
  }, [selectedItems, selectedCity, selectedUf]);

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);
        setufs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome);
        setcities(cityNames);
      });
  }, [selectedUf]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setinitialPosition([latitude, longitude]);
    });
  }, []);
  useEffect(() => {
    api.get('items').then(response => {
      const requestItems = response.data.reverse();

      setItems(requestItems);
    });
  }, []);

  const handelSelectedItem = useCallback(
    (id: number) => {
      const alreadySelected = selectedItems.findIndex(item => item === id);
      if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item !== id);
        setselectedItems(filteredItems);
      } else {
        setselectedItems([...selectedItems, id]);
      }
    },
    [selectedItems],
  );

  const handleSelectUf = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const uf = event.target.value;
      setSelectedUf(uf);
    },
    [],
  );

  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const City = event.target.value;
      setSelectedCity(City);
    },
    [],
  );
  return (
    <Container>
      <Map center={initialPosition} zoom={15}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map(pointMap => (
          <Marker
            className="marker"
            key={pointMap.id}
            icon={L.divIcon({
              html: ` <div>
            <img src=${pointMap.imagem_url} alt="pointMap" />
          <p numberOfLines={1}>${pointMap.name}</p>
        </div>`,
              className: 'marker',
            })}
            position={[pointMap.latitude, pointMap.longitude]}
          />
        ))}
      </Map>

      <Controll>
        <Header>
          <Link to="/Menu">
            <img src={backIcon} alt="voltar" />
          </Link>
        </Header>

        <Items>
          <ul>
            {items.map(item => (
              <li
                key={item.id}
                onClick={() => handelSelectedItem(item.id)}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
              >
                <img src={item.imagem_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </Items>
        <Selector>
          <div className="field">
            <label htmlFor="uf">Estado (UF)</label>
            <select
              name="uf"
              id="uf"
              value={selectedUf}
              onChange={handleSelectUf}
            >
              <option value="0">Selecione uma UF</option>
              {ufs.map(uf => (
                <option value={uf} key={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="city">Cidade</label>
            <select
              name="city"
              id="city"
              value={selectedCity}
              onChange={handleSelectCity}
            >
              <option value="0">Selecione uma cidade</option>
              {cities.map(city => (
                <option key={`Municipio de${city}`} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </Selector>
        <button type="button" onClick={handleGetPoints}>
          Buscar
        </button>
      </Controll>
    </Container>
  );
};

export default MapRoute;
