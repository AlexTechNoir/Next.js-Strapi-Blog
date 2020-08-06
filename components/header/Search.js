import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

export default function Search() {
  const [ open, setOpen ] = useState(false)
  const [ options, setOptions ] = useState([])
  const loading = open && options.length === 0

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    (async () => {
      const res = await fetch('http://localhost:1337/articles')
      await sleep(1000)
      const articles = await res.json()

      if (active) {
        setOptions(Object.keys(articles).map(i => articles[i].title))
      }
    })()

    return () => {
      active = false
    }

  }, [loading])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <SearchBar>
      <Autocomplete
        id="asynchronous-demo"
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={option => option}
        options={options}
        loading={loading}
        forcePopupIcon={false}
        renderInput={params => (
          <TextField
            {...params}
            label="Search..."
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />
      <IconButton type="submit" aria-label="search">
        <FontAwesomeIcon icon={faSearch} size="xs" />
      </IconButton>
    </SearchBar>
  )
}

const SearchBar = styled.form`
  margin: 0 0 .5em 0;
  display: flex;
  > :first-child {
    width: 150px !important;
    > div > div {
      padding-right: 0 !important;
    }
  }
  > :nth-child(2) {
    margin-top: .5em;
  }
`
