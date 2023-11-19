import axios from "./axios";
import { store } from "../stores/store";
import sessionInfo, { destroySession } from "../stores/sessionInfo";

function retrieveErrors(statusCode, data) {
  var isError = false;
  var messageError = null;

  console.log(statusCode);
  switch (statusCode) {
    case 200:
      //request ok
      break;
    case 201:
      //created element
      console.log("200");
      break;

    case 400:
      //Bad Request
      isError = true;
      messageError =
        "Errore della piattaforma.\nNello specifico, è stata inviata una richiesta non valida.\n\nRiprova";
      break;

    case 401:
      //Unauthorized Access
      isError = true;
      messageError = "La sessione è scaduta.\nPrego, rieffettuare il login.";
      store.dispatch(destroySession());
      break;

    case 403:
      //user not authorizated (or not found)
      isError = true;
      messageError = "Non autorizzato.\nRiprova";
      console.log("403");
      break;

    case 404:
      isError = true;
      messageError = "Elemento non trovato nel sistema.\nRiprova!";
      break;

    case 409:
      isError = true;
      messageError =
        "L'utente indicato risulta già iscritto al portale.\nRiprova!";
      break;

    case 418:
      isError = true;
      messageError =
        "La quantità richiesta non è più disponibile. Ci scusiamo per il disagio";
      break;

    case 426:
      isError = true;
      messageError = "L'account è stato disabilitato.\nContattare il supporto";
      break;

    case 500:
      isError = true;
      messageError = "Errore del Server.\nRiprova!";
      break;

    case 503:
      isError = true;
      messageError =
        "Il server non è al momento raggiungibile. Controlla la rete e riprova tra qualche minuto!";
      break;

    default:
      isError = true;
      messageError =
        "Errore sconosciuto.\nContattare l'assistenza e fornire il seguente codice.\n" +
        statusCode;
      break;
  }

  return {
    isError: isError,
    messageError: messageError,
    status: statusCode,
    data: data,
  };
}

//replace with all funcitons/apis
const postLogin = async (username, password) => {
  try {
    //usually don't do that! Is very unsecure, but for now is ok
    //TODO: change with btoa!
    const response = await axios.post("/login", {
      username: username,
      password: password,
    });
    return retrieveErrors(response.status, response.data);
  } catch (error) {
    console.log({ error });
    if (error.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(error.response.status, error.response.data.result);
    }
  }
};

const getProvince = async () => {
  try {
    const access = store.getState(sessionInfo).sessionInfo.sessionToken;

    const response = await axios.get("/province/getall", {
      headers: {
        Authorization: "Bearer " + access,
      },
    });
    return retrieveErrors(response.status, response.data);
  } catch (error) {
    console.log({ error });
    if (error.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(error.response.status, error.response.data.result);
    }
  }
};

const getMarkets = async () => {
  try {
    const access = store.getState(sessionInfo).sessionInfo.sessionToken;

    const response = await axios.get("/markets/getall", {
      headers: {
        Authorization: "Bearer " + access,
      },
    });
    return retrieveErrors(response.status, response.data);
  } catch (error) {
    console.log({ error });
    if (error.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(error.response.status, error.response.data.result);
    }
  }
};

const getProducts = async () => {
  try {
    const access = store.getState(sessionInfo).sessionInfo.sessionToken;

    const response = await axios.get("/products/getall", {
      headers: {
        Authorization: "Bearer " + access,
      },
    });
    return retrieveErrors(response.status, response.data);
  } catch (error) {
    console.log({ error });
    if (error.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(error.response.status, error.response.data.result);
    }
  }
};

export { postLogin, getProvince, getMarkets, getProducts };
