import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Details from './Details'


test('displaying blog title & author but not url&likes', async() => {
    const blog={
        title:'this is blog title',
        author:'this is author',
        url:'http://anyblogwebsite.com',
        likes:10,
    }

    render(<Blog blog={blog} />)

    const titleElement = screen.getByText((content, element) => {
        return element.tagName.toLowerCase() === 'li' && content.includes('this is blog title')
    })

    const authorElement = screen.getByText((content, element) => {
        return element.tagName.toLowerCase() === 'li' && content.includes('this is author')
    })

    const urlElement = screen.queryByText(blog.url)
    const likesElement = screen.queryByText(blog.likes.toString())

    expect(titleElement).toBeInTheDocument()
    expect(authorElement).toBeInTheDocument()



    const elementUrl= screen.getByText('http://anyblogwebsite.com')
    const elementLikes= screen.getByText('10')

    expect(elementLikes).toBeDefined()
    expect(elementUrl).toBeDefined()


    const button=screen.getByText('View')
    const user= userEvent.setup()
    await user.click(button)

    const urlElementAfterClick = screen.getByText('http://anyblogwebsite.com')
    const likesElementAfterClick = screen.getByText('10')

    expect(urlElementAfterClick).toBeInTheDocument()
    expect(likesElementAfterClick).toBeInTheDocument()
})

test('clicking the button calls event handler once', async() => {
    const blog={
        title:'this is blog title',
        author:'this is author'
    }

    const mockhandler= jest.fn()

    render(<Blog blog={blog} handleDeleteBlog={mockhandler} />)

    const user= userEvent.setup()

    const button= screen.getByText('Remove')
    await user.click(button)


    expect(mockhandler.mock.calls).toHaveLength(1)

})

test('clicking the button calls event handler twice', async() => {

    const blog={
        author:'author',
        url:'http://justanurl',
        likes:22
    }

    const mockhandler= jest.fn()

    render(<Details blog={blog} handleLikes={mockhandler} />)

    const user= userEvent.setup()

    const button= screen.getByText('Likes')
    await user.click(button)
    expect(mockhandler.mock.calls).toHaveLength(1)
    await user.click(button)
    expect(mockhandler.mock.calls).toHaveLength(2)

})

test('<NewBlog/> updates parent state and calls onSubmit', async() => {
    const createBlog=jest.fn()
    const user=userEvent.setup()

    render(<NewBlog createBlog={createBlog}/>)

    // const input=screen.getAllByRole('textbox')
    const input= screen.getByPlaceholderText('Title')
    const input2=screen.getByPlaceholderText('Author')
    const input3=screen.getByPlaceholderText('Url')
    const input4= screen.getByPlaceholderText('Likes')

    const sendButton= screen.getByText('Save')

    await user.type(input,'this is a title')
    await user.type(input2,'this is an author')
    await user.type(input3, 'this is url')
    await user.type(input4, '30')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
        title: 'this is a title',
        author: 'this is an author',
        url: 'this is url',
        likes: 30,
    })
} )

describe('<Togglable/>', () => {
    let container

    beforeEach(() => {
        container=render(
            <Togglable buttonLabel='show...' buttonLabel2='hide'>
                <div className="testdiv">togglable content</div>
            </Togglable>
        ).container
    })

    test('at start the children are not displayed', () => {
        const div= container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display:none')
    })
    test('after clicking the button, children are displayed', async() => {
        const user= userEvent.setup()
        const button=screen.getByText('show...')
        await user.click(button)

        const div= container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display:none')
    })
    test('toggled content can be closed', async() => {
        const user=userEvent.setup()
        const div=container.querySelector('.togglableContent')

        const button= screen.getByText('show...')
        await user.click(button)

        expect(div).not.toHaveStyle('display: none')

        const closeButton= screen.getByText('hide')
        await user.click(closeButton)

        expect(div).toHaveStyle('display:none')
    })

})

