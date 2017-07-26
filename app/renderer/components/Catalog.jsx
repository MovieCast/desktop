import React, { Component } from 'react';
import { Grid, Paper } from 'material-ui';

class MoviesCatalog extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            align="flex-start"
            justify="flex-start"
          >
            {[0, 1, 2].map(value =>
              (<Grid key={value} item>
                <Paper>
                  {`Cell ${value + 1}`}
                </Paper>
              </Grid>),
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default MoviesCatalog;
