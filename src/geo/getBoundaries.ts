import { ICoord } from './IGeoJson';

export function getBoundaries(coordinates: ICoord[]): IMapBoundaries {
    return coordinates.reduce(
        (boundaries, coords) => {
            let [latMin, lngMin, latMax, lngMax] = boundaries;
            let [lat, lng] = coords; //todo is it in the correct order

            if (!latMin || latMin > lat) latMin = lat;
            if (!lngMin || lngMin > lng) lngMin = lng;
            if (!latMax || latMax < lat) latMax = lat;
            if (!lngMax || lngMax < lng) lngMax = lng;

            return [latMin, lngMin, latMax, lngMax] as IMapBoundaries;
        },
        [null, null, null, null] as IMapBoundaries,
    );
}

export type IMapBoundaries = [
    number | null,
    number | null,
    number | null,
    number | null
];
