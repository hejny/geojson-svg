import { IObservableObject } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { getFeatureValue } from 'src/tools/getFeatureValue';
import { IAppState } from '../../model/IAppState';
import {
  aggegateGeoJsonCoordinates,
  aggegateGeoJsonFeatureCoordinates
} from '../../tools/aggegateCoordinates';
import {
  boundariesRange, getBoundaries,
  isBoundariesDefined
} from '../../tools/getBoundaries';
import './Map.css';

interface IMapProps {
    width: number;
    appState: IAppState & IObservableObject;
}

export const Map = observer(({ appState, width }: IMapProps) => {
    const coordinatesWGS84All = appState.opened.reduce(
        (coords, geoJson) => [
            ...coords,
            ...aggegateGeoJsonCoordinates(geoJson),
        ],

        [] as [number, number][],
    );

    const boundaries = getBoundaries(coordinatesWGS84All);

    if (!isBoundariesDefined(boundaries)) {
        return <div>Loading</div>;
    }

    const [lat, lng] = boundariesRange(boundaries);

    const height = ((width * lng) / lat) * 1.6;

    return (
        <div className="Map">
            <svg {...{ width, height }}>
                {appState.opened.map((geoJson) =>
                    geoJson.features.map((feature, i) => (
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
                                fill: appState.colorScheme.colorFromValue(
                                    appState.valuesRange.getValue(
                                        getFeatureValue(feature),
                                    ),
                                ),
                                stroke: 'black',
                                strokeWidth: 1,
                            }}
                            onClick={() => {
                                console.log(
                                    'feature',
                                    JSON.parse(JSON.stringify(feature)),
                                );
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
