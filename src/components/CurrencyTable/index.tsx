import { useState, useContext, useEffect, useRef, useCallback } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import RefreshIcon from '@mui/icons-material/Refresh'
import axios from 'axios'
import { AppContext } from '../../providers/appContext'
import { Currency } from '../../types'
import { URL, API_KEY } from '../../const'
// import { data } from '../../moc'

const CurrenciesTable = () => {
  const [currenciesData, setCurrenciesData] = useState<Currency[]>([])
  const { state, dispatch } = useContext(AppContext)
  const intervalId = useRef<ReturnType<typeof setInterval>>()
  const [needUpdate, setNeedUpdate] = useState(true)

  const getData = useCallback(async () => {
    //ao45yloXMn4HOez3vLx62485Jrx1iWyt

    try {
      const { data } = await axios.get(`${URL}?apikey=${API_KEY}`)
      let arrCurrency = []
      for (const key in data.quotes) {
        arrCurrency.push(
          JSON.parse(
            '{"currency":"' + key + '", "rate":"' + data.quotes[key] + '"}'
          )
        )
      }

      dispatch({
        type: 'setCurrencies',
        currencies: {
          lastRefreshTime: new Date(),
          data: arrCurrency,
        },
      })

      setCurrenciesData(state.currencies.data)
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, state.currencies.data])

  useEffect(() => {
    let curTime = new Date()
    let timeDiff = curTime.valueOf() - state.currencies.lastRefreshTime

    //if a page refresh is initialized, check if update is need
    if (needUpdate || timeDiff >= 3600000) {
      getData()
      setNeedUpdate(false)
    }

    intervalId.current = setInterval(() => {
      getData()
    }, 3600000)

    return () => clearInterval(intervalId.current)
  }, [needUpdate, getData, state.currencies.lastRefreshTime])

  const handleRefreshCurrenciesClick = () => {
    setNeedUpdate(true)
  }

  return (
    <Box sx={{ flexGrow: 1, width: '70%', margin: 'auto' }}>
      <IconButton
        aria-label="edit"
        sx={{ marginLeft: '46%' }}
        onClick={() => handleRefreshCurrenciesClick()}
      >
        <RefreshIcon />
      </IconButton>
      <TableContainer
        sx={{
          marginTop: 3,
          alignContent: `center`,
          '& .MuiTableCell-root': {
            borderLeft: '1px solid rgba(224, 224, 224, 1)',
          },
        }}
        component={Paper}
      >
        <Table aria-label="Table of Currencies" size="small">
          <TableHead>
            <TableRow sx={{ height: '55px' }}>
              <TableCell align="right">currency</TableCell>
              <TableCell align="right">rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currenciesData &&
              currenciesData.map((row: Currency) => (
                <TableRow key={row.currency}>
                  <TableCell component="th" scope="row" align="right">
                    {row.currency}
                  </TableCell>
                  <TableCell align="right">{row.rate}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default CurrenciesTable
