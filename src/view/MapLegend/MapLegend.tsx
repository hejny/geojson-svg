import './MapLegend.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';

interface IMapLegendProps {
    appState: IAppState & IObservableObject;
}

export const MapLegend = observer(({ appState }: IMapLegendProps) => {

    return (
        <div className="MapLegend">
           MapLegend
        </div>
    );
});