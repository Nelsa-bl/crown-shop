import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  position: relative;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
  margin-top: -12px;

  @media (max-width: 576px) {
    padding-left: 0;
  }
`;

export const NavLinks = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 576px) {
    display: block;
    position: fixed;
    z-index: 99;
    background-color: #fff;
    margin-left: -1px;
    visibility: hidden;
  }
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  @media (max-width: 576px) {
    display: block;
  }
`;

export const NavUser = styled.span`
  font-size: small;
`;
