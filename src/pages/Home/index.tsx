import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { CurrencyTable } from '../../components'

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="div" align="center">
            List of currencies
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <CurrencyTable />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
