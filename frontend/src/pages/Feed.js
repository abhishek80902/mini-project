import { Container, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import API from "../services/api";
import InfiniteScroll from "react-infinite-scroll-component";
import toast, { Toaster } from "react-hot-toast";

import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (reset = false) => {
    try {
      const currentPage = reset ? 1 : page;

      const res = await API.get(`/posts?page=${currentPage}`);

      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        if (reset) {
          setPosts(res.data);
          setPage(1);
        } else {
          setPosts((prev) => [...prev, ...res.data]);
        }
      }
    } catch {
      toast.error("Failed to load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <>
      <Toaster />

      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <CreatePost refresh={() => fetchPosts(true)} />

        <InfiniteScroll
          dataLength={posts.length}
          next={() => setPage((p) => p + 1)}
          hasMore={hasMore}
          loader={<CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />}
        >
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              refresh={() => fetchPosts(true)}
            />
          ))}
        </InfiniteScroll>
      </Container>
    </>
  );
}