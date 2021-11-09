import Provider from './Provider'
import Main from './components/main/Main'
import "./index.css"

/**
 * start page scroll at bottom
 * 
 * with a new post, page should stay scrolled to bottom
 * 
 * textarea container should have white background
 * so that scrolling items are hidden behind it
 */

export default () => 
  <Provider>
    <Main />
  </Provider>