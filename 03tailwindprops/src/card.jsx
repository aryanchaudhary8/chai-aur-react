import React from 'react';

function Card({ username }) {
  return (
    <div className="max-w-sm mx-auto p-4">
      <div className="relative">
        {/* Image */}
        <img
          className="w-full h-64 object-cover rounded-3xl shadow-xl"
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
          alt="girl"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 bg-black/40 rounded-3xl flex flex-col justify-end p-4">
          <h1 className="text-white text-2xl font-bold">{username}</h1>
          <p className="text-sky-300 text-sm">Class Warfare – The Anti-Patterns</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
