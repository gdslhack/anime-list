import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnimeList = () => {
    const [animeList, setAnimeList] = useState([]);

    useEffect(() => {
        axios.get('https://api.jikan.moe/v3/top/anime')
            .then(response => {
                setAnimeList(response.data.top);
            })
            .catch(error => {
                console.error('There was an error fetching the anime list!', error);
            });
    }, []);

    return (
        <div>
            <h1>Top Anime</h1>
            <ul>
                {animeList.map(anime => (
                    <li key={anime.mal_id}>
                        <a href={anime.url} target="_blank" rel="noopener noreferrer">
                            {anime.title} ({anime.episodes} episodes)
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnimeList;
