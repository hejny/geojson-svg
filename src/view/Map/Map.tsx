import './Map.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';

interface IMapProps {
    appState: IAppState & IObservableObject;
}

type IMapBoundaries = [
    number | null,
    number | null,
    number | null,
    number | null
];

export const Map = observer(({ appState }: IMapProps) => {
    const coordinatesWGS84All = appState.opened.reduce(
        (coords, geoJson) => [
            ...coords,
            ...geoJson.features.reduce(
                (coords, feature) => [
                    ...coords,
                    ...feature.geometry.coordinates[0],
                ],
                [] as [number, number][],
            ),
        ],

        [] as [number, number][],
    );

    const boundaries = coordinatesWGS84All.reduce(
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

    const width = 800,
        height = 500;

    return (
        <div className="Map">
            <svg {...{ width, height }} style={{ border: '2px solid red' }}>
                {appState.opened.map((geoJson) => (
                    <>
                        {geoJson.features.map((feature) =>
                            feature.geometry.coordinates.map((polygon) => (
                                <polygon
                                    points={polygon
                                        .map(([lat, lng]) => [
                                            1 -
                                                toRelativeBoundaries(
                                                    lat,
                                                    boundaries[0]!,
                                                    boundaries[2]!,
                                                ),
                                            toRelativeBoundaries(
                                                lng,
                                                boundaries[1]!,
                                                boundaries[3]!,
                                            ),
                                        ])
                                        .map(
                                            ([lat, lng]) =>
                                                `${lat * width},${lng *
                                                    height}`,
                                        )
                                        .join(' ')}
                                    style={{
                                        fill: 'lime',
                                        stroke: 'purple',
                                        strokeWidth: 1,
                                    }}
                                />
                            )),
                        )}
                    </>
                ))}
            </svg>
        </div>
    );
});

function toRelativeBoundaries(value: number, max: number, min: number): number {
    return (value - min) / (max - min);
}
