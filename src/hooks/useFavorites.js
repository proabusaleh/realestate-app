import { useState, useEffect } from "react";

function getStoredFavorites() {
  try {
    const stored = localStorage.getItem("dreamestate_favorites");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(getStoredFavorites);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("dreamestate_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (propertyId) => {
    if (!favorites.includes(propertyId)) {
      setFavorites((prev) => [...prev, propertyId]);
    }
  };

  const removeFavorite = (propertyId) => {
    setFavorites((prev) => prev.filter((id) => id !== propertyId));
  };

  const toggleFavorite = (propertyId) => {
    if (favorites.includes(propertyId)) {
      removeFavorite(propertyId);
    } else {
      addFavorite(propertyId);
    }
  };

  const isFavorite = (propertyId) => favorites.includes(propertyId);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    count: favorites.length,
  };
}