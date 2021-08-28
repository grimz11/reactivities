import * as React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

interface ILocalProps {
  openForm: () => void
}

const NavBar = ({ openForm }: ILocalProps) => {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={openForm} />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar