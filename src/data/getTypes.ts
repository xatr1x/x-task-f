import axios from 'axios'

export const getTypes = async () => {
  try {
    const result = await axios.get('http://localhost:3030/api/types?page=1&size=10');

  console.log('rrrrrrrr:', result);
  } catch (e) {
    throw new Error((e as Error).message);
  }
}