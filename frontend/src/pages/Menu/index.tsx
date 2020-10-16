import React from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, Card, Cards, Header } from './styles';
import ecoIcon from '../../assets/icons/ecoIcon.svg';
import iconBuy from '../../assets/icons/iconBuy.svg';
import iconPoints from '../../assets/icons/iconPoints.svg';
import iconMyAnnounce from '../../assets/icons/iconMyAnnounce.svg';
import backIcon from '../../assets/back.svg';

const Menu: React.FC = () => {
  return (
    <Container>
      <Header>
        <Link to="/">
          <img src={backIcon} alt="voltar" />
        </Link>
      </Header>
      <Cards>
        <Card>
          <Link to="/create-announce">
            <img src={iconBuy} alt="Eco" />

            <div>
              <strong>Ecommerce</strong>
              <p>Crie seus próprios anuncios de produtos ecologicos</p>
              <FiArrowRight size={30} />
            </div>
          </Link>
        </Card>
        <Card>
          <Link to="/create-point">
            <img src={ecoIcon} alt="Eco" />

            <div>
              <strong>Ecoleta</strong>
              <p>Anuncie um ponto de coleta de reciclaveis</p>
              <FiArrowRight size={30} />
            </div>
          </Link>
        </Card>
        <Card>
          <Link to="/map">
            <img src={iconPoints} alt="Eco" />

            <div>
              <strong>Buscar</strong>
              <p>
                Busque por pontos de coleta e anúncios de produtos ecologicos
              </p>
              <FiArrowRight size={30} />
            </div>
          </Link>
        </Card>
        <Card>
          <Link to="/get-point">
            <img src={iconMyAnnounce} alt="Eco" />

            <div>
              <strong>Seus anuncios</strong>
              <p>Reveja seus anúncios</p>

              <FiArrowRight size={30} />
            </div>
          </Link>
        </Card>
      </Cards>
    </Container>
  );
};

export default Menu;
