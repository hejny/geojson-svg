import { ValuesRange } from 'src/tools/ValuesRange';
import { IAppState } from './IAppState';
import { ColorScheme } from 'src/tools/ColorScheme';

export function createDefaultAppState(): IAppState {
    return {
        opened: [],
        valuesRange: new ValuesRange(),
        colorScheme: new ColorScheme(),
    };
}
