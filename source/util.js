import coordtool from 'coord-convert'

export function getGoogleCoords(coords) {
  const DMLat = coordtool.convertDecimaltoDMLat(coords.latitude)
  const DMLng = coordtool.convertDecimaltoDMLng(coords.longitude)
  return `${DMLat}+${DMLng}`
}
