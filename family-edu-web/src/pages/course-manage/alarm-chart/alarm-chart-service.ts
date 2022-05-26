/*
 * @Description: 告警曲线服务
 * @Author: zpwan
 * @Date: 2022-05-26 10:14:51
 * @Last Modified by: zpwan
 * @Last Modified time: 2022-05-26 17:37:58
 */
import { ref } from 'vue';

import { init, EChartsType, EChartsOption } from 'echarts';

import { formatDate } from '@/utils/index';

const DANGER_COLOR = 'rgba(247, 75, 68, 1)';
const DANGER_SHADOW_COLOR = '#fcbcc0';
const NORMAL_COLOR = 'rgba(24, 144, 255, 1)';
const NORMAL_SHADOW_COLOR = '#b7dcff';

// 越限值
const OUT_OF_LIMIT_VALUE = 330;
// 峰值
const PEAK_VALUE = 290;
// 阈值
const THRESHOLD_VALUE = 200;

const data = [
  {
    value: 330,
  },
  {
    value: 221,
  },
  {
    value: 110,
  },
  {
    value: 120,
  },
  {
    value: 290,
  },
  {
    value: 250,
  },
  {
    value: 130,
  },
  {
    value: 170,
  },
  {
    value: 160,
  },
  {
    value: 320,
  },
  {
    value: 220,
  },
  {
    value: 390,
  },
  {
    value: 230,
  },
  {
    value: 270,
  },
];

const xAxis = [
  1653552621839, 1653553621839, 1653554621839, 1653555621839, 1653556621839, 1653557621839, 1653558621839,
  1653559621839, 1653560621839, 1653561621839, 1653562621839, 1653563621839, 1653564621839, 1653565621839,
  1653566621839,
];

class AlarmChartService<T> {
  //#region
  private _is_init = ref<boolean>(false)
  private _dataSource = ref<T>();
  private _customChartId = ref<string>('');
  private echartsInstance?: EChartsType;
  //#endregion
  //#region
  public get customChartId(): string {
    return this._customChartId.value;
  }
  constructor(params: T) {
    this._customChartId.value = `charts_${(Math.random() * 10000).toFixed(0)}`;
    this._is_init.value = true
    this._dataSource.value = params;
  }

