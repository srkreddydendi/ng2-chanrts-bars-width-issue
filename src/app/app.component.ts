import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from './../../../services/dashboard.service';
import { BaseChartDirective } from 'ng2-charts';
import { TranslateService } from '@ngx-translate/core';
import 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-stack-bar',
  templateUrl: './stack-bar.component.html',
  styleUrls: ['./stack-bar.component.css']
})
export class StackBarComponent implements OnInit, OnChanges {

  constructor (private test: DashboardService, private translate: TranslateService) { }
  public chartColors: Array<any> = [{ // dark grey
  },];
  @ViewChild('BaseChartDirective',{ static: false, }) public stackChart: BaseChartDirective;
  @Input() data: any;

  executeReport() {
    let chartOptions = this.calculateMaxValue(this.data);
    this.chartOptions = chartOptions;
    let parseData = this.parseData(this.data);
    this.chartData = parseData;
    // console.log(this.chartOptions); 
  }

  calculateMaxValue(data) {
    let chartOptions = {
      scaleOverride: true,
      scaleShowVerticalLines: false,
      responsive: true,
      barWidth: 50,
      tooltips: {
        enabled: false
      },
      hover: {
        animationDuration: 0
      },
      plugins: {
        datalabels: {
          display: function (context) {
            // console.log(context);
            if ((context.datasetIndex === 0 && context.dataIndex === 0) || (context.datasetIndex === 0 && context.dataIndex === 1) || (context.datasetIndex === 2 && context.dataIndex === 2) || (context.datasetIndex === 3 && context.dataIndex === 3) || (context.datasetIndex === 4 && context.dataIndex === 4)) {
              return true;
            }
            else {
              return false;
            }
          },
          backgroundColor: 'white',
          borderColor: 'white',
          borderRadius: 1,
          borderWidth: 0,
          anchor: 'end',
          color: 'black',
          align: 'end',
          // offset: function (context) {
          //   if ((context.datasetIndex === 0 && context.dataIndex === 0)) {
          //     if (context.dataset.data[0] === 0) {
          //       return '10';
          //     }
          //     else {
          //       return '-35';
          //     }
          //   }
          //   else if ((context.datasetIndex === 0 && context.dataIndex === 1)) {
          //     if (context.dataset.data[1] === 0) {

          //       return '10';
          //     }
          //     else {
          //       return '-35';
          //     }
          //   }
          //   else if ((context.datasetIndex === 2 && context.dataIndex === 2)) {
          //     if (context.dataset.data[2] === 0) {
          //       return '10';
          //     }
          //     else {
          //       return '-30';
          //     }
          //   }
          //   else if ((context.datasetIndex === 3 && context.dataIndex === 3)) {
          //     if (context.dataset.data[3] === 0) {
          //       return '10';
          //     }
          //     else {
          //       return '-30';
          //     }
          //   }
          //   else if ((context.datasetIndex === 4 && context.dataIndex === 4)) {
          //     if (context.dataset.data[4] === 0) {
          //       return '10';
          //     }
          //     else {
          //       return '-30';
          //     }
          //   }
            
          // },
          font: {
            weight: 'normal',
            size: 20
          },
          formatter: Math.round
        }
      },
      pointLabels: {
        display: true
      },
      // animation:
      // {
      //       onComplete: function ()
      //                   {
      //                     var chartInstance = this.chart;
      //                     var ctx = chartInstance.ctx;
      //                     ctx.textAlign = "center";
      //                     ctx.font = "15px Roboto";
      //                     ctx.fillStyle = "black";
      //                     console.log(ctx);
      //                     Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
      //                       console.log(Chart);
      //                       var meta = chartInstance.controller.getDatasetMeta(i);
      //                       Chart.helpers.each(meta.data.forEach(function (bar, index) {
      //                         var data = dataset.data[index];
      //                         var posX = meta.data[index]._model.x;
      //                         var posY = meta.data[index]._model.y;
      //                         var barWidth = bar._model.x - bar._model.base;
      //                         var centerX = bar._model.base + barWidth / 2;
      //                         if((bar._index === 0) || (bar._index === 1) || (bar._index === 2 && bar._datasetIndex === 2) || (bar._index === 3 && bar._datasetIndex === 3))
      //                         {
      //                             ctx.fillText(data, posX + 8, posY + 7);
      //                         }
      //                       }), this);
      //                     }), this);
      //                   }
      //     },
      scales:
      {
        fontColor: '#666',
        xAxes: [{
            display: true,
            barPercentage: 0.90,
            stacked: true,
            color: "transparent",
            ticks: {
              beginAtZero: true,
              fontFamily: "'Roboto', 'Helvetica Neue', sans-serif",
              fontColor: "transparent",
              // stepSize:0.1
              // min: 0,
              // max:0,
              // stepSize:10
            },
            scaleLabel: {
              display: false
            },
            gridLines: {
              display: true,
              offsetGridLines: true,
              color: "white",
            },
          }],
        yAxes: [{
            barPercentage: 0.40,
            display: true,
            stacked: true,
            gridLines: {
              display: false,
              offsetGridLines: false
            },
            ticks: {
              fontFamily: "'Roboto', 'Helvetica Neue', sans-serif",
              fontSize: 14,
            },
          }]
      },
    };
    let dataObj =
    {
      "planDate": "2018-04-12T00:00:00Z",
      "shiftId": "1",
      "totInProgressAppts": "1",
      "totPendingAppts": "2",
      "totPlannedAppts": "5",
      "totcompletedAppts": "2"
    }
    // chartOptions.scales.xAxes[0].ticks.max = Number(data.totPlannedAppts) + 9;
    return chartOptions;
  }

