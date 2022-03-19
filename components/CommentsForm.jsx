import React, { useRef, useState, useEffect } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')
  }, [])

  const handleCommentSubmission = () => {
    setError(false)
    const { value: comment } = commentEl.current
    const { value: name } = nameEl.current
    const { value: email } = emailEl.current
    const { checked: storeData } = storeDataEl.current
    if (!comment || !name || !email) {
      setError(true)
      return
    }
    const commentObj = { name, email, comment, slug }

    if (storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name')
      window.localStorage.removeItem('email')
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true)

      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    })
  }

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        Leave a Reply
      </h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          ref={commentEl}
          placeholder="Comment"
          name="comment"
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-1 focus:ring-gray-200"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          ref={emailEl}
          placeholder="email"
          name="email"
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-1 focus:ring-gray-200"
        />
        <input
          ref={nameEl}
          placeholder="name"
          name="name"
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-1 focus:ring-gray-200"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <input
            type="checkbox"
            ref={storeDataEl}
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            htmlFor="storeData"
            className="ml-3 cursor-pointer text-gray-500"
          >
            Save my e-mail and name for the next time I comment
          </label>
        </div>
      </div>
      {error && <p className="text-x5 text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button
          className="
           inline-block 
           cursor-pointer 
           rounded-full 
           bg-pink-600 
           px-5 
           py-3 
           text-lg 
           text-white 
           transition 
           duration-500 
           ease-in-out
           hover:bg-indigo-900
           "
          type="button"
          onClick={handleCommentSubmission}
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-300">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
