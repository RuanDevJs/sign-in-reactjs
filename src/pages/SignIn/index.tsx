import { FormEvent, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Lottie from "react-lottie";
import Button from "../../components/Button";

import { toast } from "react-toastify";
import { AuthContext } from "../../context/Auth";

import DiscordIcon from "../../assets/discord-icon.json";
import "./styles.css";

export function SignIn() {
  const { signInUserWithEmailAndPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const signInPayload = {
      email: e.currentTarget.email.value as string,
      password: e.currentTarget.password.value as string,
    };

    if (!signInPayload.email.length || !signInPayload.password.length) {
      return toast.warn("Preencha o formulário corretamente", {
        pauseOnHover: false,
        theme: "light",
      });
    }

    try {
      await signInUserWithEmailAndPassword(
        signInPayload.email,
        signInPayload.password
      );

      return navigate("/home");
    } catch (error) {
      toast.error(error.message, {
        pauseOnHover: false,
        theme: "light",
      });
    }
  }

  return (
    <section className="sign-in">
      <div className="modal">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <h1>Bem vindo de volta</h1>
            <p>
              Se você já tem cadastro em nossa loja basta fazer login abaixo!
            </p>
          </div>
          <div className="form-footer">
            <div className="form-row">
              <label htmlFor="email">E-mail</label>
              <input type="text" placeholder="E-mail" id="email" />
            </div>
            <div className="form-row">
              <label htmlFor="password">Senha</label>
              <input type="password" placeholder="Senha" id="password" />
            </div>
            <Button title="Acessar minha conta" color="success" />
          </div>
          <span className="link">
            Ainda não possui uma conta ?{" "}
            <NavLink to="/sign-up">Registrar</NavLink>
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
