import React from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, Card, Cards, Header } from './styles';
import ecoIcon from '../../assets/icons/ecoIcon.svg';

const Menu: React.FC = () => {
  return (
    <Container>
      <Header>
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </Header>
      <Cards>
        <Card>
          <Link to="/create-announce">
            <img src={ecoIcon} alt="Eco" />

            <div>
              <strong>Ecommerce</strong>
              <p>Crie seus próprios anuncios de produtos ecologicos</p>
              <FiArrowRight size={20} color="white" />
            </div>
          </Link>
        </Card>
        <Card>
          <Link to="/create-announce">
            <div>
              <strong>Ecoleta</strong>
              <p>Anuncie um ponto de coleta de reciclaveis</p>
              <FiArrowRight size={20} color="white" />
            </div>
          </Link>
        </Card>
        <Card>
          <Link to="/create-announce">
            <div>
              <strong>Buscar</strong>
              <p>
                Busque por pontos de coleta e anúncios de produtos ecologicos
              </p>
              <FiArrowRight size={20} color="white" />
            </div>
          </Link>
        </Card>
        <Card>
          <Link to="/create-announce">
            <div>
              <strong>Seus anuncios</strong>
              <p>Reveja seus anúncios</p>

              <FiArrowRight size={20} color="white" />
            </div>
          </Link>
        </Card>
      </Cards>
    </Container>
  );
};

export default Menu;
