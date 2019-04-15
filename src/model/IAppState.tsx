import { IGeoJson } from '../tools/IGeoJson';
import { ValuesRange } from 'src/tools/ValuesRange';

export interface IAppState {
    opened: IGeoJson[];
    valuesRange: ValuesRange;
}
