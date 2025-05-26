export function shuffle(arr: number[]) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export function factorialApprox(n: number): number {
    if (n <= 1) {
        return 1;
    }
    if (n < 10) {
        return n * factorialApprox(n - 1);
    }

    // Stirling’s approximation: n! ≈ sqrt(2πn) * (n/e)^n
    const e = Math.E;
    const pi = Math.PI;
    return Math.sqrt(2 * pi * n) * Math.pow(n / e, n);
}

type FormatScientificNotationOptions = {
    forceString?: boolean;
};

export function formatScientificNotation(
    num: number,
    { forceString = false }: FormatScientificNotationOptions = {},
): React.ReactNode | string {
    if (num < 1e6) {
        return Math.round(num).toLocaleString();
    }
    const exponent = Math.floor(Math.log10(num));
    const mantissa = (num / Math.pow(10, exponent)).toFixed(1);
    if (forceString) {
        return `${mantissa} × 10^${exponent}`;
    }
    return (
        <>
            {mantissa} × 10<sup>{exponent}</sup>
        </>
    );
}
