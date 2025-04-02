// fetches JSON from blob store
export async function fetchData<T>(
    filename: string,
): Promise<T> { 
    console.log(filename)
    //const baseURL = 'https://tdambishare.blob.core.windows.net/testshare/' 
    const access = `https://tdambishare.blob.core.windows.net/dashboard/${filename}?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2026-01-01T23:38:34Z&st=2025-02-18T15:38:34Z&spr=https&sig=7ObjIGM82WrT0JM9nMBhlwLh7vpIrCW%2BIn9wYu5fSAc%3D`

    //const url = new URL(filename, baseURL).toString();
    const response = await fetch(access);
    if (!response.ok){
        throw new Error(`failed to fetch "${filename}": ${response.statusText}`)
    }
    return (await response.json() as T);
}