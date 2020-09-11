import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

export default function SearchBar() {
  const [ open, setOpen ] = useState(false)
  const [ options, setOptions ] = useState([])
  const loading = open && options.length === 0
  
  const router = useRouter()  
  const [ searchValue, setSearchValue ] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (location.pathname.includes('search')) {
      inputRef.current.value = searchValue
    } else {
      inputRef.current.value = ''
    }
  }, [])

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HCMS_API_URL}/articles`)
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

  const search = e => {
    e.preventDefault()
    if (searchValue !== '') {
      router.push(`/search?searchValue=${searchValue.replace(/ +/g, ' ').trim()}`)
    } else { return null }
  }

  return (
    <FormSearchBar onSubmit={search}>
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
        onChange={(e, value) => setSearchValue(String(value))}
        renderInput={params => (
          <TextField
            {...params}
            label="Exact search..."
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
            onChange={e => setSearchValue(String(e.target.value))}
            ref={inputRef}            
          />
        )}
      />
      <IconButton type="submit" aria-label="search">
        <FontAwesomeIcon icon={faSearch} size="xs" />
      </IconButton>
    </FormSearchBar>
  )
}

const FormSearchBar = styled.form`
  margin: 0 0 .5em 0;
  display: flex;
  > :first-child {
    width: 109px !important;
    > div > div {
      padding-right: 0 !important;
    }
  }
  > :nth-child(2) {
    margin-top: .5em;
  }

  @media only screen and (min-width: 768px) {
    > :first-child {
      width: 150px !important;
    }
  }

  @media only screen and (min-width: 1024px) {
    margin-left: 275px;
  }
`
