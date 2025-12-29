import { NavLink } from 'react-router-dom'

import { Icon } from '../../../../../../components'

import styles from './logo.module.sass'

export const Logo = ({ className }) => (
  <NavLink
    className={className}
    to='/'
  >
    <Icon
      className={styles['icon-logo']}
      iconType='regular'
      iconName='image'
    />
    &nbsp;<b>C</b>ollage<b>W</b>eb
  </NavLink>
)
