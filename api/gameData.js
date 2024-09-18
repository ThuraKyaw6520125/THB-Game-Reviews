// api/gameData.js

export const fetchGames = async () => {
  const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=10`;

  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};