  parseData(data) {
    //   let chartData = [
    //   {
    //     data: [],
    //       backgroundColor: [
    //           '#007dc6',
    //           '#367c2b',
    //            '#92cb6d',
    //             '#77c143',
    //       ],
    //     },
    //         {
    //     data: [null,null],
    //       backgroundColor: [
    //           '#007dc6',
    //           '#367c2b',
    //            '#92cb6d',
    //             '#77c143',
    //       ]
    //     },
    //           {
    //     data: [null,null],
    //       backgroundColor: [
    //             '#007dc6',
    //           '#367c2b',
    //            '#92cb6d',
    //             '#77c143',
    //       ]
    //     },
    //           {
    //     data: [null,null,null],
    //       backgroundColor: [
    //           '#007dc6',
    //           '#367c2b',
    //            '#92cb6d',
    //             '#77c143',

    //       ]
    //     }
    // ];
    let chartData = [
      {
        data: [],
        backgroundColor: [
          '#007dc6',
          '#367c2b',
          'rgb(255,255,255)',
          'rgb(255,255,255)',
          '#e62b1e',
        ],
      },
      {
        data: [null, null],
        backgroundColor: [
          '#007dc6',
          '#367c2b',
          'rgb(255,255,255)',
          'rgb(255,255,255)',
          '#e62b1e',
        ]
      },
      {
        data: [null, null],
        backgroundColor: [
          '#007dc6',
          '#367c2b',
          '#92cb6d',
          'rgb(255,255,255)',
          '#e62b1e',

        ]
      },
      {
        data: [null, null, null],
        backgroundColor: [
          '#007dc6',
          '#367c2b',
          '#92cb6d',
          '#77c143',
          '#e62b1e',
          
        ]
      },
      {
        data: [null, null, null, null],
        backgroundColor: [
          '#007dc6',
          '#367c2b',
          '#92cb6d',
          '#77c143',
          '#e62b1e',
        ]
      },
    ];
    // for (var i = 0; i < CasesByWhAreaData.length; i = i + 2) {
    //   parseData.stackBarChartData[i].data[i] = CasesByWhAreaData[i]['cases'];
    //   parseData.stackBarChartData[i + 1].data[i] = CasesByWhAreaData[i + 1]['cases'];
    // }
    if (((Number(data.totInProgressAppts) === 0) && (Number(data.totPendingAppts) === 0) && (Number(data.totcompletedAppts) === 0))
      ||
      ((Number(data.totInProgressAppts) === 0) && (Number(data.totPendingAppts) === 0))
      ||
      ((Number(data.totPendingAppts) === 0) && (Number(data.totcompletedAppts) === 0))
      ||
      ((Number(data.totInProgressAppts) === 0) && (Number(data.totcompletedAppts) === 0))) {
      //  console.log("All");
      chartData[0].data[0] = Number(data.totPlannedAppts);
      chartData[0].data[1] = Number(data.totcompletedAppts);
      chartData[1].data[2] = null;
      chartData[1].data[3] = null;
      chartData[1].data[4] = null;
      chartData[2].data[2] = Number(data.totInProgressAppts);
      chartData[2].data[3] = null;
      chartData[2].data[4] = null;
      chartData[3].data[3] = Number(data.totPendingAppts);
      chartData[3].data[4] = null;
      chartData[4].data[4] = data.cancelled ? Number(data.cancelled) : null;
    }
    else if (Number(data.totcompletedAppts) === 0) {
      // console.log("(data.totcompletedAppts) === 0");
      chartData[0].data[0] = Number(data.totPlannedAppts);
      chartData[0].data[1] = Number(data.totcompletedAppts);
      chartData[1].data[2] = null;
      chartData[1].data[3] = null;
      chartData[1].data[4] = null;
      chartData[2].data[2] = Number(data.totInProgressAppts);
      chartData[2].data[3] = Number(data.totInProgressAppts);
      chartData[2].data[4] = Number(data.totInProgressAppts);
      chartData[3].data[3] = Number(data.totPendingAppts);
      chartData[3].data[4] = Number(data.totPendingAppts);
      chartData[4].data[4] = data.cancelled ? Number(data.cancelled) : null;
    }
    else if (Number(data.totInProgressAppts) === 0) {
      // console.log("(data.totInProgressAppts) === 0");
      chartData[0].data[0] = Number(data.totPlannedAppts);
      chartData[0].data[1] = Number(data.totcompletedAppts);
      chartData[1].data[2] = null;
      chartData[1].data[3] = null;
      chartData[1].data[4] = null;
      chartData[2].data[2] = Number(data.totInProgressAppts);
      chartData[2].data[3] = Number(data.totcompletedAppts);
      chartData[2].data[4] = Number(data.totcompletedAppts);
      chartData[3].data[3] = Number(data.totPendingAppts);
      chartData[3].data[4] = Number(data.totPendingAppts);
      chartData[4].data[4] = data.cancelled ? Number(data.cancelled) : null;
    }
    else if (Number(data.totPendingAppts) === 0) {
      //  console.log("(data.totPendingAppts) === 0");
      chartData[0].data[0] = Number(data.totPlannedAppts);
      chartData[0].data[1] = Number(data.totcompletedAppts);
      chartData[1].data[2] = Number(data.totcompletedAppts);
      chartData[1].data[3] = null;
      chartData[1].data[4] = null;
      chartData[2].data[2] = Number(data.totInProgressAppts);
      chartData[2].data[3] = null;
      chartData[2].data[4] = null;
      chartData[3].data[3] = Number(data.totPendingAppts);
      chartData[3].data[4] = Number(data.totInProgressAppts);
      chartData[4].data[4] = data.cancelled ? Number(data.cancelled) : null;
    }
    else {
      // console.log("else");
      chartData[0].data[0] = (data.totPlannedAppts) ? Number(data.totPlannedAppts) : 0;
      chartData[0].data[1] = (data.totcompletedAppts) ? Number(data.totcompletedAppts) : 0;
      chartData[0].data[2] = null;
      chartData[0].data[3] = null;
      chartData[0].data[4] = null;
      chartData[1].data[2] = (data.totcompletedAppts) ? Number(data.totcompletedAppts) : 0;
      chartData[1].data[3] = (data.totcompletedAppts) ? Number(data.totcompletedAppts) : 0;
      chartData[1].data[4] = (data.cancelled) ? Number(data.totcompletedAppts) : 0;
      chartData[2].data[2] = (data.totInProgressAppts) ? Number(data.totInProgressAppts) : 0;
      chartData[2].data[3] = (data.totInProgressAppts) ? Number(data.totInProgressAppts) : 0;
      chartData[2].data[4] = (data.cancelled) ? Number(data.totInProgressAppts) : 0; 
      chartData[3].data[3] = (data.totPendingAppts) ? Number(data.totPendingAppts) : 0;
      chartData[3].data[4] = (data.cancelled) ? Number(data.totPendingAppts) : 0;
      chartData[4].data[4] = (data.cancelled) ? Number(data.cancelled) : null;   
    }
    return chartData;
  }

