import { ColorScheme } from 'src/tools/ColorScheme';
import { ValuesRange } from 'src/tools/ValuesRange';
import { IGeoJson } from '../tools/IGeoJson';

export interface IAppState {
    opened: IGeoJson[];
    valuesRange: ValuesRange;
    colorScheme: ColorScheme;
}
