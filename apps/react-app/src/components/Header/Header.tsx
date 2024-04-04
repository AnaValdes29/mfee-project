import { Grid, Typography } from '@mui/material';

import { Container } from './Header.styles';

function Header() {
  return (
      <>
        {/* DONE Activity 2 - Move all Container content to Header component */}
        <Container container>
        <Grid item flexGrow={1}>
            <Typography variant="caption" color="primary" alignItems="center">
            <span style={{ fontSize: '1.5rem' }}>[ </span>
            Making your Life Easier
            <span style={{ fontSize: '1.5rem' }}> ]</span>
            </Typography>
        </Grid>
        <Grid item flexGrow={1}>
            <Typography variant="h4" fontWeight="bold">
            Discovering the World
            </Typography>
        </Grid>
        </Container>
    </>
  );
}

export default Header;

