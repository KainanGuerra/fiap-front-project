"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import { Post } from "./types";
import styles from "./page.module.css";

type Props = {
  initialPosts: Post[];
};

export default function PostsPage({ initialPosts }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <ul className={styles.list}>
        {currentPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>

      <Pagination
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
