import minimalBlogTheme from '@lekoarts/gatsby-theme-minimal-blog/src/gatsby-plugin-theme-ui/index'
import { merge } from 'theme-ui'
import { tailwind } from '@theme-ui/presets'

const theme = merge(minimalBlogTheme, {
  colors: {
    primary: tailwind.colors.blue[6],
  }
})

export default {
  ...theme,
}
