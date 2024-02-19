import { Container, Logo, Form } from "./style";
import { BsHexagonFill } from "react-icons/bs";
import { Input } from "../../components/Input/Index";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import PrimaryImage from "../../assets/PrimaryImage.png";
import { useNavigate } from "react-router-dom";

export function SingIn() {
  
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const navigate = useNavigate("");
  function navigateHome(){
    navigate("/home")
  }

  return (
    <Container>
      <Logo>
       <img src={PrimaryImage} alt="" />
      </Logo>

      <Form>
        <h2>Faça login</h2>
        <Input
          title={"Email"}
          id={"email"}
          placeholder={"Exemplo: exemplo@exemplo.com.br"}
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          title={"Senha"}
          id={"senha"}
          placeholder={"No mínimo 6 caracteres"}
          type={"password"}
          onChange={(e) => setPassoword(e.target.value)}
        />

        <Button type="button" onClick={navigateHome} title={"entrar"} />
        <Link to={"/register"}>Criar uma conta</Link>
      </Form>
    </Container>
  );
}
