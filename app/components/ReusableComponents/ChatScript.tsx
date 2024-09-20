import React from 'react'
import Script from 'next/script'

const ChatScript = () => {
  return (
    <Script
        id='respondio__widget'
        strategy='afterInteractive'
        src='https://cdn.respond.io/webchat/widget/widget.js?cId=85a38a28525271bf84fb1e834f4015c'
    />
  )
}

export default ChatScript
