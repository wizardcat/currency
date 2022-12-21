import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages'

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
