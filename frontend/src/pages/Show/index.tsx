import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface Announce {
  id: number;
  image: string;
  name: string;
  email: string;
  whatsapp: number;
  city: string;
  uf: string;
  price: number;
  description: string;
  password: string;
  imagem_url: string;
}

const Show: React.FC = () => {
  const [formData, setFormData] = useState({
    password: '',
  });
  const [submitedPassword, setsubmitedPassword] = useState('');
  const [data, setData] = useState<Announce[]>([]);

  useEffect(() => {
    api.get(`announce/${submitedPassword}`).then(response => {
      setData(response.data);
    });
  }, [submitedPassword]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { password } = formData;
    setsubmitedPassword(password);
  }

  return (
    <div className="container">
      <div id="page-create-point">
        <header>
          <img src={logo} alt="Ecoleta" />
          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <form onSubmit={handleSubmit}>
          <h1>Buscar cadastros</h1>

          <fieldset>
            <legend>
              <h2>Palavra magica</h2>
            </legend>

            <div className="field">
              <label htmlFor="password" />
              <input
                type="text"
                name="password"
                id="password"
                onChange={handleInputChange}
              />
            </div>

            <button type="submit">Buscar</button>
          </fieldset>
        </form>
      </div>
      <div className="registrations">
        {data.map(register => (
          <div className="register">
            <h1>{register.name}</h1>
            <img src={register.imagem_url} alt="Foto" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Show;
