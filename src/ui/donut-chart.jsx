import { DonutChart as DonutChartMantine } from '@mantine/charts';
import { Legend } from 'recharts';
import { IconCircleFilled } from '@tabler/icons-react';

export const DonutChart = ({ chartLabel, payloadValue, statusColor }) => {
    const renderLegend = (props) => {
        const { payload } = props;

        return (
            payload.map((entry, index) => (
                <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', textWrap: 'nowrap' }}><IconCircleFilled style={{ marginRight: '0.5rem' }} color={statusColor} size='0.75rem' />{entry.value}</div>
            ))
        );
    }
    return <div style={{ position: 'relative', paddingBottom: '2.5rem' }}>
        <DonutChartMantine
            size={100}
            thickness={14}
            styles={{
                label: { color: "#000000", fontSize: "1rem" }
            }}
            data={
                [{ value: 100 - chartLabel, color: "#D9D9D9" },
                { name: payloadValue, value: chartLabel, color: statusColor }
                ]}
            withTooltip={false}
            chartLabel={chartLabel + "%"}
        />
        <Legend wrapperStyle={{ left: "50%", transform: "translateX(-50%)" }} content={renderLegend} payload={[{ value: payloadValue }]} />
    </div>
}
