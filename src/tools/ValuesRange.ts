interface IRange {
    min: number;
    max: number;
}

export class ValuesRange {
    //private values: number[] = [];
    public range: IRange | null = null;

    pushValue(value: number) {
        //this.values.push(value);

        if (!this.range) {
            this.range = { min: value, max: value };
        } else {
            if (this.range.max < value) this.range.max = value;
            if (this.range.min > value) this.range.min = value;
        }
    }

    getValue(value: number): number {
        //todo DRY
        if (!this.range) {
            throw new Error(`Thare is no value to set the range.`);
        }

        const rangedValue =
            (value - this.range.min) / (this.range.max - this.range.min);

        //console.log('rangedValue', rangedValue);

        return rangedValue;
    }

    getArray(count: number): number[] {
        //todo DRY
        if (!this.range) {
            throw new Error(`Thare is no value to set the range.`);
        }

        const array: number[] = [];
        //let current = this.range.

        for (let i = 0; i < count; i++) {
            array.push(
                this.range.min +
                    ((this.range.max - this.range.min) / count) * i,
            );
        }

        array.push(this.range.max);

        return array;
    }
}
