import React from 'react'
import './blogsUpSection.scss'
import { Link } from "react-router-dom";


function BlogsUpSection() {
  return (
    <section id='blogsUpSection'>
      <h3>Blogs</h3>
      <div>
        <Link to={"/"} style={{ color: 'white', textDecoration: "none" }}>
          <p>Home</p>
        </Link>
        <span style={{ color: "black", fontSize: '40px' }}>/</span>
        <span>Blogs</span>
      </div>
    </section>
  )
}

export default BlogsUpSection