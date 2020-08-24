import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import Chip from '@material-ui/core/Chip'
import styled from 'styled-components'
import Link from 'next/link'

export default function UsualMenu({ isMenuOpen, setIsMenuOpen, data, error }) {
  return (
    <ListUsualMenu component="nav" aria-label="secondary mailbox folders">
      <ListItem button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${isMenuOpen ? 'underscored' : ''}`}>
        <ListItemText primary="Categories" />
      </ListItem>
      <Collapse in={isMenuOpen} timeout="auto" unmountOnExit className="list">
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
            <ListItemText primary="About Me" />
          </ListItem>
        </a>
      </Link>
    </ListUsualMenu>
  )
}

const ListUsualMenu = styled(List)`
  display: flex;
  > .underscored {
    border-bottom: 2px solid #B875CD;
  }
  > .list {
    position: absolute;
    top: 57px;    
    max-width: 231px;
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
`
