declare module "@svg-maps/india" {
  export interface SVGMapLocation {
    id: string;
    name: string;
    path: string;
  }

  export interface SVGMap {
    label: string;
    viewBox: string;
    locations: SVGMapLocation[];
  }

  const map: SVGMap;
  export default map;
}
