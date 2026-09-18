import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("dreamestate_favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

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