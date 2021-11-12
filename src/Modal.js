import { useContext } from 'react'
import { Context } from '../../Provider'

export default function Modal() {
  const [context, dispatch] = useContext(Context)

  const renderContent = () => {
    switch(context.modal) {
      case 'register':
        return 
      case 'forgot-password':
       return 
      default:
        return
    }
  }

  return (
    <div id="modal" className="modal" style={{
      display: context.modal ? 'block' : 'none'
    }}>
      <div id="content" className="content">
        {renderContent()}
      </div>
    </div>
  )
}