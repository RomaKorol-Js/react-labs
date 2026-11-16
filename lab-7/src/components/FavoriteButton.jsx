import { useLocalStorage } from '../hooks/useLocalStorage'
export default function FavoriteButton({ productId, name }) {
  const key = `favorite:${productId}`
  const [isFavorite, setIsFavorite] = useLocalStorage(key, false)

  return (
    <button
      type="button"
      className="favorite-button"
      aria-label={`До обраного: ${name}`}
      aria-pressed={isFavorite}
      onClick={() => setIsFavorite(!isFavorite)}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  )
}
