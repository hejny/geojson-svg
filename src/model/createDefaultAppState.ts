import { ValuesRange } from 'src/tools/ValuesRange';
import { IAppState } from './IAppState';

export function createDefaultAppState(): IAppState {
    return {
        opened: [],
        valuesRange: new ValuesRange(),
    };
}
