import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IAppState } from './model/IAppState';
import { IObservableObject, observable } from 'mobx';
import { Root } from './view/Root/Root';
import { createDefaultAppState } from './model/createDefaultAppState';
import { IGeoJson, IGeoJsonFeature } from './tools/IGeoJson';
import { ValuesRange } from './tools/ValuesRange';
import { getFeatureValue } from './tools/getFeatureValue';

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
        this.recountRange(geoJson);
        this.appState.opened.push(geoJson);
    }

    private recountRange(geoJsonNew: IGeoJson) {
        const valuesRange = new ValuesRange();
        for (const geoJson of [...this.appState.opened, geoJsonNew]) {
            for (const feature of geoJson.features) {
                //console.log('feature', feature);
                valuesRange.pushValue(getFeatureValue(feature));
            }
        }
        //console.log(valuesRange);
        this.appState.valuesRange = valuesRange;
    }

    /*
    async loadFile(url: string) {
        const geoJson = (await (await fetch(url)).json()) as IGeoJson;
        this.loadGeoJson(geoJson);
    }
    */
}
