import React from 'react';

import styles from './styles/labeledSlider.module.css';

type Props = {
    value: number;
    onChange: (val: number) => void;
    min?: number;
    max?: number;
    label?: string;
};

function LabeledSlider({ value, onChange, min = 3, max = 64, label }: Props) {
    const [showTooltip, setShowTooltip] = React.useState(false);

    return (
        <div className={styles.sliderTrack}>
            {label && (
                <span style={{ margin: 0 }}>
                    {label} count (<strong>{value}</strong>):
                </span>
            )}
            <span className={styles.minLabel}>{min}</span>
            <div className={styles.rangeWrapper}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    onMouseDown={() => setShowTooltip(true)}
                    onMouseUp={() => setShowTooltip(false)}
                    onTouchStart={() => setShowTooltip(true)}
                    onTouchEnd={() => setShowTooltip(false)}
                    className={styles.slider}
                />
                {showTooltip && (
                    <div
                        className={styles.tooltip}
                        style={{
                            left: `${((value - min) / (max - min)) * 100}%`,
                        }}
                    >
                        {value}
                    </div>
                )}
            </div>
            <span className={styles.maxLabel}>{max}</span>
        </div>
    );
}

export default LabeledSlider;
