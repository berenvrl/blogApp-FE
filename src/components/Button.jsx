const Button = ({
  type,
  className,
  onClick,
  children
}) => {
  return (
  <button type={type} onClick={onClick} className={className}>
    {children}
  </button>)
}

export default Button
