import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://marvel-server-zeta.vercel.app/'; // https://gateway.marvel.com:443/v1/public/
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df'; // 4b10bd5d804119f468956ddef4e17190
    const _baseOffset = 0; //210
    

    const getAllCharacters = async (offset = _baseOffset, limit = 6) => {
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }
    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        console.log(res);
		return _transformComics(res.data.results[0]);
	};


    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description || "There is no information about this character",
            thumbnail: char.thumbnail.path.includes('https') ? char.thumbnail.path + '.' + char.thumbnail.extension : char.thumbnail.path.replace('http', 'https')  + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.length > 0 ? char.comics.items.slice(0, 10) : "There is no comics with this character"
        }
    }
    const _transformComics = (comics) => {
        return {
            id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path.includes('https') ? comics.thumbnail.path + '.' + comics.thumbnail.extension : comics.thumbnail.path.replace('http', 'https') + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			// optional chaining operator
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
        }
    }

    return { 
            clearError,
            process,
            setProcess,
            getAllCharacters, 
            getCharacter,
            getCharacterByName,
            getAllComics,
		    getComics
        }
}


export default useMarvelService;