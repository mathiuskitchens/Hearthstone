import axios from "axios";
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const tokenUrl = "https://oauth.battle.net/token";
const data = {
  grant_type: "client_credentials",
};

const config = {
  auth: {
    username: clientId,
    password: clientSecret,
  },
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export async function getNewToken() {
  try {
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams(data).toString(),
      config
    );
    console.log(response);
    return response.data.access_token;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

export async function getAllCards(token, page) {
  try {
    const response = await axios({
      method: "get",
      url: `https://us.api.blizzard.com/hearthstone/cards/?locale=en_US&set=standard&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (error.resposne && error.response.status === 401) {
      console.log("Unauthorized, refreshing token...");
      const newToken = getNewToken();
      localStorage.setItem("token", newToken);
      console.log("New token: ", newToken);
      await getAllCards(newToken);
    }
  }
}
