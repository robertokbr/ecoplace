/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { FiKey, FiArrowLeft, FiTrash2 } from 'react-icons/fi';
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
  async function deleteRegister(id: number) {
    await api.delete(`/delete/${id}`);
    setData(data.filter(register => register.id !== id));
  }

  return (
    <div id="container">
      <div id="divForm">
        <div className="header">
          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </div>

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
                    margin: '17px 0 0 365px',
                    opacity: '50%',
                  }}
                />
              </div>

              <button type="submit">Buscar</button>
            </fieldset>
          </form>
        </div>
      </div>
      <div className="registrations">
        {data.map(register => (
          <div className="register" key={register.id}>
            <div className="registerContainer">
              <div className="registerImg">
                <img src={register.imagem_url} alt="Foto" />
              </div>
              <div className="registerContent">
                <div className="titleDelete">
                  <h3>{register.name}</h3>
                  <FiTrash2
                    onClick={() => {
                      deleteRegister(register.id);
                    }}
                  />
                </div>

                <div className="divTextPrice">
                  <h3>{register.price ? `R$${register.price}` : ''}</h3>

                  <p>{register.description}</p>
                </div>

                <div className="items">
                  <p>ITEMS ITEMS ITEMS </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Show;
