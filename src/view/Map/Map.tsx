import './Map.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import {
    aggegateGeoJsonCoordinates,
    aggegateGeoJsonFeatureCoordinates,
} from '../../geo/aggegateCoordinates';
import { getBoundaries, isBoundariesDefined, boundariesRange } from '../../geo/getBoundaries';

interface IMapProps {
    appState: IAppState & IObservableObject;
}

export const Map = observer(({ appState }: IMapProps) => {
    const coordinatesWGS84All = appState.opened.reduce(
        (coords, geoJson) => [
            ...coords,
            ...aggegateGeoJsonCoordinates(geoJson),
        ],

        [] as [number, number][],
    );

    const boundaries = getBoundaries(coordinatesWGS84All);

    if(!isBoundariesDefined(boundaries)){
        return(<div>Loading</div>);
    }

    const [lat,lng] = boundariesRange(boundaries);
    
    const width = 1000,
        height = 1000*lng/lat*1.7;

    return (
        <div className="Map">
            <svg {...{ width, height }} style={{ border: '2px solid red' }}>
                {appState.opened.map((geoJson) =>
                    geoJson.features.map((feature,i) => (
                        <polygon
                            key={i}
                            points={aggegateGeoJsonFeatureCoordinates(feature)
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
                                        `${lat * width},${lng * height}`,
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
            </svg>
        </div>
    );
});

function toRelativeBoundaries(value: number, max: number, min: number): number {
    return (value - min) / (max - min);
}
