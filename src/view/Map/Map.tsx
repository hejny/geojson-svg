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
import { IGeoJsonFeature } from '../../geo/IGeoJson';

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

    if(!isBoundariesDefined(boundaries)){
        return(<div>Loading</div>);
    }

    const [lat,lng] = boundariesRange(boundaries);
    
    const height = width*lng/lat*1.6;

    return (
        <div className="Map">
            <svg {...{ width, height }}>
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
                                fill: colorFromValue(getFeatureValue(feature)),
                                stroke: 'purple',
                                strokeWidth: 1,
                            }}
                            onClick={()=>{
                                console.log('feature',feature);
                            }}
                        />
                    )),
                )}
            </svg>
        </div>
    );
});
function colorFromValue(value:number):string{
    const r = Math.floor(value*255);
    return `rgb(${r},${r},${r})`;
}

function getFeatureValue(feature: IGeoJsonFeature):number{
    return Math.random();//feature.properties.AREA/3162900000;
}

function toRelativeBoundaries(value: number, max: number, min: number): number {
    return (value - min) / (max - min);
}
