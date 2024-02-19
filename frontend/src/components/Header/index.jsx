import { Container, Logo, Receipts, Logout, Admin, Menu,CartImage  } from "./style";
import { BiMenu } from "react-icons/bi";
import { BsHexagonFill } from "react-icons/bs";
import receipt from "../../assets/receipt.svg";
import { useMediaQuery } from "react-responsive";
import { Search } from "../Search/Index";
import { BsSearch } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import headerImage from "../../assets/headerImage.png";


export function Header({
  handleInputChange,
  handleOpenMenu,
  handleCloseMenu,
  quantity,
  handleOpenModal,
  user
}) {
  const navigate = useNavigate("");

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [menu, setMenu] = useState(false);



  return (
    <Container>
      {(!menu || isDesktop) && user && (
        <nav>
          {isDesktop ? (
            ""
          ) : (
            <button>
              <BiMenu
                onClick={() => {
                  handleOpenMenu();
                  setMenu(true);
                }}
              />
            </button>
          )}

          <Admin>
            <Logo
              onClick={() => {
                navigate("/");
              }}
            >
              <img src={headerImage} alt="" />
            </Logo>
            {user.role == "admin" && <span>admin</span>}
          </Admin>

          {isDesktop ? (
            <Search
              icon={BsSearch}
              placeholder={"Busque por pratos ou ingredientes"}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          ) : (
            ""
          )}

          <Receipts
            style={{
              visibility: user.role == "admin" && !isDesktop ? "hidden" : "",
            }}
            onClick={() => {
              if (user.role !== "admin") {
                if (quantity == 0) {
                  return alert("Coleque pedidos na sacola antes");
                }
                handleOpenModal();
              }
            }}
          >
            {user.role !== "admin" ? (
              <>
                <CartImage  src={receipt} alt="imagem do carrinho" />
                {isDesktop ? (
                  <div>Pedidos ({quantity})</div>
                ) : (
                  <div>{quantity}</div>
                )}
              </>
            ) : (
              <div
                onClick={() => {
                  navigate("/create");
                }}
              >
                Novo Prato
              </div>
            )}
          </Receipts>

          {isDesktop ? (
            <Logout>
              <FiLogOut />
            </Logout>
          ) : (
            ""
          )}
        </nav>
      )}
      {menu && !isDesktop && (
        <Menu>
          <button
            onClick={() => {
              handleCloseMenu();
              setMenu(false);
            }}
          >
            <AiOutlineClose />
            Menu
          </button>
        </Menu>
      )}
    </Container>
  );
}
