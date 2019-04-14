import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IAppState } from './model/IAppState';
import { IObservableObject, observable } from 'mobx';
import { Root } from './view/Root/Root';
import { createDefaultAppState } from './model/createDefaultAppState';
import { IGeoJson } from './geo/IGeoJson';

export class App {
    constructor(private rootElement: HTMLDivElement) {}

    public appState: IAppState & IObservableObject;
    async run() {
        this.appState = observable(createDefaultAppState());
        ReactDOM.render(
            <Root {...{ appState: this.appState }} />,
            this.rootElement,
        );

        //this.loadFile('/samples/CZcounties.geojson');
        //this.loadFile('/samples/CZdistricts.geojson');
        //setTimeout(()=>{
        //    this.loadFile('/samples/DEbld.geojson');
        //},2000);
    }

    async loadGeoJson(geoJson: IGeoJson) {
        this.appState.opened.push(geoJson);
    }

    /*
    async loadFile(url: string) {
        const geoJson = (await (await fetch(url)).json()) as IGeoJson;
        this.loadGeoJson(geoJson);
    }
    */
}
