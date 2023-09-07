import { ChangeEvent, useContext, useState } from "react";
import Resizer from "react-image-file-resizer";

import { database, storage } from "../../services/firebase";
import { AuthContext } from "../../context/Auth";

import Button from "../../components/Button";
import { FileImage } from "phosphor-react";

import Avatar from "../../assets/avatar.png";

import "./styles.css";
import { useNavigate } from "react-router-dom";

export function Finish() {
  const { authUser, updateUserById } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string>("");

  const [picture, setPicture] = useState<string>("");
  const navigate = useNavigate();

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });

  async function onChangePicture(event: ChangeEvent<HTMLInputElement>) {
    if (event && event.target.files) {
      event.preventDefault();

      const imageAsUrl = URL.createObjectURL(event.target.files[0]);
      setPreviewImage(imageAsUrl);

      const pickedImage = event.target.files[0];

      try {
        const image = await resizeFile(pickedImage);
        const path = await (
          await storage.ref(`/${authUser?._id}`).put(image as Blob)
        ).ref.getDownloadURL();
        setPicture(path);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (picture.length && displayName && authUser) {
      updateUserById(authUser._id, displayName, picture);

      navigate("/");
    }
  }

  return (
    <section className="finish">
      <div className="preview">
        <div className="avatar">
          <label htmlFor="file" title="Alterar foto utilizada no perfil">
            <img
              src={previewImage}
              alt="Foto de avatar"
              title="Escolha sua foto de avatar"
              draggable={false}
            />
          </label>
          <input type="file" id="file" onChange={onChangePicture} />
          <div className="change-img-icon">
            <label htmlFor="file" title="Alterar foto utilizada no perfil">
              <FileImage size={24} color="#1fb98b" />
            </label>
          </div>
        </div>
        <div className="nickname">
          <h2>{displayName || "Escolha um apelido"}</h2>
          <span>
            <p>Online</p>
          </span>
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nickname">
            Escolha um nickname de sua preferência
          </label>
          <input
            type="text"
            placeholder="Escolha um apelido"
            id="nickname"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            maxLength={15}
          />
        </div>

        <Button title="Concluir" color="success" />
      </form>
    </section>
  );
}
