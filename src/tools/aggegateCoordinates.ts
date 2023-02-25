import { ICoord, IGeoJson, IGeoJsonFeature } from './IGeoJson';

export function aggegateGeoJsonCoordinates(geoJson: IGeoJson): ICoord[] {
    return geoJson.features.reduce(
        (coords, feature) => [
            ...coords,
            ...aggegateGeoJsonFeatureCoordinates(feature),
        ],
        [] as ICoord[],
    );
}

export function aggegateGeoJsonFeatureCoordinates(
    feature: IGeoJsonFeature,
): ICoord[] {
    if (feature.geometry.type === 'Polygon') {
        return feature.geometry.coordinates[0]; //todo maybe iterate
    } else if (feature.geometry.type === 'MultiPolygon') {
        return feature.geometry.coordinates[0][0]; //todo iterate
    }

    return [];
    //todo throw new Error(`Unexpected GeoJson.feature.geometry type "${feature.geometry.typ}".`);
}
