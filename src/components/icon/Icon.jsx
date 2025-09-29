import stylies from './icon.module.sass'

export const Icon = ({ className, iconType, iconName }) => (
  <div className={stylies.icon + (className ? ` ${className}` : '')}>
    <i className={`fa-${iconType} fa-${iconName}`} aria-hidden='true'></i>
  </div>
)
