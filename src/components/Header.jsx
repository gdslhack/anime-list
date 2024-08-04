import React from 'react';

const Header = () => {
    return (
        <header className="bg-blue-600 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold">Anime List</h1>
                {/* You can add more elements here if needed */}
            </div>
        </header>
    );
};

export default Header;
