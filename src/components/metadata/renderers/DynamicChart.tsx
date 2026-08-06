'use client';

import React from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  LineSeries,
  AreaSeries,
  Category,
  Tooltip,
  Legend,
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip
} from '@syncfusion/ej2-react-charts';
import { ChartWidgetConfig } from '@/types/metadata';

interface DynamicChartProps {
  data: any[];
  config?: ChartWidgetConfig;
}

export const DynamicChart: React.FC<DynamicChartProps> = ({ data, config }) => {
  if (!config) return null;

  const { chartType, xField, yField, title } = config;

  if (chartType === 'Pie' || chartType === 'Doughnut') {
    return (
      <div className="w-full bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
        {title && <h4 className="text-sm font-semibold mb-2 text-zinc-900 dark:text-zinc-100">{title}</h4>}
        <AccumulationChartComponent
          id={`pie-chart-${xField}-${yField}`}
          tooltip={{ enable: true }}
          legendSettings={{ visible: true, position: 'Bottom' }}
          height="300px"
        >
          <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={data}
              xName={xField}
              yName={yField}
              innerRadius={chartType === 'Doughnut' ? '40%' : '0%'}
              dataLabel={{ visible: true, position: 'Inside' }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
      {title && <h4 className="text-sm font-semibold mb-2 text-zinc-900 dark:text-zinc-100">{title}</h4>}
      <ChartComponent
        id={`chart-${xField}-${yField}`}
        primaryXAxis={{ valueType: 'Category', title: xField }}
        primaryYAxis={{ title: yField }}
        tooltip={{ enable: true }}
        legendSettings={{ visible: true }}
        height="300px"
      >
        <Inject services={[ColumnSeries, LineSeries, AreaSeries, Category, Tooltip, Legend]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={data}
            xName={xField}
            yName={yField}
            name={title || yField}
            type={chartType === 'Line' ? 'Line' : chartType === 'Area' ? 'Area' : 'Column'}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};
