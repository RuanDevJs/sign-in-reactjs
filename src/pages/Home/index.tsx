import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";

import Loading from "../../components/Lodaing";
import Button from "../../components/Button";

import Avatar from "../../assets/avatar.png";
import styles from "./styles.module.css";

export function Home() {
  const [show, setShow] = useState(false);
  const { authUser, signOut } = useContext(AuthContext);
  return (
    <>
      <section
        className={styles.home}
        style={{ display: !show ? "none" : "flex" }}
      >
        <div className={styles.preview}>
          <div className={styles.avatar}>
            <img
              src={authUser.picture || Avatar}
              alt="Foto de avatar"
              title="Foto de avatar"
              draggable={false}
              onLoad={() => setShow(true)}
            />
          </div>
          <div className={styles.nickname}>
            <h2>{authUser.displayName}</h2>
            <span>
              <p>Online</p>
            </span>
          </div>
        </div>
        <div className={styles.data}>
          <div>
            <h2>Meus Dados </h2>
            <ul className={styles["data-list"]}>
              <li>
                Apelido: <p>{authUser.displayName}</p>
              </li>
              <li>
                E-mail: <p>{authUser.email}</p>
              </li>
              <li>
                Telefone: <p>{authUser.phone}</p>
              </li>
            </ul>
          </div>

          <Button color="remove" title="Sair" onClick={signOut} />
        </div>
      </section>
      {!show && (
        <Loading
          title="Carregando..."
          subtitle="A expectativa só aumenta o sabor da recompensa. Obrigado por esperar!"
          type="animation-2"
        />
      )}
    </>
  );
}
