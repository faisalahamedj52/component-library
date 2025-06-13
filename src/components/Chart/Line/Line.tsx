/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { ResponsiveContainer } from "recharts";
import ReactECharts from "echarts-for-react";

// import EmptyGraph from "screens/DashboardV2/components/common/EmptyGraph";
import EChartsReact from "echarts-for-react";
import { useMemo, forwardRef, useEffect, useRef } from "react";
import { formatXAxisData, handleChartClick } from "../../../helper/helper";
// import {
//   formatXAxisData,
//   handleChartClick
// } from "screens/DashboardV2/components/dataVisualization/helper";
// import type { TooltipComponentFormatterCallbackParams } from "echarts";
// import { DashboardWidgetCustomTooltipFormatter } from "screens/DashboardV2/components/dataVisualization/DashboardCustomTooltipFormatter";

type LineGraphProps = {
  widgetId?: string;
  showLegend?: boolean;
  title?: string;
  xAxisData: string[];
  seriesData: {
    name: string;
    data: number[];
    color?: string;
  }[];
  yAxisLabel?: string;
  xAxisLabel?: string;
  isDefaultXaxis?: boolean;
  height?: string;
  cardHeight: number;
  onClick?: (e: { name: string }) => void;
  isPercentage: boolean;
  selectedLegends?: Record<string, boolean>;
};

const LineGraph = forwardRef<EChartsReact, LineGraphProps>(
  (
    {
      widgetId,
      xAxisData,
      seriesData,
      showLegend = true,
      yAxisLabel = "Value",
      xAxisLabel = "Date",
      height = "10rem",
      onClick = () => {},
      isDefaultXaxis = false,
      isPercentage = false,
      selectedLegends = {},
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleTooltipClick = (event: Event) => {
        const target = event.target as HTMLElement;
        const tooltipIcon = target.closest(".tooltip-icon");
        if (tooltipIcon) {
          const clickedWidgetId = tooltipIcon.getAttribute("data-widget");
          const currentWidgetId = widgetId;

          if (clickedWidgetId !== currentWidgetId) return;
          const seriesName = tooltipIcon.getAttribute("data-series");
          if (seriesName) {
            const dataIndex = tooltipIcon.getAttribute("data-index");
            const seriesItem = seriesData.find(
              (item) => item.name === seriesName
            );
            const value = seriesItem?.data[dataIndex] || 0;
            const xAxisValue = xAxisData[dataIndex];

            onClick({
              //@ts-expect-error
              widgetId: currentWidgetId,
              name: seriesName,
              value,
              seriesIndex: seriesData.indexOf(seriesItem),
              dataIndex,
              xAxisValue,
            });
          }
        }
      };

      const containerEl = containerRef.current;
      if (containerEl) {
        containerEl.addEventListener("click", handleTooltipClick);
      }
      return () => {
        if (containerEl) {
          containerEl.removeEventListener("click", handleTooltipClick);
        }
      };
    }, [onClick, seriesData, widgetId, containerRef]);

    const hasData = seriesData?.some((item) => item?.data?.length > 0);
    const formattedXAxisData = useMemo(
      () => formatXAxisData(xAxisData),
      [xAxisData]
    );

    const options = useMemo(() => {
      return {
        grid: { top: 8, right: 8, bottom: 20, left: 50 },
        legend: {
          show: false,
          selected: selectedLegends,
        },
        xAxis: {
          type: "category",
          data: isDefaultXaxis ? xAxisData : formattedXAxisData,
          name: xAxisLabel,
        },
        yAxis: {
          type: "value",
          name: yAxisLabel,
          axisLabel: {
            formatter: (value: string) => (isPercentage ? `${value}%` : value),
          },
          splitNumber: 2,
        },

        series: seriesData?.map((item) => ({
          data: item?.data,
          type: "line",
          smooth: true,
          name: item?.name,
          lineStyle: { color: item?.color || undefined },
          itemStyle: {
            color: item?.color || undefined,
          },
          emphasis: {
            focus: "series",
          },
        })),
        tooltip: {
          trigger: "axis",
          backgroundColor: "#000000DE",
          textStyle: {
            fontSize: 12,
            color: "#FFFFFF",
            lineHeight: 4,
          },
          padding: [4, 6],
          axisPointer: {
            type: "shadow",
          },
          enterable: true,
          hideDelay: 0,
          confine: false,
          position: (point) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return [point[0] + 15, point[1] - 60];
          },

          // formatter: (params: TooltipComponentFormatterCallbackParams[]) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          // DashboardWidgetCustomTooltipFormatter(params, title, widgetId)
        },
      };
    }, [
      formattedXAxisData,
      seriesData,
      xAxisLabel,
      yAxisLabel,
      selectedLegends,
    ]);

    const onChartClick = (params) =>
      handleChartClick(params, xAxisData, onClick);

    return (
      <div className="-mt-1" ref={containerRef}>
        <div className="chart-container" style={{ height }}>
          <ReactECharts
            option={options}
            style={{ height }}
            opts={{ renderer: "svg" }}
            onEvents={{
              click: onChartClick,
            }}
            ref={ref}
          />
        </div>

        {hasData && showLegend && (
          <div className="flex justify-center mt-2">
            {seriesData?.map((item) => (
              <div key={item.name} className="flex items-center mr-4">
                <span
                  className="inline-block w-3 h-3 mr-1"
                  style={{ backgroundColor: item.color || "#5470C6" }}
                ></span>
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default LineGraph;
