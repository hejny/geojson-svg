interface IRange {
    min: number;
    max: number;
}

export class ValuesRange {
    private values: number[] = [];
    private range: IRange | null = null;

    pushValue(value: number) {
        this.values.push(value);

        if (!this.range) {
            this.range = { min: value, max: value };
        } else {
            if (this.range.max < value) this.range.max = value;
            if (this.range.min > value) this.range.min = value;
        }
    }

    getValue(value: number): number {
        if (!this.range) {
            throw new Error(`Thare is no value to set the range.`);
        }

        const rangedValue =
            (value - this.range.min) / (this.range.max - this.range.min);

        //console.log('rangedValue', rangedValue);

        return rangedValue;
    }
}
