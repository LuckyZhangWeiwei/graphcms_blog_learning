import type { NextPage } from 'next'
import Head from 'next/head'
import { PostCard, PostWidget, Categories } from './../components'

const posts = [
  { title: 'React Testing', excerpt: 'Learning React Testing' },
  { title: 'React With Tailwind', excerpt: 'Learning React With Tailwind' },
]
const Home: NextPage = () => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-spa-8 col-span-1">
          {posts.map((post) => (
            <PostCard post={post} key={post.title} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4 ">
          <div className="relative top-8 lg:sticky ">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
