import React from 'react';
import { FiLogIn, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logoAlt.svg';
import './styles.css';

const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <div className="headerContainer">
            <img
              src={logo}
              alt="Ecoleta"
              style={{ width: '5rem', marginRight: '5px' }}
            />
            <h1>coplace</h1>
          </div>
        </header>

        <main>
          <h1>
            Recicle, Venda
            <br />e ajude o planeta com o Ecoplace!
          </h1>
          <p>
            No ecoplace você pode cadastrar no mapa pontos de coleta do seu
            material reciclado, comprar produtos ecologicos e muito mais!
          </p>
          <Link to="/menu">
            <span>
              <FiLogIn />
            </span>
            <strong>Iniciar</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};
export default Home;
