import { Link, useNavigate } from 'react-router-dom'
import stylies from './button.module.sass'

export const Button = ({ className, to, navigate, onClick, children, ...props }) => {
  const nav = useNavigate()
  const classes = stylies.btn + (className ? ` ${className}` : '')

  if (to || navigate) {
    const handleClick = e => {
      if (navigate) {
        e.preventDefault()
        nav(navigate)
      }
      if (onClick) onClick(e)
    }

    return (
      <Link to={to || '#'} className={classes} onClick={handleClick} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type='button' className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
