import { forwardRef } from 'react'

export const ImgItem = forwardRef(
  ({ className, el: { image_url, title, description } }, ref) => (
    <li className={className}>
      {image_url && (
        <img
          src={image_url}
          alt={title}
          ref={ref}
        />
      )}
      <span>{description}</span>
    </li>
  ),
)
