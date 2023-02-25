import { IObservableObject } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { IAppState } from '../../model/IAppState';
import './MapLegend.css';

interface IMapLegendProps {
    appState: IAppState & IObservableObject;
}

export const MapLegend = observer(({ appState }: IMapLegendProps) => {
    if (!appState.valuesRange.range) {
        return <></>;
    }

    return (
        <div className="MapLegend">
            <div className="value">{appState.valuesRange.range.min}</div>
            <ul>
                {appState.valuesRange.getArray(10).map((value) => (
                    <li
                        key={value}
                        style={{
                            backgroundColor: appState.colorScheme.colorFromValue(
                                appState.valuesRange.getValue(value),
                            ),
                        }}
                    />
                ))}
            </ul>
            <div className="value">{appState.valuesRange.range.max}</div>
        </div>
    );
});
