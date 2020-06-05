import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import success from '../../assets/success.svg';

interface Item {
  id: number;
  title: string;
  imagem_url: string;
}
interface IBGEUFResponse {
  sigla: string;
}
interface IBGECityResponse {
  nome: string;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setufs] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [cities, setcities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [initialPosition, setinitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });
  const [backgroundSubmit, setbackgroundSubmit] = useState({
    map: '',
    back: 'null',
  });

  const [selectedItems, setselectedItems] = useState<number[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setinitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

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

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const City = event.target.value;
    setSelectedCity(City);
  }
  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handelSelectedItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);
    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setselectedItems(filteredItems);
    } else {
      setselectedItems([...selectedItems, id]);
    }
  }
  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault();
      const { name, email, whatsapp } = formData;
      const uf = selectedUf;
      const city = selectedCity;
      const [latitude, longitude] = selectedPosition;
      const item = selectedItems;
      const data = {
        name,
        email,
        whatsapp,
        uf,
        city,
        latitude,
        longitude,
        items: item,
      };

      await api.post('points', data);
      setbackgroundSubmit({
        map: 'hide',
        back: 'sucessBackground',
      });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <div id="page-create-point">
        <header>
          <img src={logo} alt="Ecoleta" />
          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <form onSubmit={handleSubmit}>
          <h1>
            Cadastro do
            <br />
            ponto de coleta
          </h1>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInputChange}
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="email">E-mail</label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                />
              </div>

              <div className="field">
                <label htmlFor="Whatsapp">Whatsapp</label>
                <input
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>

            <Map
              className={backgroundSubmit.map}
              center={initialPosition}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={selectedPosition} />
            </Map>

            <div className="field-group">
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
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Itens de coleta</h2>
              <span>Selecione um ou mais itens abaixo</span>
            </legend>

            <ul className="items-grid">
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
          </fieldset>

          <button type="submit">Cadastrar ponto de coleta</button>
        </form>
      </div>

      <div id="hideDiv" className={backgroundSubmit.back}>
        <div className="content">
          <main>
            <h1>Cadastro concluido!</h1>

            <Link to="/">
              <span>
                <FiArrowLeft />
              </span>
              <strong>Voltar para home</strong>
            </Link>
          </main>
          <img src={success} alt="success" />
        </div>
      </div>
    </>
  );
};
export default CreatePoint;
