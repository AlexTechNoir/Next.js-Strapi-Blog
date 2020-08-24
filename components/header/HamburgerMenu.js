import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ListSubheader from '@material-ui/core/ListSubheader'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Chip from '@material-ui/core/Chip'

export default function HamburgerMenu({ isMenuOpen, setIsMenuOpen, data, error }) {
  const [ isSublistOpen, setIsSublistOpen ] = useState(false)

  return (
    <DivHamburgerMenu>
      <div
        className={`button ${!isMenuOpen ? "" : "opened"}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div></div>
      </div>
      <div className={`${!isMenuOpen ? "" : "visible"}`}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Menu
            </ListSubheader>
          }
        >
          <ListItem button onClick={() => setIsSublistOpen(!isSublistOpen)}>
            <ListItemText primary="Categories" />
            {isSublistOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isSublistOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {data ? (
                data.map(category => (
                  <Link href="/categories/[id]" as={`/categories/${category.id}`} key={category.id}>
                    <a onClick={() => {setIsMenuOpen(false); setIsSublistOpen(false)}}>
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
        </List>
      </div>
    </DivHamburgerMenu>
  )
}

const DivHamburgerMenu = styled.div`
  > .button {
    margin-right: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    cursor: pointer;
    transition: all .2s ease-in-out;
    z-index: 2;
    > :first-child {
      width: 36px;
      height: 5px;
      background: black;
      border-radius: 5px;
      transition: all .2s ease-in-out;
      &::before, &::after {
        content: '';
        position: absolute;
        width: 36px;
        height: 5px;
        background: black;
        border-radius: 5px;
        transition: all .2s ease-in-out;
      }
      &::before {
        transform: translateY(-15px);
      }
      &::after {
        transform: translateY(15px);
      }
    }
  }
  > .opened > :first-child {
    background: transparent;
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
  > :last-child {
    z-index: -1;
    position: fixed;
    top: 69px;
    left: 0;
    background-color: #FFFFFF;
    overflow: hidden;
    width: 100%;
    height: 0;
    transition: height .3s;
  }
  > .visible {
    height: 100%;
    a {
      text-decoration: none;
      color: black;
      > div > div {
        cursor: pointer;
      }
    }
  }
`
