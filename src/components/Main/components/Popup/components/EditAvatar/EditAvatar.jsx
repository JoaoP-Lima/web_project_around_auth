import { useState, useContext, useRef } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const userContext = useContext(CurrentUserContext);
  const avatarRef = useRef();
  const { currentUser, handleUpdateAvatar } = userContext;
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleAvatarChange = (event) => {
    
    if(event.target.validity.valid) {
      setError(false);
      setErrorMessage("");
      setIsValid(true);


    }else{
      setError(true);
      setErrorMessage(event.target.validationMessage)
      setIsValid(false);

    }
    setAvatar(event.target.value);
  };

   const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true)
   handleUpdateAvatar({
    avatar: avatarRef.current.value
   }).finally(() => {
    setIsLoading(false);
   })
  };
  return (
    <form className="popup__form" name="updateAvatarForm" onSubmit={handleSubmit}>
      <input
        type="url"
        className={`popup__input popup__input_type-link ${error ? " popup__input_type_error" : ""}`}
        name="avatar"
        placeholder="Link de Imagem de Perfil"
        required
        id="avatar-input"
        onChange={handleAvatarChange}
        ref={avatarRef}
  
      />
      <span className={`${error ? "popup__input-error_active " : ""}`}>{errorMessage}</span>
      <button type="submit" className="popup__button button" disabled={!isValid}>
        {isLoading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
