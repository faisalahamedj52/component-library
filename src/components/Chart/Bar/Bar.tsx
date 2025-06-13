/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useMemo, useRef } from "react";
import ReactECharts from "echarts-for-react";
import type { ElementEvent } from "echarts";

interface SeriesData {
  name: string;
  data: number[];
  type?: string;
  stack?: string;
}
interface BarChartData {
  [key: string]: string | number;
}

interface BarChartProps {
  widgetId?: string;
  title?: string;
  xAxisData: string[];
  seriesData: SeriesData[];
  stacked?: boolean;
  colors?: string[];
  onBarClick?: (data: BarChartData) => void;
}

export const BarChart: React.FC<BarChartProps> = ({
  widgetId,
  title,
  xAxisData,
  seriesData,
  stacked = false,
  colors = [],
  onBarClick,
}) => {
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
          const seriesItem = seriesData?.find(
            (item) => item.name === seriesName
          );
          const value = seriesItem?.data[dataIndex] || 0;
          const name = xAxisData[dataIndex];

          onBarClick({
            widgetId: currentWidgetId,
            seriesName,
            value,
            seriesIndex: seriesData.indexOf(seriesItem),
            dataIndex,
            name,
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
  }, [onBarClick, seriesData, widgetId]);

  const option = useMemo(
    () => ({
      grid: { top: 8, right: 8, bottom: 20, left: 50 },
      title: { text: title, left: "center" },
      animation: false,
      tooltip: {
        trigger: "axis",
        backgroundColor: "#000000DE",
        borderColor: "transparent",
        textStyle: {
          fontSize: 12,
          color: "#FFFFFF",
        },
        padding: [5, 10],
        axisPointer: {
          type: "shadow",
        },
        enterable: true,
        hideDelay: 0,
        confine: false,
        position: (point) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return [point[0] + 15, point[1] - 50];
        },
      },

      legend: {
        top: 2,
        bottom: 0,
        itemWidth: 12,
        itemHeight: 12,
        textStyle: { fontSize: 12, verticalAlign: "middle" },
      },
      //@ts-expect-error
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      color: colors,
      xAxis: {
        type: "category",
        data: xAxisData,
        axisLabel: { interval: xAxisData.length > 5 ? "auto" : 0 },
      },
      yAxis: { type: "value" },

      series: seriesData?.map((series) => ({
        ...series,
        type: "bar",
        stack: stacked ? "total" : undefined,
        barMaxWidth: 65,
      })),
    }),
    [title, xAxisData, seriesData, stacked, colors]
  );

  const onEvents = useMemo(
    () => ({
      click: (params: ElementEvent) => {
        if (onBarClick) {
          //@ts-expect-error
          onBarClick(params);
        }
      },
    }),
    [onBarClick]
  );

  return (
    <div ref={containerRef}>
      <ReactECharts
        option={option}
        onEvents={onEvents}
        style={{ height: "210px", width: "100%" }}
      />{" "}
    </div>
  );
};
