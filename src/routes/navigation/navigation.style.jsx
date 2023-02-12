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

  svg {
    @media (max-width: 576px) {
      position: absolute;
      z-index: 9999;
    }
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
    position: absolute;
    z-index: 99;
    background-color: #fff;
    height: 120vh;
    margin-left: -1px;
    visibility: hidden;
    margin-left: -15px;
    margin-top: -15px;
    background-color: black;
    padding-top: 100px;
    padding-right: 30px;
    padding-left: 10px;
  }
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  @media (max-width: 576px) {
    display: block;
    color: white;
  }
`;

export const NavUser = styled.span`
  font-size: small;
`;
