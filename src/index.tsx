import { App } from './App';
import { IGeoJson } from './tools/IGeoJson';

main();

interface IPlaceType {
    placeItem: {
        type: 'DISTRICT' | 'COUNTY';
        id: string;
    };
    value: number;
}

async function main() {
    const app = new App(document.getElementById('root') as HTMLDivElement);
    app.run();

    const results = (await (await fetch(
        `http://localhost:3001/results/map/total/805`,
    )).json()) as IPlaceType[];

    const url = `/samples/CZdistricts.geojson`;
    const geoJson = (await (await fetch(url)).json()) as IGeoJson;

    for (const feature of geoJson.features) {
        feature.properties.id = (feature.properties as any).OKRES;
        const id = feature.properties.id;

        const result = results.find((result) => result.placeItem.id == id);
        let value: null | number = null;

        if (result) {
            value = result.value;
        }

        feature.properties.value = value;
    }

    //console.log('geoJson', geoJson);

    app.loadGeoJson(geoJson);

    //console.log(app);
}
