import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';

const AnimeList = () => {
    const [animeList, setAnimeList] = useState([]);
    const [topAnime, setTopAnime] = useState([]);
    const [newAnime, setNewAnime] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTopAnime();
        fetchNewAnime();
    }, []);

    const fetchTopAnime = () => {
        axios.get('https://api.jikan.moe/v4/top/anime')
            .then(response => {
                setTopAnime(response.data.data.slice(0, 5));
            })
            .catch(error => {
                setError('There was an error fetching the top anime list!');
                console.error(error);
            });
    };

    const fetchNewAnime = () => {
        axios.get('https://api.jikan.moe/v4/seasons/now')
            .then(response => {
                setNewAnime(response.data.data.slice(0, 5));
            })
            .catch(error => {
                setError('There was an error fetching the new anime list!');
                console.error(error);
            });
    };

    const handleSearch = (query) => {
        axios.get(`https://api.jikan.moe/v4/anime?q=${query}`)
            .then(response => {
                setAnimeList(response.data.data);
            })
            .catch(error => {
                setError('There was an error searching for anime!');
                console.error(error);
            });
    };

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container">
            <div className="header">
                <h1 className="text-4xl font-bold">Anime List</h1>
                <SearchBar onSearch={handleSearch} />
            </div>

            <h2 className="title">Top Anime</h2>
            <ul className="anime-list">
                {topAnime.map(anime => (
                    <li key={anime.mal_id} className="anime-item">
                        <a href={anime.url} target="_blank" rel="noopener noreferrer">
                            <img src={anime.images.jpg.image_url} alt={anime.title} />
                            <div className="p-4">
                                <h2 className="anime-item-title">{anime.title}</h2>
                                <p className="anime-item-episodes">Episodes: {anime.episodes ?? 'N/A'}</p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>

            <h2 className="title">New Anime</h2>
            <ul className="anime-list">
                {newAnime.map(anime => (
                    <li key={anime.mal_id} className="anime-item">
                        <a href={anime.url} target="_blank" rel="noopener noreferrer">
                            <img src={anime.images.jpg.image_url} alt={anime.title} />
                            <div className="p-4">
                                <h2 className="anime-item-title">{anime.title}</h2>
                                <p className="anime-item-episodes">Episodes: {anime.episodes ?? 'N/A'}</p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>

            <h2 className="title">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {animeList.map(anime => (
                    <div key={anime.mal_id} className="anime-item">
                        <a href={anime.url} target="_blank" rel="noopener noreferrer">
                            <img src={anime.images.jpg.image_url} alt={anime.title} />
                            <div className="p-4">
                                <h2 className="anime-item-title">{anime.title}</h2>
                                <p className="anime-item-episodes">Episodes: {anime.episodes ?? 'N/A'}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimeList;
