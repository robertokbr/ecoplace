import React from 'react';
import { FiLogIn, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './styles.css';

const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>

        <main>
          <h1>Seu Marketplace de coleta de resíduos.</h1>
          <p>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </p>
          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>
          <Link to="/create-announce">
            <span>
              <FiLogIn />
            </span>
            <strong>Anunciar produto reciclado</strong>
          </Link>
          <Link to="/get-point">
            <span>
              <FiSearch />
            </span>
            <strong>Ver cadastros</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};
export default Home;
