# INDESY - Indoor delivery system
[![CircleCI](https://img.shields.io/circleci/project/nicklasfrahm/indesy-webclient/develop.svg?style=flat-square&label=develop)](https://circleci.com/gh/nicklasfrahm/indesy-webclient)
[![CircleCI](https://img.shields.io/circleci/project/nicklasfrahm/indesy-webclient/master.svg?style=flat-square&label=master)](https://circleci.com/gh/nicklasfrahm/indesy-webclient)

## Description
The web application for an indoor delivery system. The web application will be used to manage mapping data and to control the indoor delivery system.

## Installation
Be sure to have at least the latest LTS of node installed. Then open a terminal and run:
```shell
npm install
npm start
```

## Build
The build will be run by webpack and the files will be written to the `build` directory. To run the build, simply execute:
```shell
npm run build
```

## Models
Every model will additionally have a UUID, which will not be listed in the definition as it is common across all models.

### Chunk
This model describes a part of the map.
```
{
  x: Number,
  y: Number,
  occupied: Number,
  scanned: Number,
  reference: UUID
}
```

### Map
The latitude and the longitude fix the according chunks in space.
```
{
  name: String,
  latitude: Number,
  longitude: Number
}
```