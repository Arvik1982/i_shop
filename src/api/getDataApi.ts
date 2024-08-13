export default async function getDataApi(host: string) {
  try {
    const response = await fetch(`${host}`);

    if (!response.ok) {
      throw new Error(`Network response error:${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
