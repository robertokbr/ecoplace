import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';
import api from '../../services/api';
import successImg from '../../assets/success.svg';
import Dropzone from '../../components/Dropzone';
import logo from '../../assets/logoAlt.svg';
import recycle from '../../assets/recycling_.svg';

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
  const [selectedFile, setSelectedFile] = useState<File>();
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
    password: '',
  });

  const [selectedItems, setselectedItems] = useState<number[]>([]);

  const [successPage, setsuccessPage] = useState({
    map: '',
    hideDiv: 'divHide ',
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setinitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get('items').then(response => {
      const requestItems = response.data;
      requestItems.splice(requestItems[0], 1);
      setItems(requestItems);
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
    event.preventDefault();
    const { name, email, whatsapp, password } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const item = selectedItems;
    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('password', password);
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('items', item.join(','));

    if (selectedFile) {
      data.append('image', selectedFile);
    }
    try {
      await api.post('points', data);
      console.log(data);
      setsuccessPage({
        map: 'hideMap',
        hideDiv: 'divShow',
      });
    } catch (errors) {
      alert(errors);
    }
  }

  return (
    <>
      <div id="page-create-point">
        <div id="divForm">
          <div className="titlePage">
            <img
              src={logo}
              alt="Logo"
              style={{ width: '120px', marginRight: '10px' }}
            />
            <h1>coleta</h1>
          </div>
          <img
            src={recycle}
            alt="recycle"
            style={{
              width: '750px',
            }}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="header">
            <Link to="/">
              <FiArrowLeft />
              Voltar para home
            </Link>
          </div>

          <Dropzone onFileUploaded={setSelectedFile} />
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

            <div className="field">
              <label htmlFor="email">Password</label>

              <input
                type="text"
                name="password"
                id="password"
                onChange={handleInputChange}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>

            <Map
              className={successPage.map}
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
      <div id="hide" className={successPage.hideDiv}>
        <div className="content">
          <div className="left">
            <main>
              <h1>Cadastro realizado!</h1>

              <Link to="/">
                <span>
                  <FiArrowLeft />
                </span>
                <strong>Voltar para Home</strong>
              </Link>
            </main>
          </div>
          <img src={successImg} alt="success" />
        </div>
      </div>
    </>
  );
};
export default CreatePoint;
