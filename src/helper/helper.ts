// Line graph chart click
export const handleChartClick = (
  params,
  xAxisData: string[],
  onClick: (e: { name: string }) => void
) => {
  if (params.componentType === "series" && params.seriesType === "line") {
    const clickedData = {
      name: params.seriesName,
      value: params.data,
      seriesIndex: params.seriesIndex,
      dataIndex: params.dataIndex,
      xAxisValue: xAxisData[params.dataIndex],
    };
    onClick(clickedData);
  }
};

export const formatXAxisData = (xAxisData: string[]) => {
  return xAxisData.map((date) => {
    const d = new Date(date);
    return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(
      d.getDate()
    ).padStart(2, "0")}`;
  });
};
