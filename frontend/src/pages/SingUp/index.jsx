import { Container, Logo, Form } from "./style";
import { Input } from "../../components/Input/Index";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../../Services/api";
import { useNavigate } from "react-router-dom";

import PrimaryImage from "../../assets/PrimaryImage.png";

export function SingUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSingUp() {
    try {
      if (name == "" || email == "" || password == "") {
        alert("Preencha todos os campos");
        return;
      }
      await api.post("/users", { name, email, password });
      alert("Conta criada com sucesso");
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possilvel criar a conta");
      }
    }
  }


  return (
    <Container>
      <Logo>
       <img src={PrimaryImage} alt="" />
      </Logo>

      <Form>
        <h2>Crie sua conta</h2>
        <Input
          title={"Seu nome"}
          id={"name"}
          placeholder={"Exemplo: Maria da Silva"}
          type={"text"}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          title={"email"}
          id={"email"}
          placeholder={"Exemplo: exemplo@exemplo.com.br"}
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          title={"senha"}
          id={"senha"}
          placeholder={"No mínimo 6 caracteres"}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="button"  title={"Criar conta"} onClick={handleSingUp} />
        <Link to={"/"}>Já tenho uma conta</Link>
      </Form>
    </Container>
  );
}
