import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

type Props = {
    data: number[];
    binSize?: number;
    width?: string | number;
    height?: string | number;
    color?: string;
};

function Histogram({
    data,
    binSize = 10,
    width = '100%',
    height = 300,
    color = '#8884d8',
}: Props) {
    if (data.length < 1) {
        return (
            <div
                style={{
                    width,
                    height,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed #ccc',
                    borderRadius: '8px',
                    color: '#999',
                    fontStyle: 'italic',
                }}
            >
                No fitness data available yet.
            </div>
        );
    }

    const bins: { bin: string; count: number }[] = [];

    const min = Math.min(...data);
    const max = Math.max(...data);
    const numBins = Math.ceil((max - min + 1) / binSize);

    for (let i = 0; i < numBins; i++) {
        bins.push({
            bin: `${(min + i * binSize).toFixed(0)}-${(min + (i + 1) * binSize).toFixed(0)}`,
            count: 0,
        });
    }

    data.forEach((value) => {
        const index = Math.min(
            Math.floor((value - min) / binSize),
            bins.length - 1,
        );
        bins[index].count += 1;
    });

    return (
        <ResponsiveContainer width={width} height={height}>
            <BarChart data={bins}>
                <XAxis dataKey="bin" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill={color} />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default Histogram;
