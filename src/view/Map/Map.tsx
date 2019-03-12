import './Map.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';

interface IMapProps {
    appState: IAppState & IObservableObject;
}

type IMapBoundaries = [number|null,number|null,number|null,number|null]

export const Map = observer(({ appState }: IMapProps) => {

    if(!appState.opened){
        return  <>Opening</>;
    }


    const coordinatesWGS84 = appState.opened.features[0].geometry.coordinates[0];

    console.log(coordinatesWGS84);

    const boundaries = 
    coordinatesWGS84.reduce((boundaries,coords)=>{

        let [latMin,lngMin, latMax,lngMax] = boundaries;
        let [lat,lng] = coords;// as any as [number,number];
     
        if(!latMin || latMin>lat)latMin=lat;
        if(!lngMin || lngMin>lng)lngMin=lng;
        if(!latMax || latMax<lat)latMax=lat;
        if(!lngMax || lngMax<lng)lngMax=lng;


        return [latMin,lngMin, latMax,lngMax] as IMapBoundaries;

    },[null,null,null,null] as IMapBoundaries);

    console.log('boundaries',boundaries);

    
    const coordinatesRelative = coordinatesWGS84.map(([lat,lng])=>[
        toRelativeBoundaries(lat,boundaries[0]!,boundaries[2]!),
        toRelativeBoundaries(lng,boundaries[1]!,boundaries[3]!)
    ])

    console.log(coordinatesRelative);
    
    return (
        <div className="Map">
            {!appState.opened ? <>Opening</> : <>
                test
                <svg height="500" width="500">
                    <polygon points={coordinatesRelative.map(([lat,lng])=>`${lat*500},${lng*500}`).join(' ')} style={{fill:"lime",stroke:"purple",strokeWidth:1}} />
                </svg> 
            </>}
        </div>
    );
});

function toRelativeBoundaries(value: number, max:number, min: number):number{
    return (value-min)/(max-min);
}