  //#region 初始化
  initChart() {
    if(!this._is_init.value){
      console.warn('请先初始化服务！');
      return;
    }
    const containerEle = document.getElementById(this._customChartId.value);
    if (!containerEle) {
      console.warn('加载图表容器错误！');
return
    }
    this.echartsInstance = init(containerEle);
    const options = this.getEchartsOptions();
    this.echartsInstance.setOption(options);
  }
  //#endregion
  //#region 获取echarts配置
  getEchartsOptions(): EChartsOption {
    const unit = 'kWh';
    return {
      title: {
        text: `单位（${unit}）`,
        textStyle: {
          color: 'rgba(0, 0, 0, 0.45)',
          fontSize: 14,
        },
        top: 20,
        left: 10,
      },
      tooltip: this.getTooltip(),
      grid: {
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxis,
        axisLabel: {
          show: false, // 不显示文本
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(216, 216, 216, 1)', // 轴线颜色
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter:(params: number)=>{
            return params === THRESHOLD_VALUE ? '' : params + ''
          },
          color: 'rgba(0, 0, 0, 0.65)'
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: 'rgba(216, 216, 216, 1)', // 轴线颜色
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(216, 216, 216, 1)', // 轴线颜色
          },
        },
        splitLine: {
          show: false,
        },
      },
      visualMap: {
        show: false,
        // 根据值来显示不同颜色
        pieces: [
          {
            gt: 0,
            lte: THRESHOLD_VALUE,
            color: NORMAL_COLOR,
          },
          {
            gt: THRESHOLD_VALUE,
            color: DANGER_COLOR,
          },
        ],
        seriesIndex: 0,
      },
      series: this.getSeries(),
    };
  }
  //#endregion
  //#region tooltip
  getTooltip(): EChartsOption['tooltip'] {
    return {
      trigger: 'axis',
      borderWidth: 0,
      padding: [0],
      formatter(params: any) {
        const value = params[0]?.value;
        const date = Number(params[0]?.axisValue);
        const borderColor = value > THRESHOLD_VALUE ? DANGER_COLOR : NORMAL_COLOR;
        const labelColor = 'rgba(0, 0, 0, 0.45)';
        const valueColor = 'rgba(0, 0, 0, 0.65)';
        const marginBottom = '8px';
        return `<div style="padding: 10px 16px 12px;border:2px solid ${borderColor};border-radius: 4px;line-height: 22px">
                    <div style="color: ${labelColor}">越限值</div>
                    <div style="color: ${valueColor};margin-bottom: ${marginBottom}">${value ?? '--'}</div>
                    <div style="color: ${labelColor}">越限时间</div>
                    <div style="color: ${valueColor};margin-bottom: ${marginBottom}">
                    ${formatDate(date, 'yyyy-MM-dd HH:mm:ss')}
                    </div>
                    <div style="color: ${labelColor}">阈值</div>
                    <div style="color: ${valueColor};">${THRESHOLD_VALUE}</div>
                </div>`;
      },
      position: (point, params, dom, rect, size) => [
        point[0] + size.contentSize[0] + 40 < size.viewSize[0] ? point[0] + 34 : point[0] - 34 - size.contentSize[0],
        8,
      ],
      // TODO---- 需要根据值 生成不同颜色
      axisPointer: {
        type: 'line',
        axis: 'x',
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(24, 144, 255, 1)' },
              { offset: 1, color: 'rgba(24, 144, 255, 0)' },
            ],
          },
          width: 1,
          type: 'solid',
        },
      },
    };
  }
  //#endregion
  //#region series
  getSeries(): EChartsOption['series'] {
    return [
      {
        name: 'alarm',
        type: 'line',
        stack: 'Total',
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
        itemStyle: {
          borderWidth: 20,
        },
        lineStyle: {
          width: 2,
        },
        symbol: 'circle',
        symbolSize: 16,
        showSymbol: true,
        data: this.getDataIsShowDot(
          data.map((item) => {
            return item.value as number;
          }),
        ),
        markPoint: {
          symbolSize: 0, // 容器大小
          symbolOffset: [32, -4], //位置偏移
          data: [
            {
              xAxis: '1653552621839',
              yAxis: OUT_OF_LIMIT_VALUE,
              name: 'Max',
              value: '越限值',
              itemStyle: {
                borderWidth: 0,
              },
              label: {
                color: 'rgba(0, 0, 0, 0.65)',
              },
            },
            {
              xAxis: '1653556621839',
              yAxis: PEAK_VALUE,
              value: '峰值点',
              name: 'Min',
              itemStyle: {
                borderWidth: 0,
              },
              label: {
                color: 'rgba(0, 0, 0, 0.65)',
              },
            },
          ],
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [
            {
              emphasis: {
                lineStyle: {
                  width: 1,
                },
              },
              // name: '123',
              yAxis: THRESHOLD_VALUE,
              label: {
                show: true,
                position: 'start',
                color:DANGER_COLOR
              },
              lineStyle: {
                width: 1,
                color: DANGER_COLOR,
              },
            },
          ],
        },
      },
    ];
  }
  //#endregion
  //#region 获取symbolStyle
  getsymbolStyle(color: string, shodowColor: string): any {
    return {
      color: {
        type: 'radial',
        x: 0.5,
        y: 0.5,
        r: 0.5,
        colorStops: [
          {
            offset: 0,
            color,
          },
          {
            offset: 0.2,
            color,
          },
          {
            offset: 0.3,
            color,
          },
          {
            offset: 0.4,
            color,
          },
          {
            offset: 0.5,
            color,
          },
          {
            offset: 0.6,
            color: shodowColor,
          },
          {
            offset: 0.7,
            color: shodowColor,
          },
          {
            offset: 0.8,
            color: shodowColor,
          },
          {
            offset: 0.9,
            color: shodowColor,
          },
          {
            offset: 1,
            color: shodowColor,
          },
        ],
      },
    };
  }
  //#endregion
  //#region 判断是否展示点
  getDataIsShowDot(data: string[] | number[]) {
    if (data && data.length && data.length > 0) {
      let arrItem = {};
      const arrData: any[] = [];
      data.forEach((item: any, index: number) => {
        const color = item > THRESHOLD_VALUE ? DANGER_COLOR : NORMAL_COLOR;
        const shadowColor = item > THRESHOLD_VALUE ? DANGER_SHADOW_COLOR : NORMAL_SHADOW_COLOR;
        if (
          index === 0 &&
          item !== '--' &&
          Object.prototype.toString.call(item) !== '[object Null]' &&
          ((data.length > 1 && (data[1] === '--' || Object.prototype.toString.call(data[1]) === '[object Null]')) ||
            data.length === 1)
        ) {
          arrItem = {
            value: item,
            emphasis: {
              scale: false,
              lineStyle: {
                width: 2,
              },
              itemStyle: this.getsymbolStyle(color, shadowColor),
            },
            itemStyle: {
              color,
            },
          };
          arrData.push(arrItem);
        } else if (
          item !== '--' &&
          Object.prototype.toString.call(item) !== '[object Null]' &&
          data.length > 1 &&
          index === data.length - 1 &&
          (data[data.length - 2] === '--' || Object.prototype.toString.call(data[data.length - 2]) === '[object Null]')
        ) {
          arrItem = {
            value: item,
            emphasis: {
              scale: false,
              lineStyle: {
                width: 2,
              },
              itemStyle: this.getsymbolStyle(color, shadowColor),
            },
            itemStyle: {
              color,
            },
          };
          arrData.push(arrItem);
        } else if (
          item !== '--' &&
          Object.prototype.toString.call(item) !== '[object Null]' &&
          Object.prototype.toString.call(data[index - 1]) === '[object Null]' &&
          Object.prototype.toString.call(data[index + 1]) === '[object Null]'
        ) {
          arrItem = {
            value: item,
            emphasis: {
              scale: false,
              lineStyle: {
                width: 2,
              },
              itemStyle: this.getsymbolStyle(color, shadowColor),
            },
            itemStyle: {
              color,
            },
          };
          arrData.push(arrItem);
        } else if(item === OUT_OF_LIMIT_VALUE || item === PEAK_VALUE){
          arrItem = {
            value: item,
            emphasis: {
              scale: false,
              lineStyle: {
                width: 2,
              },
              itemStyle: this.getsymbolStyle(color, shadowColor),
            },
            itemStyle: this.getsymbolStyle(color, shadowColor),
          };
          arrData.push(arrItem);
        }else {
          arrItem = {
            value: item,

            emphasis: {
              scale: false,
              lineStyle: {
                width: 2,
              },
              itemStyle: this.getsymbolStyle(color, shadowColor),
            },
            itemStyle: {
              color: 'transparent',
            },
          };
          arrData.push(arrItem);
        }
      });
      return arrData;
    } else {
      return data;
    }
  }
  //#endregion
}

export default AlarmChartService;
