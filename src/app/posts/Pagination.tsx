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

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      {pageNumbers.map((num) => (
        <Button
          key={num}
          onClick={() => {
            onPageChange(num)
          }}
          variant={num === currentPage ? "cta" : "primary"} // destaque para página atual
        >
          {num}
        </Button>
      ))}
    </div>
  );
}
