"use client"

import React from 'react';
import MixtapeCard from '@/components/MixtapeCard';
import type { Mixtape } from '@/components/MixtapeCard';

// Example component showing multiple mixtapes
const MixtapeGallery: React.FC = () => {
  const mixtapes: Mixtape[] = [
    {
      name: "Summer Vibes 2024",
      imageUrl: "/static/images/avatar.png",
      shortenedLink: "https://spotify.com/playlist/1"
    },
    {
      name: "Chill Hip Hop Mix",
      imageUrl: "/static/images/spa.jpg",
      shortenedLink: "https://spotify.com/playlist/2"
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mixtapes.map((mixtape, index) => (
          <MixtapeCard key={index} mixtape={mixtape} />
        ))}
      </div>
    </div>
  );
};

export default MixtapeGallery;
