import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnimeList = () => {
    const [animeList, setAnimeList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://api.jikan.moe/v4/top/anime')
            .then(response => {
                setAnimeList(response.data.data);
            })
            .catch(error => {
                setError('There was an error fetching the anime list!');
                console.error(error);
            });
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4 text-center">Top Anime</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {animeList.map(anime => (
                    <div key={anime.mal_id} className="border rounded-lg overflow-hidden shadow-lg">
                        <a href={anime.url} target="_blank" rel="noopener noreferrer">
                            <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full h-48 object-cover"/>
                            <div className="p-4">
                                <h2 className="text-xl font-bold">{anime.title}</h2>
                                <p className="text-gray-700">Episodes: {anime.episodes ?? 'N/A'}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimeList;
