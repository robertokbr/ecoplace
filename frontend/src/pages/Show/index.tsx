import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { FiKey, FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import find from '../../assets/find.svg';

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
    <div id="container">
      <div id="divForm">
        <header>
          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <div className="containerForm">
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
                  placeholder="Password"
                />
                <FiKey
                  style={{
                    position: 'absolute',
                    margin: '25px 0 0 350px',
                    opacity: '50%',
                  }}
                />
              </div>

              <button type="submit">Buscar</button>
            </fieldset>
          </form>
        </div>
        <img src={find} alt="Find" />
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
