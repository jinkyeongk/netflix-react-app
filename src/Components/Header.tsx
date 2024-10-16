import { Link, useRouteMatch } from "react-router-dom";
import styled  from "styled-components";
import { motion } from "framer-motion";

const Nav = styled.nav`
    display:flex;
    position: fixed;
    top:0px;
    width:100%;
    height: 80px;    
    padding: 20px 60px;
    color: white;
    font-size: 12px;
    align-items: center;
    background-color: black;
    justify-content:space-between;
`;
    
const Col = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled(motion.svg)`
    width: 95px;
    height: 25px;
    margin-right: 50px;
    fill: ${(props) => props.theme.red};
    path {
    stroke-width: 6px;
    stroke: white;
    }
`;
const Items = styled.ul`
    display: flex;
    align-items: center;
`;

const Item = styled.li`
    position: relative;
    display: flex;
    color: ${(props) => props.theme.darker};
    margin-right: 20px;
    justify-content: center;
    flex-direction: column;
    transition: color 0.3s ease-in-out;
    &:hover {
    color: ${(props) => props.theme.lighter};
  }
`;

const Search = styled.span`
  color: white;
  svg {
    height: 25px;
  }
`;

const Circle = styled.span`
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};


function Header(){
    return (
        <Nav>
            <Col>
            <Logo variants={logoVariants} 
                whileHover="active"
                xmlns= "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
                initial="normal" width="1024"
                height="276.742"
                viewBox="0 0 1024 276.742">
                  
                </Logo> 
            <Items>
                <Item>Home</Item>
                <Item>Tv Shows</Item>
            </Items>
            </Col>
            <Col>
                <button>search</button>
            </Col>
        </Nav>
    );
}

export default Header;