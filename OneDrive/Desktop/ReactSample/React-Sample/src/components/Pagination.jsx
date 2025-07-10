import React, { useEffect, useState } from "react";
import axios from "axios";

function PaginationExample() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // page state
  const limit = 3; // how many per page
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts?_page=${page}&_limit=${limit}`)
      .then((res) => {
        setPosts(res.data);
        const totalCount = res.headers["x-total-count"];
        setTotalPages(Math.ceil(totalCount / limit));
      })
      .catch((err) => console.log("Error fetching posts", err));
  }, [page]);

  return (
    <div>
      <h2>📄 Paginated Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          ⬅️ Previous
        </button>

        <span style={{ margin: "0 10px" }}> Page {page} of {totalPages} </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}

export default PaginationExample;