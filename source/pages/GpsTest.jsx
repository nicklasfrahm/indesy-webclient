import React from 'react'
import { Button, Segment, Header, Icon, Table, Label } from 'semantic-ui-react'
import { geolocated } from 'react-geolocated'
import { getGoogleCoords } from '../util'

import FullPageGrid from '../components/FullPageGrid'

const GpsTest = props => {
  const getCoords = prop => {
    const na = 'not available'
    return props.coords ? props.coords[prop] || na : na
  }
  return (
    <FullPageGrid>
      <Segment raised>
        <Header as="h1">GPS Test</Header>
        <Label color="black" size="large">
          <Icon
            name={props.isGeolocationAvailable ? 'crosshairs' : 'ban'}
            color={props.isGeolocationEnabled ? 'green' : 'red'}
          />
          GPS tracking is {!props.isGeolocationEnabled && 'not'}{' '}
          {!props.isGeolocationAvailable && 'available'}
          {props.isGeolocationAvailable && 'enabled'}!
        </Label>
        <Table style={{ marginTop: '1em' }} celled collapsing unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2">GPS information</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Latitude</Table.Cell>
              <Table.Cell>{getCoords('latitude')}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Longitude</Table.Cell>
              <Table.Cell>{getCoords('longitude')}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Altitude</Table.Cell>
              <Table.Cell>{getCoords('altitude')}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Heading</Table.Cell>
              <Table.Cell>{getCoords('heading')}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Speed</Table.Cell>
              <Table.Cell>{getCoords('speed')}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button
          color="black"
          target="_blank"
          href={
            props.coords
              ? `https://maps.google.dk/maps/place/${getGoogleCoords(
                  props.coords
                )}`
              : '#'
          }
          disabled={!props.coords}
        >
          Show location on Google Maps
        </Button>
      </Segment>
    </FullPageGrid>
  )
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  },
  userDecisionTimeout: null,
  geolocationProvider: navigator.geolocation
})(GpsTest)
