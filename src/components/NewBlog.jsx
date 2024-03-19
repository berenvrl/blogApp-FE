import InputField from './InputField'
import { useState } from 'react'

const NewBlog = ({ createBlog }) => {
    //new blog addition
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
            likes: likes,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes('')
    }

    return (
        <div className='loginForm'>
            <h2>Create a New Blog</h2>
            <form onSubmit={addBlog}>
                <InputField
                    name="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    id='title'
                />
                <InputField
                    name="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                    id='author'
                />
                <InputField
                    name="Url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Url"
                    id='url'
                />
                <InputField
                    name="Likes"
                    value={likes}
                    onChange={(e) => setLikes(Number(e.target.value))}
                    placeholder="Likes"
                    id='likes'
                />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default NewBlog
