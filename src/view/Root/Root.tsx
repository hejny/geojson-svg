import './Root.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { Map } from '../Map/Map';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import { MapLegend } from '../MapLegend/MapLegend';

interface IAppProps {
    appState: IAppState & IObservableObject;
}

export const Root = observer(({ appState }: IAppProps) => {
    return (
        <div className="Root">
            <Map width={500} {...{ appState }} />
            <MapLegend  {...{ appState }} />
        </div>
    );
});
