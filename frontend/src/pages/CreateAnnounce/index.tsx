import React, { useEffect, useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';
import api from '../../services/api';
import successImg from '../../assets/success.svg';
import Dropzone from '../../components/Dropzone';
import './styles.css';
import logo from '../../assets/logoAlt.svg';
import recycle from '../../assets/recycle.svg';

interface IBGEUFResponse {
  sigla: string;
}
interface IBGECityResponse {
  nome: string;
}

const CreatePoint: React.FC = () => {
  const [descriptionValue, setdescriptionValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
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
    price: '',
  });

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

  const handleSelectUf = useCallback((event: ChangeEvent<HTMLSelectElement>) =>{
    const uf = event.target.value;
    setSelectedUf(uf);
  },[])

  const handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const City = event.target.value;
    setSelectedCity(City);
  }
  const handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  const handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async const handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { name, email, whatsapp, password, price } = formData;
    const description = descriptionValue;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('password', password);
    data.append('price', price.split(',').join('.'));
    data.append('description', description);
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));

    if (selectedFile) {
      data.append('image', selectedFile);
    }
    try {
      await api.post('announce', data);

      setsuccessPage({
        map: 'hideMap',
        hideDiv: 'divShow',
      });
    } catch (message) {
      alert(message);
      console.log(message);
    }
  }

  return (
    <div className="cointainerAnnounce">
      <div id="page-create-point">
        <div id="divForm">
          <div className="titlePage">
            <img
              src={logo}
              alt="Logo"
              style={{ width: '120px', marginRight: '10px' }}
            />
            <h1>commerce</h1>
          </div>
          <img
            src={recycle}
            alt="recycle"
            style={{
              width: '850px',
              marginBottom: '0',
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
              <label htmlFor="name">Título</label>
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
            <div className="field-group">
              <div className="field">
                <label htmlFor="password">Password</label>

                <input
                  type="text"
                  name="password"
                  id="password"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="price">Preço</label>

                <input
                  type="text"
                  name="price"
                  id="price"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div
              className="field"
              style={{
                height: '200px',
              }}
            >
              <label htmlFor="description">Descrição</label>
              <textarea
                value={descriptionValue}
                onChange={e => setdescriptionValue(e.target.value)}
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

          <button type="submit">Cadastrar Anúncio</button>
        </form>
      </div>
      <div id="hide" className={successPage.hideDiv}>
        <div className="content">
          <div className="left">
            <main>
              <h1>Anúcio Cadastrado!</h1>

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
    </div>
  );
};
export default CreatePoint;
