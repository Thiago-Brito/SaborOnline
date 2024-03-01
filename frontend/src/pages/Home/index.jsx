import { Header } from "../../components/Header";
import {
  Container,
  Flavor,
  Foods,
  Prev,
  Next,
  Content,
  Menu,
  Modal,
} from "./style";
import flavor from "../../assets/flavor.png";
import flavor2 from "../../assets/flavor2.png";
import food from "../../assets/food.png";


import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

import Slider from "react-slick";
import { CardFood } from "../../components/CardFood";
import { useState, useEffect } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useMediaQuery } from "react-responsive";
import { Search } from "../../components/Search/Index";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

import { useAuth } from "../../hooks/auth";
import { api } from "../../Services/api";

export function Home() {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const slidesToShow = isDesktop ? 3.5 : 1.65;
  const initialSlide = isDesktop ? 0 : 0;
  const { signOut, user } = useAuth();

  const navigate = useNavigate("");

  const cards = [
    {
      image: food,
      title: "teste",
      price: 41,
      description: "teste",
      id: 1
    },
    {
      image: food,
      title: "teste",
      price: 41,
      description: "teste",
      id: 2
    },
    {
      image: food,
      title: "teste",
      price: 41,
      description: "teste",
      id: 3
    }, {
      image: food,
      title: "teste",
      price: 41,
      description: "teste",
      id: 4
    }, {
      image: food,
      title: "teste",
      price: 41,
      description: "teste",
      id: 5
    }, {
      image: food,
      title: "teste",
      price: 41,
      description: "teste",
      id: 6
    },
  ];

  const CustomArrow = ({ onClick, direction }) => (
    <div>
      {direction === "prev" && isDesktop && (
        <Prev onClick={onClick}>
          <IoIosArrowBack />
        </Prev>
      )}
      {direction === "next" && isDesktop && (
        <Next onClick={onClick}>
          <IoIosArrowForward />
        </Next>
      )}
    </div>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    initialSlide: initialSlide,

    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
  };
  const [foodP, setFoodP] = useState([]);
  const [foodS, setFoodS] = useState([]);
  const [drink, setDrink] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [bolleanFavorites, setBolleanFavorites] = useState([]);
  const [menu, setMenu] = useState(false);
  const [requestFoods, setRequestFoods] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [modal, setModal] = useState(false);

  const [search, setSearch] = useState("");

  async function handleAddRequest(id, quantity) {
    try {
      await api.post("/request", { food_id: id, quantity });
      setRequestCount((prevCount) => prevCount + 1);
      alert("Pedido enviado para sacola");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("erro");
      }
    }
  }
  async function handleRemoveOneRequest(id) {
    try {
      await api.delete(`/request/${id}`);
      setRequestCount((prevCount) => prevCount + 1);
      alert("Pedido removido com sucesso");
      setModal(false);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("erro");
      }
    }
  }
  async function handleDeleteRequest() {
    try {
      await api.delete("request");
      setRequestCount((prevCount) => prevCount + 1);
      alert("Compra realizada com sucesso");
      setModal(false);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("erro");
      }
    }
  }

  function handleInputChange(input) {
    setSearch(input);
  }
  async function handleAddFavorite(id) {
    try {
      await api.post(`favorite/${id}`);
      setFavoriteCount((prevCount) => prevCount + 1);
      setBolleanFavorites((prevFavorites) => {
        return {
          ...prevFavorites,
          [id]: true,
        };
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("erro");
      }
    }
  }
  async function handleDeleteFavorite(id) {
    try {
      await api.delete(`favorite/${id}`);
      setBolleanFavorites((prevFavorites) => {
        return {
          ...prevFavorites,
          [id]: false,
        };
      });
      setFavoriteCount((prevCount) => prevCount + 1);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("erro");
      }
    }
  }

  

  return (
    <Container>
      <Header
        handleInputChange={handleInputChange}
        handleOpenMenu={() => {
          setSearch("");
          setMenu(true);
        }}
        handleCloseMenu={() => {
          setSearch("");

          setMenu(false);
        }}
        quantity={requestFoods ? requestFoods.length : 0}
        handleOpenModal={() => {
          setModal(true);
        }}
      />

      {(!menu || isDesktop) && (
        <Content>
          <Flavor>
            {isDesktop ? (
              <img src={flavor2} alt="" />
            ) : (
              <img src={flavor} alt="" />
            )}

            <div>
              <h2>Sabores inigualáveis</h2>
              <p>Seu sabor favorito, a um clique de distância.</p>
            </div>
          </Flavor>
          {favorite.length > 0 && (
            <Foods>
              <h3>Favoritos</h3>
              <Slider {...settings}>
                {favorite &&
                  favorite.map((card, index) => (
                    <div key={index}>
                      <CardFood
                        image={card.image}
                        title={card.title}
                        price={card.price}
                        description={card.description}
                        id={card.id}
                        favorite={true}
                        
                      />
                    </div>
                  ))}
              </Slider>
            </Foods>
          )}
          <Foods>
            <h3>Refeições</h3>
            <Slider {...settings}>
              {cards &&
                cards.map((card, index) => (
                  <div key={index}>
                    <CardFood
                      image={card.image}
                      title={card.title}
                      price={card.price}
                      description={card.description}
                      id={card.id}
                      user={user}
                    />
                  </div>
                ))}
            </Slider>
          </Foods>
          <Foods>
            <h3>Sobremesas</h3>
            <Slider {...settings}>
              {foodS &&
                foodS.map((card, index) => (
                  <div key={index}>
                    <CardFood
                      image={`${api.defaults.baseURL}/files/${card.avatar}`}
                      title={card.title}
                      price={card.price}
                      description={card.description}
                      id={card.id}
                      favorite={
                        Object.keys(bolleanFavorites).length > 0
                          ? bolleanFavorites[card.id]
                          : card.favorite
                      }
                      handleAddFavorite={handleAddFavorite}
                      handleDeleteFavorite={handleDeleteFavorite}
                      handleAddRequest={handleAddRequest}
                    />
                  </div>
                ))}
            </Slider>
          </Foods>
          <Foods>
            <h3>Bebidas</h3>
            <Slider {...settings}>
              {drink &&
                drink.map((card, index) => (
                  <div key={index}>
                    <CardFood
                      image={`${api.defaults.baseURL}/files/${card.avatar}`}
                      title={card.title}
                      price={card.price}
                      description={card.description}
                      id={card.id}
                      favorite={
                        Object.keys(bolleanFavorites).length > 0
                          ? bolleanFavorites[card.id]
                          : card.favorite
                      }
                      handleAddFavorite={handleAddFavorite}
                      handleDeleteFavorite={handleDeleteFavorite}
                      handleAddRequest={handleAddRequest}
                    />
                  </div>
                ))}
            </Slider>
          </Foods>

          {modal && (
            <Modal>
              <div>
                <a
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  <IoIosArrowBack />
                  Voltar as compras
                </a>
                <table>
                  <thead>
                    <tr>
                      <th>Quantidade</th>
                      <th>Prato</th>
                      <th>V. Unidade</th>
                      <th>V. Item</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestFoods.map((request, index) => (
                      <tr key={index}>
                        <td>
                          <span>
                            <button
                              onClick={() => {
                                handleRemoveOneRequest(request.id);
                              }}
                            >
                              <AiOutlineClose />
                            </button>
                            {request.quantity}
                          </span>
                        </td>
                        <td>{request.title}</td>
                        <td>{request.price}</td>
                        <td>
                          {(
                            (request.price + "").replace(",", ".") *
                            request.quantity
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td></td>
                      <td>Total</td>
                      <td>R$</td>
                      <td>
                        {requestFoods
                          .reduce(
                            (total, request) =>
                              total +
                              (request.price + "").replace(",", ".") *
                                request.quantity,
                            0
                          )
                          .toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Button
                  title={"Concluir a compra"}
                  onClick={() => {
                    handleDeleteRequest();
                  }}
                />
              </div>
            </Modal>
          )}
        </Content>
      )}
      {menu && !isDesktop && (
        <Content>
          <Menu>
            <Search
              icon={BsSearch}
              placeholder={"Busque por pratos ou ingredientes"}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            {search.length > 0 && (
              <>
                {foodP.length > 0 && (
                  <Foods>
                    <h3>Refeições</h3>
                    <Slider {...settings}>
                      {foodP &&
                        foodP.map((card, index) => (
                          <div key={index}>
                            <CardFood
                              image={`${api.defaults.baseURL}/files/${card.avatar}`}
                              title={card.title}
                              price={card.price}
                              description={card.description}
                              id={card.id}
                              favorite={
                                Object.keys(bolleanFavorites).length > 0
                                  ? bolleanFavorites[card.id]
                                  : card.favorite
                              }
                              handleAddFavorite={handleAddFavorite}
                              handleDeleteFavorite={handleDeleteFavorite}
                              handleAddRequest={handleAddRequest}
                            />
                          </div>
                        ))}
                    </Slider>
                  </Foods>
                )}
                {foodS.length > 0 && (
                  <Foods>
                    <h3>Sobremesas</h3>
                    <Slider {...settings}>
                      {foodS &&
                        foodS.map((card, index) => (
                          <div key={index}>
                            <CardFood
                              image={`${api.defaults.baseURL}/files/${card.avatar}`}
                              title={card.title}
                              price={card.price}
                              description={card.description}
                              id={card.id}
                              favorite={
                                Object.keys(bolleanFavorites).length > 0
                                  ? bolleanFavorites[card.id]
                                  : card.favorite
                              }
                              handleAddFavorite={handleAddFavorite}
                              handleDeleteFavorite={handleDeleteFavorite}
                              handleAddRequest={handleAddRequest}
                            />
                          </div>
                        ))}
                    </Slider>
                  </Foods>
                )}
                {drink.length > 0 && (
                  <Foods>
                    <h3>Bebidas</h3>
                    <Slider {...settings}>
                      {drink &&
                        drink.map((card, index) => (
                          <div key={index}>
                            <CardFood
                              image={`${api.defaults.baseURL}/files/${card.avatar}`}
                              title={card.title}
                              price={card.price}
                              description={card.description}
                              id={card.id}
                              favorite={
                                Object.keys(bolleanFavorites).length > 0
                                  ? bolleanFavorites[card.id]
                                  : card.favorite
                              }
                              handleAddFavorite={handleAddFavorite}
                              handleDeleteFavorite={handleDeleteFavorite}
                              handleAddRequest={handleAddRequest}
                            />
                          </div>
                        ))}
                    </Slider>
                  </Foods>
                )}
              </>
            )}
            <div>
              {user.role == "admin" && (
                <span>
                  <p
                    onClick={() => {
                      navigate("/create");
                    }}
                  >
                    Novo Prato
                  </p>
                </span>
              )}
              <span>
                <p
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sair
                </p>
              </span>
            </div>
          </Menu>
        </Content>
      )}

    </Container>
  );
}
