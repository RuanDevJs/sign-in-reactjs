import { FormEvent, useContext } from "react";
import { NavLink } from "react-router-dom";
import Lottie from "react-lottie";

import DiscordIcon from "../../assets/discord-icon.json";
import "./styles.css";
import Button from "../../components/Button";
import { AuthContext } from "../../context/Auth";
import { toast } from "react-toastify";

export function SignUp() {
  const { signUpUserWithEmailAndPassword } = useContext(AuthContext);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const signUpPayload = {
      email: e.currentTarget["email"].value,
      phone: e.currentTarget.phonenumber.value,
      password: e.currentTarget.password.value,
    };

    if (!signUpPayload.email.length || !signUpPayload.password.length) {
      return toast.warn("Preencha o formulário corretamente", {
        pauseOnHover: false,
        theme: "light",
      });
    }

    try {
      await signUpUserWithEmailAndPassword(
        signUpPayload.email,
        signUpPayload.password,
        signUpPayload.phone
      );
    } catch (error) {
      toast.error(error.message, {
        pauseOnHover: false,
        theme: "light",
      });
    }
  }

  return (
    <section className="sign-up">
      <div className="modal">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <h1>Criar uma conta</h1>
            <p>
              Se você não possui cadastro em nossa loja basta preencher o
              formulário abaixo!
            </p>
          </div>
          <div className="form-footer">
            <div className="form-row">
              <label htmlFor="email">E-mail</label>
              <input type="text" placeholder="E-mail" id="email" />
            </div>
            <div className="form-row">
              <label htmlFor="phonenumber">Telefone</label>
              <input type="text" placeholder="Telefone" id="phonenumber" />
            </div>
            <div className="form-row">
              <label htmlFor="password">Senha</label>
              <input type="password" placeholder="Senha" id="password" />
            </div>
            <Button color="success" title="Acessar minha conta" />
          </div>
          <span className="link">
            Já possui uma conta ? <NavLink to="/sign-in">Entrar</NavLink>
          </span>
        </form>
        <div className="lottie">
          <Lottie
            options={{
              animationData: DiscordIcon,
              autoplay: true,
              loop: false,
            }}
            width={320}
            height={320}
            isClickToPauseDisabled={false}
          />
        </div>
      </div>
    </section>
  );
}
