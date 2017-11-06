import React from 'react'
import { Grid } from 'semantic-ui-react'

const FullPageGrid = props => {
  return (
    <Grid
      centered
      style={{
        minHeight: '100vh',
        width: '100%',
        margin: '0px',
        paddingTop: '40px',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    >
      <Grid.Column>{props.children}</Grid.Column>
    </Grid>
  )
}

export default FullPageGrid
