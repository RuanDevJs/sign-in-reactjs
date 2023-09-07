import Lottie from "react-lottie";
import Animation from "../../assets/animation-discord-1.json";
import AnimationBoost from "../../assets/4z5993dum6.json";

import "./styles.css";

interface Props {
  title?: string;
  subtitle?: string;
  type?: "animation-1" | "animation-2";
}

const DEFAULT_PROPS = {
  title: `Carregando...`,
  subtitle: `Estamos acelerando os motores para lhe entregar algo incrível. Aguarde
  conosco!`,
};

export default function Loading({
  title = DEFAULT_PROPS.title,
  subtitle = DEFAULT_PROPS.subtitle,
  type = "animation-1",
}: Props) {
  return (
    <div className="loading">
      <Lottie
        options={{
          animationData: type === "animation-1" ? Animation : AnimationBoost,
          autoplay: true,
          loop: true,
        }}
        title={title}
        width={320}
        height={320}
        isClickToPauseDisabled={false}
      />
      <div className="info">
        <h1 className="title">{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
