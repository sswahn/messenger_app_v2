import Provider from './Provider'
import Modal from './Modal'
import Main from './components/main/Main'
import "./index.css"

/**
 * Register/forgot password modals
 * 
 * toolbar functionality : image upload
 * 
 * figure out how to get page 
 * title/description/image/video/favicon from links
 * (this is serverside issue)
 * 
 * 
 */

export default () => 
  <Provider>
    <Modal />
    <Main />
  </Provider>