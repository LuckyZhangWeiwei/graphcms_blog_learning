import React from 'react'

function PostCard({ post }) {
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  )
}

export default PostCard
