  export async function fetchAllRegions() {
    const response = await fetch('/api/region/autocomplete');
    if (!response.ok) {
      throw new Error('Failed to fetch regions');
    }
    const data = await response.json();
    return data.data;
  }