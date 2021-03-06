export type IGeoJson = {
    type: string;
    name: string;
    //"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    features: IGeoJsonFeature[];
};

export interface IGeoJsonFeature {
    type: string;
    properties: {
        //todo IPlaceItem
        id: number | string | null;
        type: string;

        value: number | null;
        AREA: number;
        PERIMETER: number;
        NAZEV: number;
        OB91: number;
        OB01: number;
        OB_311202: number;
        NUTS3: string;
        NK: string;
        KN: string;
        NUTS2: string;
        NAZEV_ENG: string;
        county: string;
    };
    geometry:
        | {
              type: 'Polygon';
              coordinates: [ICoord[]];
          }
        | {
              type: 'MultiPolygon';
              coordinates: [[ICoord[]]];
          };
}

export type ICoord = [number, number];
