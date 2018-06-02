import * as eChart from './echarts.simple.min';
import WxCanvas from './wx-canvas';
let ctx;

Component({
  data: {
    _currentOptions: null
  },

  properties: {
    options: {
      type: Object,
      value: null,
      observer: '_optionsChange'
    },
    chartId: {
      type: String,
      value: Date.now().toString()
    },
    box: {
      type: Object,
      value: {
        width: '100%',
        height: '400'
      }
    }
  },

  ready() {
    this._init();
  },

  methods: {

    _init() {
      if (!this.data.options) {
        console.warn('please set options property，for example:<m-chart options="{{options}}"></m-chart>');
        return;
      }
      this._drawCanvas(this.data.options);
    },

    _optionsChange(newVal, oldVal) {
      this.setData({
        _currentOptions: newVal
      });
      if (this.data._currentOptions && oldVal) {
        this._drawCanvas(newVal);
      }
    },

    _boxChange(newVal, oldVal) {
      this._drawCanvas(this.data._currentOptions);
    },

    _drawCanvas(options) {
      let chartId = this.data.chartId;
      ctx = wx.createCanvasContext(chartId, this);
      const canvas = new WxCanvas(ctx, chartId);
      eChart.setCanvasCreator(() => {
        return canvas;
      });
      var query = wx.createSelectorQuery().in(this);
      query.select('.m-chart').boundingClientRect(res => {
        const chart = eChart.init(canvas, 'light', {
          width: res.width,
          height: res.height
        });
        canvas.setChart(chart);
        chart.setOption(options);
        this.chart = chart;
      }).exec();
    },
    _canvasToTempFilePath(opt) {
      ctx.draw(true, () => {
        wx.canvasToTempFilePath(opt, this);
      });
    },

    _touchStart(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        this.chart._zr.handler.dispatch('mousedown', {
          zrX: touch.x,
          zrY: touch.y
        });
        this.chart._zr.handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    },

    _touchMove(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        this.chart._zr.handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    },

    _touchEnd(e) {
      if (this.chart) {
        const touch = e.changedTouches ? e.changedTouches[0] : {};
        this.chart._zr.handler.dispatch('mouseup', {
          zrX: touch.x,
          zrY: touch.y
        });
        this.chart._zr.handler.dispatch('click', {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    }
  }
})