  public chartOptions: any = {};
  public chartLabels: string[] = ['', '', '', ''];
  public chartType: string = 'horizontalBar';
  public chartLegend: boolean = false; 
  // public chartData:any[] = [
  //   {data: [800,300],
  //       backgroundColor: [
  //           'rgb(0,114,163)',
  //           'rgb(135,184,101)',
  //       ]},
  //         {data: [null,99],
  //         backgroundColor: [
  //           'rgb(0,114,163)',
  //          'rgb(255,171,54)',
  //       ]},
  //          {data: [null,400],
  //         backgroundColor: [
  //           'rgb(0,114,163)',
  //          'rgb(254,70,55)',
  //       ]}
  // ];

  public chartData: any[] = [
    {
      data: [0, 0, null, null],
      backgroundColor: [
        '#007dc6',
        '#367c2b',
        '#92cb6d',
        '#77c143',
      ],
    },
    {
      data: [null, null, 0, 0],
      backgroundColor: [
        '#007dc6',
        '#367c2b',
        '#92cb6d',
        '#77c143',
      ]
    },
    {
      data: [null, null, 0, 0],
      backgroundColor: [
        '#007dc6',
        '#367c2b',
        '#92cb6d',
        '#77c143',
      ]
    },
    {
      data: [null, null, null, 0],
      backgroundColor: [
        '#007dc6',
        '#367c2b',
        '#92cb6d',
        '#77c143',
      ]
    },
    //   {
    // data: [12,null],
    //   backgroundColor: [
    //       'rgb(0,114,163)',
    //       'rgb(135,184,101)',
    //   ]
    // },
    // {
    //       data: [null,2],
    //     backgroundColor: [
    //       'rgb(0,114,163)',
    //      'rgb(255,171,54)',
    //   ]},
    //      {data: [null,2],
    //     backgroundColor: [
    //       'rgb(0,114,163)',
    //      'rgb(254,70,55)',
    //   ]}
  ];

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  ngOnInit() {
    this.generateTranslation();
    this.executeReport();
    // console.log(this.stackChart);
  }

  generateTranslation() {
    this.translate.get('DashboardPYD.StackChart')
      .subscribe((res) => {

        let labels = this.onTranslate(res);
        this.chartLabels = labels;
        // this.unPlannedColumnDefs = parseData.columnDefs;
      },
        err => {
          // console.log("Error");
        });
  }

  onTranslate(data) {
    let labels = [];
    labels.push(data.Planned);
    labels.push(data.Completed);
    labels.push(data.InProgress);
    labels.push(data.Pending);
    if(this.data.cancelled) {
      labels.push(data.Cancelled);
    }
    return labels;
  }

  ngOnChanges() {
    this.executeReport();
    //  console.log(this.stackChart);
  }
}