import { IGeoJson } from '../tools/IGeoJson';
import { ValuesRange } from 'src/tools/ValuesRange';
import { ColorScheme } from 'src/tools/ColorScheme';

export interface IAppState {
    opened: IGeoJson[];
    valuesRange: ValuesRange;
    colorScheme: ColorScheme;
}
