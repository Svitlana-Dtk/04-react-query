// Під час натискання на зображення галереї повинно відкриватися модальне вікно,
//  яке відображатиме додаткову інформацію про фільм у великому форматі.
// Створіть для цього компонент MovieModal. Він має використовуватись в компоненті App
// та отримувати два пропси:
//     movie - посилання на об’єкт обраного фільма;
//     onClose - функцію закриття модального вікна.

import { createPortal } from 'react-dom';
import css from './MovieModal.module.css';
import { useEffect } from 'react';
import type { Movie } from '../../types/movie';

interface MovieModalProps {
  onClose: () => void;
  movie: Movie;
}
export default function MovieModal({ onClose, movie }: MovieModalProps) {
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleModalClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
