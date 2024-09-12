export default async function getDataApi(host: string, token: string | null) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;

    try {
      const response = await fetch(`${host}`, { headers });

      if (!response.ok) {
        throw new Error(`Network response error:${response.status}`);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
