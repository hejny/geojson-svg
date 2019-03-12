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

        this.loadFile('/samples/CZcounties.geojson');
        this.loadFile('/samples/CZdistricts.geojson');
        //this.loadFile('/samples/DEbld.geojson');
        
    }

    async loadFile(url: string) {
        const geoJson = (await (await fetch(url)).json()) as IGeoJson;
        this.appState.opened.push(geoJson);
    }
}
