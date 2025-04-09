

// makes http request to azure function, retrieves response
export async function fetchData<T>(filename: string): Promise<T> {
    const url = `https://tdam-dashboard-function.azurewebsites.net/api/getDashboardData?filename=${filename}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error fetching data from function. Status: ${response.status}`);
        }

        // Log the raw response body to inspect it
        const rawResponse = await response.text();

        // Attempt to parse the response as JSON
        try {
            const data: T = JSON.parse(rawResponse);
            return data;
        } catch (jsonError) {
            throw new Error('Failed to parse response as JSON: ' + jsonError);
        }
        
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}