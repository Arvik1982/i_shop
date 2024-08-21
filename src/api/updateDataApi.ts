export default async function updateDataApi(host: string, token:string|null, updateData) {

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
  
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  
    try {
      const response = await fetch(`${host}`, {
        method: "PUT", 
        headers: headers,
        body: JSON.stringify(updateData)
      });
  
      if (!response.ok) {
        throw new Error(`Network response error:${response.status}`);
      }
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }