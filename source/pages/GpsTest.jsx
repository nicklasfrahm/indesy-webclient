import React from 'react'
import { Button, Segment, Header, Icon, Table } from 'semantic-ui-react'
import { geolocated } from 'react-geolocated'
import { getGoogleCoords } from '../util'

import FullPageGrid from '../components/FullPageGrid'

const GpsTest = props => (
  <FullPageGrid>
    <Segment raised>
      <Header as="h3">
        <Icon name="compass" />
        <Header.Content>GPS Test</Header.Content>
      </Header>
      {!props.isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation.</div>
      ) : !props.isGeolocationEnabled ? (
        <div>Geolocation is not enabled.</div>
      ) : props.coords ? (
        <div>
          <Table celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">GPS information</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Latitude</Table.Cell>
                <Table.Cell>{props.coords.latitude || 'n/a'}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Longitude</Table.Cell>
                <Table.Cell>{props.coords.longitude || 'n/a'}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Altitude</Table.Cell>
                <Table.Cell>{props.coords.altitude || 'n/a'}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Heading</Table.Cell>
                <Table.Cell>{props.coords.heading || 'n/a'}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Speed</Table.Cell>
                <Table.Cell>{props.coords.speed || 'n/a'}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button
            primary
            target="_blank"
            href={`https://maps.google.dk/maps/place/${getGoogleCoords(
              props.coords
            )}`}
          >
            Show location on Google Maps
          </Button>
        </div>
      ) : (
        <div>Getting the location data&hellip;</div>
      )}
    </Segment>
  </FullPageGrid>
)

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  },
  userDecisionTimeout: null,
  geolocationProvider: navigator.geolocation
})(GpsTest)
