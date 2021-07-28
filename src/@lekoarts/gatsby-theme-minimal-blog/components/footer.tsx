/** @jsx jsx */
import { jsx, Link } from "theme-ui"
import {FC} from 'react';

const Footer: FC = () => {
  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        justifyContent: `center`,
        verticalAlign: 'baseline',
        mt: [6],
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
        flexDirection: 'row',
        variant: `dividers.top`,
      }}
    >
      <span>&copy; Jinwoo Oh</span>
    </footer>
  )
}

export default Footer
