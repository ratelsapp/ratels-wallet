import { useState } from 'react'

export default function PasswordValide(props) {
  const { onClose } = props
  const toggleShow = () => {
    onClose()
  }
  return (
    <div className="dialog-account-box">
      <div className="mask" onClick={() => toggleShow()}></div>
      <div className="dialog-center-container">
        {props.children}
      </div>
    </div>
  )
}