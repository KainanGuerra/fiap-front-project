"use client";

import Button from "@/components/Button/Button"; // importe seu Button
import styles from "./page.module.css";

type Props = {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ totalPosts, postsPerPage, currentPage, onPageChange }: Props) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  if (totalPages <= 1) return null;

  const getPagesToShow = () => {
    if (totalPages <= 3) {
      // Se tiver poucas páginas, mostra todas
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage === 1) {
      return [1, 2, 3];
    } else if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  const pagesToShow = getPagesToShow();

  return (
    <div className={styles.pagination}>
      {/* seta esquerda */}
      {currentPage > 1 && (
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          variant="secondary"
        >
          ←
        </Button>
      )}

      {/* botoes numericos */}
      {pagesToShow.map((num) => (
        <Button
          key={num}
          onClick={() => onPageChange(num)}
          variant={num === currentPage ? "cta" : "primary"}
        >
          {num}
        </Button>
      ))}

      {/* seta direita */}
      {currentPage < totalPages && (
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          variant="secondary"
        >
          →
        </Button>
      )}
    </div>
  );
}
