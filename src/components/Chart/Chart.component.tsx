import React from "react";
import Chart from "react-apexcharts";

import { themeMaterial } from "../../settings/materialTheme.setting";
const { main } = themeMaterial.palette.primary;

interface Props {
  title?: string;
  type?: "area" | "line" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "treemap" | "boxPlot" | "candlestick" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | undefined;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  width: string | number;
  height: string | number;
  titleColor?: string;
  categories?: string[];
  options?: ApexCharts.ApexOptions;
  background?: "white";
  plotOptions?: ApexPlotOptions;
  legend?: ApexLegend;
  labels?: string[];
  elevation?: number;
  fillColors?: string[];
  setPointSelection?: (pointSelected: string) => void;
  tooltip?: {
    customFrequency: string;
  };
}

/**
 *
 * @param categories //representa las categorias de los graficos. Algunos graficos lo pueden tener otros no.
 * @param setPointSelection // es una funcion que se activa cuando se selecciona una conjunto de datos
 *                          de un grafico determinado. La funcion que se pasa por props sirva para realizar
 *                          alguna mecanismo que debe suceder cuando se selecciona un conjunto de datos.
 * @param tooltip //es un funcion que se que sirve para agregar contenido extra al tooltip de
 *                              de un grafico determinado.
 * @returns
 */

export const PopChart: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <Chart
      options={{
        chart: {
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
          fontFamily: "Epilogue, sans-serif",
          background: props.background,
          events: {
            dataPointSelection(e, chart?, options?) {
              let index: number = options.dataPointIndex;
              let optionSelected: string = options.w.globals.labels[index];
              props.setPointSelection && props.setPointSelection(optionSelected);
            },
          },
        },

        labels: props.labels || [],
        legend: {
          ...props.legend,
        },
        xaxis: {
          categories: props.categories || [],
        },
        plotOptions: {
          ...props.plotOptions,
        },
        dataLabels: {
          formatter: function (val, opt) {
            switch (props.type) {
              case "pie":
                return `${Math.floor((val as number) * 100) / 100} %`;
              case "bar":
                return val as string;
              case "donut":
                return `${Math.floor((val as number) * 100) / 100} %`;
              default:
                return "";
            }
          },
        },
        title: {
          text: props.title,
          align: "center",
          margin: 20,
          offsetY: 20,
          style: {
            fontSize: "1rem",
            fontFamily: "Epilogue, sans-serif",
            color: props.titleColor ? props.titleColor : "black",
          },
        },
        fill: {
          colors: props.fillColors || [main],
        },
        tooltip: {
          enabled: true,
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            let content = "";
            switch (props.type) {
              case "bar":
                content = `
                      <div style="border-bottom: 1px solid #e3e3e3; padding: 10px 15px; font-weight: bold; border-radius: 2px; display: flex; justify-content: center; background: #e3e3e3">
                        ${w.globals.labels[dataPointIndex]}
                      </div>
                      <div style="
                      display: flex;
                      flex-direction: column;
                      row-gap: 10px;
                      padding: 10px 0px;">
                      <div style="padding: 0px 15px;">
                        ${props.tooltip?.customFrequency || "Cantidad de selecciones:"}: ${series[seriesIndex][dataPointIndex]}
                      </div></div>`;
                break;
              case "pie":
                content = `
                      <div style="padding: 10px 15px; font-weight: bold;">
                        ${w.globals.labels[seriesIndex]}
                      </div>
                      <div style="padding: 10px 15px; display: flex; column-gap: 10px;">
                        <span>${props.tooltip?.customFrequency || "Frecuencia:"}</span><div style="font-weight: bold;">${series[seriesIndex]}</div>
                      </div>`;
                break;
              case "donut":
                content = `
                      <div style="padding: 10px 15px; font-weight: bold;">
                        ${w.globals.labels[seriesIndex]}
                      </div>
                      <div style="padding: 10px 15px; display: flex; column-gap: 10px;">
                        <span>${props.tooltip?.customFrequency || "Frecuencia"}</span><div style="font-weight: bold;">${series[seriesIndex]}</div>
                      </div>`;
                break;
              default:
                content = "";
                break;
            }
            return `<div style="background: white;
                color: black;
                box-shadow: '0px 7px 14px rgba(0, 0, 0, 0.1)';
                font-family: "Epilogue, sans-serif;">${content}</div>`;
          },
        },
      }}
      type={props.type}
      series={props.series}
      width={props.width}
      height={props.height}
    />
  );
};
