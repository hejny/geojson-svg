import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IAppState } from './model/IAppState';
import { IObservableObject, observable } from 'mobx';
import { Root } from './view/Root/Root';
import { IGeoJson } from './model/IGeoJson';
import { createDefaultAppState } from './model/createDefaultAppState';

export class App {
    constructor(private rootElement: HTMLDivElement) {}

    public appState: IAppState & IObservableObject;
    async run() {
        this.appState = observable(createDefaultAppState());
        ReactDOM.render(
            <Root {...{ appState: this.appState }} />,
            this.rootElement,
        );

        this.loadFile();
    }

    async loadFile() {
        const geoJson = (await (await fetch(
            '/samples/CZcounties.geojson',
        )).json()) as IGeoJson;
        this.appState.opened = geoJson;
    }
}
