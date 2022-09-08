import React from 'react'
import { Menu } from '@mui/icons-material'
import { IconButton } from '@mui/material'

function Header({
  words,
  setIsDrawerOpen,
}: {
  words: string
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div className="header">
      <div className="address-box">
        <span className="red-slashes">///</span> {words}
        <div className="menu-button">
          <IconButton
            aria-label="open side menu"
            onClick={() => setIsDrawerOpen(true)}
            sx={{ background: '#fff' }}
          >
            <Menu />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Header
