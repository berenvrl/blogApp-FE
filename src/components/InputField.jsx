const InputField = ({
    type,
    className,
    value,
    name,
    onChange,
    placeholder,
    id,
}) => {
    return (
        <div className={className}>
            <input
                type={type}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                id={id}
            />
        </div>
    )
}

export default InputField

