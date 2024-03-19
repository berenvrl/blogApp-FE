const NotificationBar = ({ message, errorsituation }) => {
    if (message === null) {
        return null
    }
    const classname= errorsituation ? 'error':'notification'

    return (
        <div className={classname}>
            <p>{message}</p>
        </div>
    )
}

export default NotificationBar
