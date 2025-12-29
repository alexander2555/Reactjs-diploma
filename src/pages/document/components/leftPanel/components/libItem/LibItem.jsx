export const LibItem = ({
  className,
  ref,
  onDragStart,
  el: { image_url, title, description },
}) => {
  return (
    <li className={className}>
      <img
        src={image_url}
        ref={ref}
        alt={title}
        draggable={true}
        onDragStart={onDragStart}
        crossOrigin='anonymous'
        title={title}
      />
      <span>{description}</span>
    </li>
  )
}
