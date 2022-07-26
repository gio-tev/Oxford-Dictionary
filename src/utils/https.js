import { API_KEY, APP_ID } from '@env';

export const searchWords = async word => {
  try {
    const response = await fetch(
      `https://od-api.oxforddictionaries.com/api/v2/search/thesaurus/en-gb?q=${word}&prefix=true&limit=20`,
      {
        headers: {
          Accept: 'application/json',
          app_id: APP_ID,
          app_key: API_KEY,
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAudio = async word => {
  try {
    const response = await fetch(
      `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}?fields=pronunciations&strictMatch=false`,
      {
        headers: {
          Accept: 'application/json',
          app_id: APP_ID,
          app_key: API_KEY,
        },
      }
    );

    const data = await response.json();

    if (
      !data.error &&
      data?.results[0]?.lexicalEntries[0]?.entries &&
      data?.results[0]?.lexicalEntries[0]?.entries[0]?.pronunciations
    )
      return data.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile;
    else return undefined;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getWordDetails = async word => {
  try {
    const response = await fetch(
      // `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}?fields=pronunciations,definitions,examples,etymologies&strictMatch=false`,
      `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}?strictMatch=false`,
      {
        headers: {
          Accept: 'application/json',
          app_id: APP_ID,
          app_key: API_KEY,
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};
