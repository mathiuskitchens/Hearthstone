import axios from 'axios';
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const tokenUrl = 'https://oauth.battle.net/token';
const data = {
  grant_type: 'client_credentials',
};

const config = {
  auth: {
    username: clientId,
    password: clientSecret,
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
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
    console.log('Error: ', error);
    throw error;
  }
}

export async function getAllCards(
  token,
  page = 1,
  expansion = 'standard',
  classType = 'all',
  rarity = 'all',
  search = ''
) {
  try {
    const response = await axios({
      method: 'get',
      url: `https://us.api.blizzard.com/hearthstone/cards/?locale=en_US&set=${expansion}&page=${page}&class=${classType}&rarity=${rarity}&textFilter=${search}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, refreshing token...');
      const newToken = await getNewToken();
      localStorage.setItem('hstoken', newToken);
      console.log('New token: ', newToken);
      const response = await getAllCards(newToken, page, expansion, classType, rarity, search);
      return response;
    }
    throw error;
  }
}


export async function getDeckByCardIds(token, cardIds, locale = 'en_US') {

  try {
    // Convert array of card IDs to comma-separated string
    const idsParam = Array.isArray(cardIds) ? cardIds.join(',') : cardIds;

    const response = await axios({
      method: 'get',
      url: `https://us.api.blizzard.com/hearthstone/cards?ids=${idsParam}&locale=${locale}&hero=813`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, refreshing token...');
      const newToken = await getNewToken();
      localStorage.setItem('hstoken', newToken);
      console.log('New token: ', newToken);
      const response = await getDeckByCardIds(newToken, cardIds, locale);
      return response;
    }
    throw error;
  }
}
