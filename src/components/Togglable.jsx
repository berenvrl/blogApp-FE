import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    //makes its toggleVisibility function available outside of the component
    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button className='togglebtn' onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className='togglableContent'>
                {props.children}
                <button onClick={toggleVisibility}>{props.buttonLabel2}</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    buttonLabel2: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable

//useImperativeHandle is a React hook, that is used for defining functions in a component, which can be invoked from outside of the component
