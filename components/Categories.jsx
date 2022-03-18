import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { getCategories } from '../services'

function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res)
    })
  }, [])

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Categories</h3>
      {categories.map((category) => (
        <Link
          href={`/category/${category.slug}`}
          className="text-md"
          key={category.name}
        >
          <span className="mb-3 block cursor-pointer pb-3">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Categories
