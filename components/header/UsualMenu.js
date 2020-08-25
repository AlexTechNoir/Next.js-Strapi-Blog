import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import Chip from '@material-ui/core/Chip'
import styled from 'styled-components'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-regular-svg-icons'
import Context from '../../context'
import { useContext } from 'react'

export default function UsualMenu({ isMenuOpen, setIsMenuOpen, data, error }) {
  const { isDarkModeOn, toggleColorMode } = useContext(Context)
  
  return (
    <ListUsualMenu component="nav" aria-label="secondary mailbox folders">
      <ListItem button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${isMenuOpen ? 'underscored' : ''}`}>
        <ListItemText primary="Categories" />
      </ListItem>
      <Collapse in={isMenuOpen} timeout="auto" unmountOnExit className="dropDownMenuList">
        <List component="div" disablePadding>
          {data ? (
            data.map(category => (
              <Link href="/categories/[id]" as={`/categories/${category.id}`} key={category.id}>
                <a onClick={() => setIsMenuOpen(false)}>
                  <ListItem button>
                    <Chip
                      label={category.name}
                      variant="outlined"
                      color="primary"
                      size="small"
                    />
                  </ListItem>
                </a>
              </Link>
            ))
          ) : error ? (
            <div>Error.</div>
          ) : (
            <div>Loading...</div>
          )}
        </List>
      </Collapse>
      <Link href="/about">
        <a onClick={() => setIsMenuOpen(false)}>
          <ListItem button>
            <ListItemText primary="About me" />
          </ListItem>
        </a>
      </Link>
      <ListItem 
        button 
        onClick={e => toggleColorMode(e)} 
        id={`${isDarkModeOn ? 'swithToLightMode' : 'swithToDarkMode'}`}
      >
        {
          isDarkModeOn ? (
            <FontAwesomeIcon icon={faMoon} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faSun} size="lg" />
          )
        }        
      </ListItem>
    </ListUsualMenu>
  )
}

const ListUsualMenu = styled(List)`
  display: flex;
  > .underscored {
    border-bottom: 2px solid #B875CD;
  }
  > .dropDownMenuList {
    position: absolute;
    top: 57px;    
    max-width: 282px;
    max-height: 250px;
    background-color: white;
    border-radius: 0 0 15px 15px;
    overflow: auto;
  }
  a {
    text-decoration: none;
    color: black;
    white-space: nowrap;
    > div > div {
      cursor: pointer;
    }
  }
  > :last-child {
    border-radius: 30px;
  }
`
