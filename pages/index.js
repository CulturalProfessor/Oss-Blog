import Head from 'next/head';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import { getAllPosts } from '../lib/test-data';
import { client } from '../lib/apollo';
import { gql } from '@apollo/client'; 

export default function Home({ posts }) {
  return (
    <div className="container">
       <nav>
      <label class="logo">OSS Blog</label>
        <ul>
          <li>
            <a class="active" href="default.asp">Home</a>
            <a href="default.asp">Blogs</a>
            <a href="default.asp">About Us</a>
            <a href="default.asp">Contact Us</a>
          </li>
        </ul>
        </nav>
        <Head>
        <title>OSS Blog</title>
      </Head>

      <main>
    
        <h1 className="title">
          Emerging Technology
        </h1>

        <p className="description">
          Learn about TECH 
        </p>

        <div className="grid">
          {
            posts.map((post) => {
              return (
                <PostCard key={post.uri} post={post}></PostCard>
              )
            })
          }
        </div>
      </main>

      <Footer></Footer>
    </div>
  )
}

export async function getStaticProps(){

  const GET_POSTS=gql`
  query GetAllPosts {
    posts {
      nodes {
        content
        date
        title
        uri
      }
    }
  }
  `

  const response=await client.query({
    query: GET_POSTS
  })
  const posts = response?.data?.posts?.nodes
  return {
    props: {
      posts
    }
  }
}
