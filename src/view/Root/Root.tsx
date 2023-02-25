import { IObservableObject } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { IAppState } from '../../model/IAppState';
import { Map } from '../Map/Map';
import { MapLegend } from '../MapLegend/MapLegend';
import './Root.css';

interface IAppProps {
    appState: IAppState & IObservableObject;
}

export const Root = observer(({ appState }: IAppProps) => {
    return (
        <div className="Root">
            <Map width={500} {...{ appState }} />
            <MapLegend {...{ appState }} />
        </div>
    );
});
