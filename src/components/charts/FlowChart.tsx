
import { useMemo } from 'react';
import { ResponsiveContainer, Sankey, Tooltip } from 'recharts';

interface Node {
  name: string;
}

interface Link {
  source: number;
  target: number;
  value: number;
}

interface SankeyData {
  nodes: Node[];
  links: Link[];
}

interface FlowChartProps {
  data: SankeyData;
  height?: number;
  nodeWidth?: number;
  nodePadding?: number;
  colors?: string[];
}

const FlowChart = ({
  data,
  height = 400,
  nodeWidth = 20,
  nodePadding = 50,
  colors = [
    '#4C7DAC', '#24A08D', '#0C99EB', 
    '#395881', '#1A695F', '#0061A4', 
    '#324B69', '#194540', '#005287'
  ]
}: FlowChartProps) => {
  const { nodes, links } = useMemo(() => {
    // Deep copy to avoid mutating props
    return {
      nodes: [...data.nodes],
      links: [...data.links].map(link => ({ ...link }))
    };
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <Sankey
        data={data}
        nodeWidth={nodeWidth}
        nodePadding={nodePadding}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        link={{ stroke: '#d9d9d9', strokeWidth: 2 }}
        node={{
          fill: (nodeProps) => {
            const index = nodeProps.index || 0;
            return colors[index % colors.length];
          },
          opacity: 0.9,
          stroke: '#fff',
          strokeWidth: 1
        }}
      >
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            padding: '8px 12px'
          }}
          formatter={(value, name) => {
            if (name === 'value') {
              return [`${value} units`, 'Flow Value'];
            }
            return [name, ''];
          }}
        />
      </Sankey>
    </ResponsiveContainer>
  );
};

export default FlowChart;
