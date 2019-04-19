export class ColorScheme {
    colorFromValue(value: number): string {
        const r = Math.floor(value * 255);
        return `rgb(${r},${r},${r})`;
    }
}
