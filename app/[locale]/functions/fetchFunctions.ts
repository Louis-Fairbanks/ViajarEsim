  export async function fetchAllRegions(locale :string) {

    const endpoint = locale === 'es' ? '/api/region/autocomplete' : `/api/region/${locale}/autocomplete`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Failed to fetch regions');
    }
    const data = await response.json();
    return data.data;
  }