import { IGeoJsonFeature } from './../tools/IGeoJson';

export function getFeatureValue(feature: IGeoJsonFeature): number {
    return feature.properties.value || 0;
}
