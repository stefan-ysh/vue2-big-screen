export default {
  id: '',
  title: '测试大屏',
  screenWidth: 1920,
  screenHeight: 1080,
  bgColor: '#040f22',
  description: '',
  bgImg: '/static/img/bg26.9ce744b0.png',
  isPublic: true,
  password: '',
  components: [
    {
      id: '782153d0-4be8-11ee-a5be-538986a1b90f',
      cptTitle: '基础柱状图',
      layerName: '基础柱状图',
      icon: 'bar',
      hidden: false,
      opacity: 1,
      componentName: 'BarChart',
      setterName: 'BarChart-setter',
      configProps: {
        attribute: {
          backgroundColor: '',
          chartTitle: '出行工具',
          titleLeft: 200,
          titleTop: 0,
          barDirection: 'vertical',
          titleTextColor: '#ccc',
          xAxisShow: true,
          yAxisShow: true,
          xLineShow: true,
          yLineShow: true,
          xLabelColor: '#ccc',
          xLineColor: '#ccc',
          yLabelColor: '#0bd124',
          yLineColor: '#ccc',
          yGridLineShow: false,
          yTickShow: true,
          xTickShow: true,
          barBgShow: true,
          barBgColor: 'rgba(180, 180, 180, 0.2)',
          barBorderRadius: 0,
          barLabelShow: false,
          barLabelColor: '#ff0',
          barLabelSize: 10,
          gradualColor: true,
          barColor: '#409eff',
          barColor1: '#e9a90a',
          barColor2: '#0bcfcf',
          barColor3: '#cc0ce6',
          barWidth: 15,
          barType: 'bar',
          xFontRotate: 0,
          barPath: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z'
        },
        cptDataForm: {
          dataText: '{"xData":"摩托车,客车,自驾,高铁,飞机","yData":"120,200,150,80,70"}',
          dataSource: 1,
          pollTime: 0,
          apiUrl: '/sc/test',
          sql: '-- 请在此输入用来查询数据的 sql 语句\n',
          convertData:
            '(data) => {\n  // data 为图表需要的显示数据，如果数据源为接口请求，则 data 为接口返回数据\n  return data;\n};',
          convertChart:
            '(option) => {\n  // option 为图表需要的样式数据，更多详情可查看 https://echarts.apache.org/zh/option.html\n  option.xAxis.axisLabel.fontSize = 20\n  option.grid.y = 50\n  return option;\n};'
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 48,
      cptY: 149,
      cptZ: 6,
      cptWidth: 512,
      cptHeight: 256,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: '9303a6d0-4be8-11ee-a5be-538986a1b90f',
      cptTitle: '文本框',
      layerName: '文本框',
      icon: 'text',
      hidden: false,
      opacity: 1,
      componentName: 'BText',
      setterName: 'BText-setter',
      configProps: {
        cptDataForm: {
          dataText: '{"value":"春运铁路运输可视化平台"}',
          dataSource: 1,
          pollTime: 0,
          apiUrl: '/sc/test',
          sql: '-- 请在此输入用来查询数据的 sql 语句\n',
          convertData:
            '(data) => {\n  // data 为图表需要的显示数据，如果数据源为接口请求，则 data 为接口返回数据\n  return data;\n};',
          convertChart:
            '(option) => {\n  // option 为图表需要的样式数据，更多详情可查看 https://echarts.apache.org/zh/option.html\n  return option;\n};'
        },
        attribute: {
          url: '',
          textColor: '#0D527D',
          textSize: 100,
          fontWeight: 'lighter',
          textLineHeight: 100,
          textFamily: '优设标题黑',
          textAlign: 'center',
          textShadow: false,
          offsetX: 0,
          offsetY: 0,
          blurRadius: 0,
          textShadowColor: '#000',
          fontStyle: 'normal',
          textDecoration: 'none',
          bgColor: 'rgba(255, 255, 255, 0)'
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 420,
      cptY: 23,
      cptZ: 3,
      cptWidth: 1018,
      cptHeight: 94,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: 'b9b6c450-4be9-11ee-a5be-538986a1b90f',
      cptTitle: '飞线图',
      layerName: '飞线图',
      icon: 'map-migrate',
      hidden: false,
      opacity: 1,
      componentName: 'MapMigrate',
      setterName: 'MapMigrate-setter',
      configProps: {
        cptDataForm: {
          dataSource: 1,
          pollTime: 0,
          dataText:
            '{"start":[116.4551,40.2539],"end":[{"name":"上海","value":95},{"name":"广州","value":90},{"name":"大连","value":80},{"name":"南宁","value":70},{"name":"南昌","value":60},{"name":"拉萨","value":50},{"name":"长春","value":40},{"name":"包头","value":30},{"name":"重庆","value":20},{"name":"乌鲁木齐","value":100}]}',
          apiUrl: '/sc/test',
          sql: '-- 请在此输入用来查询数据的 sql 语句\n',
          convertData:
            '(data) => {\n  // data 为图表需要的显示数据，如果数据源为接口请求，则 data 为接口返回数据\n  return data;\n};',
          convertChart:
            '(option) => {\n  // option 为图表需要的样式数据，更多详情可查看 https://echarts.apache.org/zh/option.html\n  return option;\n};'
        },
        attribute: {
          titleText: '春运航班飞线图',
          seriesName: '迁徙top10',
          seriesColor: '#DDD427',
          roam: false,
          titleLeft: 'center',
          titleTop: 10,
          period: 26,
          symbol: 'diamond',
          effectColor: '#fff',
          effectLoop: false,
          lineWidth: 0,
          symbolSize: 9,
          curveness: 0.5,
          subtext: '模拟数据',
          titleFontSize: 20,
          titleColor: '#ddd',
          subTitleColor: '#aaa',
          subTitleFontSize: 13
        },
        animation: {
          name: 'pulse',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 677,
      cptY: 311,
      cptZ: 9,
      cptWidth: 550,
      cptHeight: 482,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: 'cb88fe00-4be9-11ee-a5be-538986a1b90f',
      cptTitle: '图片',
      layerName: '图片',
      icon: 'image',
      hidden: false,
      opacity: 0.11,
      componentName: 'BImage',
      setterName: 'BImage-setter',
      configProps: {
        attribute: {
          url: '/static/img/201.fae42867.svg',
          rotatable: true,
          rotateDuration: 2,
          fit: 'fill',
          preview: false
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 640,
      cptY: 277,
      cptZ: 7,
      cptWidth: 634,
      cptHeight: 630,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: '6be28870-4beb-11ee-a5be-538986a1b90f',
      cptTitle: '平滑线图',
      layerName: '平滑线图',
      icon: 'smooth-line-chart',
      hidden: false,
      opacity: 1,
      componentName: 'LineChart',
      setterName: 'LineChart-setter',
      configProps: {
        cptDataForm: {
          dataSource: 1,
          pollTime: 0,
          dataText: '[{"xData":"Mon,Tue,Wed,Thu,Fri,Sat,Sun","yData":"120,200,150,80,70,110,130"}]',
          apiUrl: '/sc/test',
          sql: '-- 请在此输入用来查询数据的 sql 语句\n',
          convertData:
            '(data) => {\n  // data 为图表需要的显示数据，如果数据源为接口请求，则 data 为接口返回数据\n  return data;\n};',
          convertChart:
            '(option) => {\n  // option 为图表需要的样式数据，更多详情可查看 https://echarts.apache.org/zh/option.html\n  return option;\n};'
        },
        attribute: {
          title: '一天用电量分布',
          subtext: '纯属虚构',
          titleLeft: 'center',
          titleTop: 10,
          subtextColor: '#aaa',
          yTickShow: true,
          yGridLineShow: false,
          xLineShow: true,
          yLineShow: true,
          xTickShow: true,
          xLabelShow: true,
          yLabelShow: true,
          lineColor: '#409eff',
          xLabelColor: '#eee',
          xLineColor: '#eee',
          titleTextColor: '#ccc',
          yLabelColor: '#eee',
          yLineColor: '#eee',
          smooth: true,
          showSymbol: true,
          areaColor1: 'rgba(80,141,255,0.39)',
          areaColor2: 'rgba(56,155,255,0.25)',
          areaColor3: 'rgba(38,197,254,0.00)'
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 1359,
      cptY: 456,
      cptZ: 7,
      cptWidth: 528,
      cptHeight: 264,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: '7a53e3e0-4beb-11ee-a5be-538986a1b90f',
      cptTitle: '滚动列表',
      layerName: '滚动列表',
      icon: 'scroll-list',
      hidden: false,
      opacity: 1,
      componentName: 'ScrollList',
      setterName: 'ScrollList-setter',
      configProps: {
        cptDataForm: {
          dataSource: 1,
          pollTime: 0,
          dataText:
            '[{"name":"周口","value":55},{"name":"南阳","value":120},{"name":"西峡","value":78},{"name":"驻马店","value":66},{"name":"新乡","value":80},{"name":"信阳","value":45},{"name":"漯河","value":29}]',
          apiUrl: '/sc/test',
          sql: '-- 请在此输入用来查询数据的 sql 语句\n',
          convertData:
            '(data) => {\n  // data 为图表需要的显示数据，如果数据源为接口请求，则 data 为接口返回数据\n  return data;\n};',
          convertChart:
            '(option) => {\n  // option 为图表需要的样式数据，更多详情可查看 https://echarts.apache.org/zh/option.html\n  return option;\n};'
        },
        attribute: {
          data: [],
          rowNum: 5,
          waitTime: 2000,
          carousel: 'single',
          unit: '个',
          sort: true,
          valueFormatter: null
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 1381,
      cptY: 796,
      cptZ: 8,
      cptWidth: 500,
      cptHeight: 262,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: '853513b0-4beb-11ee-a5be-538986a1b90f',
      cptTitle: '数值框',
      layerName: '数值框',
      icon: 'rect-num',
      hidden: false,
      opacity: 1,
      componentName: 'RectNum',
      setterName: 'RectNum-setter',
      configProps: {
        cptDataForm: {
          dataSource: 1,
          pollTime: 0,
          dataText: '{"value":"6247"}',
          apiUrl: '/sc/test',
          sql: '-- 请在此输入用来查询数据的 sql 语句\n',
          convertData:
            '(data) => {\n  // data 为图表需要的显示数据，如果数据源为接口请求，则 data 为接口返回数据\n  return data;\n};',
          convertChart:
            '(option) => {\n  // option 为图表需要的样式数据，更多详情可查看 https://echarts.apache.org/zh/option.html\n  return option;\n};'
        },
        attribute: {
          fontSize: 50,
          padding: 10,
          borderColor: '#22628D',
          bgColor: 'rgba(5,30,85,0.68)',
          color: '#7ca1d3'
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 842,
      cptY: 128,
      cptZ: 11,
      cptWidth: 350,
      cptHeight: 100,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: '89e77830-4beb-11ee-a5be-538986a1b90f',
      cptTitle: '水位图',
      layerName: '水位图',
      icon: 'water-level',
      hidden: false,
      opacity: 1,
      componentName: 'WaterLevel',
      setterName: 'WaterLevel-setter',
      configProps: {
        cptDataForm: {
          dataSource: 1,
          pollTime: 0,
          dataText: '["55"]',
          apiUrl: '/sc/test',
          sql: '-- 请在此输入用来查询数据的 sql 语句\n',
          convertData:
            '(data) => {\n  // data 为图表需要的显示数据，如果数据源为接口请求，则 data 为接口返回数据\n  return data;\n};',
          convertChart:
            '(option) => {\n  // option 为图表需要的样式数据，更多详情可查看 https://echarts.apache.org/zh/option.html\n  return option;\n};'
        },
        attribute: {
          shape: 'roundRect',
          topColor: '#1b6782',
          bottomColor: '#1b6782',
          waveNum: 1,
          waveHeight: 40,
          waveOpacity: 0.4,
          formatter: '{value}%'
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 42,
      cptY: 462,
      cptZ: 12,
      cptWidth: 526,
      cptHeight: 260,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: 'a1a84a70-4bec-11ee-933c-97ee7ca409bc',
      cptTitle: '边框',
      layerName: '边框',
      icon: 'border',
      hidden: false,
      opacity: 1,
      componentName: 'Border',
      setterName: 'Border-setter',
      configProps: {
        attribute: {
          borderType: 'dv-border-box-1',
          borderColor1: '#409eff',
          borderColor2: '#00CED1',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderTitle: '标题1',
          titleWidth: 250,
          dur: 3,
          reverse: false
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 16,
      cptY: 777,
      cptZ: 5,
      cptWidth: 566,
      cptHeight: 294,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: '45a2e5e0-4bed-11ee-933c-97ee7ca409bc',
      cptTitle: '边框',
      layerName: '边框',
      icon: 'border',
      hidden: false,
      opacity: 1,
      componentName: 'Border',
      setterName: 'Border-setter',
      configProps: {
        attribute: {
          borderType: 'dv-border-box-1',
          borderColor1: '#409eff',
          borderColor2: '#00CED1',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderTitle: '标题1',
          titleWidth: 250,
          dur: 3,
          reverse: false
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 16,
      cptY: 445,
      cptZ: 5,
      cptWidth: 566,
      cptHeight: 294,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: '474b3eb0-4bed-11ee-933c-97ee7ca409bc',
      cptTitle: '边框',
      layerName: '边框',
      icon: 'border',
      hidden: false,
      opacity: 1,
      componentName: 'Border',
      setterName: 'Border-setter',
      configProps: {
        attribute: {
          borderType: 'dv-border-box-1',
          borderColor1: '#409eff',
          borderColor2: '#00CED1',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderTitle: '标题1',
          titleWidth: 250,
          dur: 3,
          reverse: false
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 16,
      cptY: 133,
      cptZ: 5,
      cptWidth: 566,
      cptHeight: 294,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: 'd990cff0-4bee-11ee-933c-97ee7ca409bc',
      cptTitle: '文本框',
      layerName: '文本框',
      icon: 'text',
      hidden: false,
      opacity: 1,
      componentName: 'BText',
      setterName: 'BText-setter',
      configProps: {
        cptDataForm: {
          dataText: '{"value":"已安全运输"}',
          dataSource: 1,
          pollTime: 0,
          apiUrl: '/sc/test',
          sql: '-- 请在此输入用来查询数据的 sql 语句\n',
          convertData:
            '(data) => {\n  // data 为图表需要的显示数据，如果数据源为接口请求，则 data 为接口返回数据\n  return data;\n};',
          convertChart:
            '(option) => {\n  // option 为图表需要的样式数据，更多详情可查看 https://echarts.apache.org/zh/option.html\n  return option;\n};'
        },
        attribute: {
          url: '',
          textColor: '#4BB344',
          textSize: 30,
          fontWeight: 'bold',
          textLineHeight: 30,
          textFamily: '微软雅黑',
          textAlign: 'center',
          textShadow: false,
          offsetX: 0,
          offsetY: 0,
          blurRadius: 0,
          textShadowColor: '#000',
          fontStyle: 'italic',
          textDecoration: 'none',
          bgColor: 'rgba(255, 255, 255, 0)'
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 674,
      cptY: 188,
      cptZ: 15,
      cptWidth: 150,
      cptHeight: 40,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: '166d8fd0-4bef-11ee-933c-97ee7ca409bc',
      cptTitle: '文本框',
      layerName: '文本框',
      icon: 'text',
      hidden: false,
      opacity: 1,
      componentName: 'BText',
      setterName: 'BText-setter',
      configProps: {
        cptDataForm: {
          dataText: '{"value":"人次"}',
          dataSource: 1,
          pollTime: 0,
          apiUrl: '/sc/test',
          sql: '-- 请在此输入用来查询数据的 sql 语句\n',
          convertData:
            '(data) => {\n  // data 为图表需要的显示数据，如果数据源为接口请求，则 data 为接口返回数据\n  return data;\n};',
          convertChart:
            '(option) => {\n  // option 为图表需要的样式数据，更多详情可查看 https://echarts.apache.org/zh/option.html\n  return option;\n};'
        },
        attribute: {
          url: '',
          textColor: '#4BB344',
          textSize: 30,
          fontWeight: 'bold',
          textLineHeight: 30,
          textFamily: '微软雅黑',
          textAlign: 'center',
          textShadow: false,
          offsetX: 0,
          offsetY: 0,
          blurRadius: 0,
          textShadowColor: '#000',
          fontStyle: 'italic',
          textDecoration: 'none',
          bgColor: 'rgba(255, 255, 255, 0)'
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 1190,
      cptY: 188,
      cptZ: 16,
      cptWidth: 150,
      cptHeight: 40,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: '0a3103d0-4bf1-11ee-933c-97ee7ca409bc',
      cptTitle: '边框',
      layerName: '边框',
      icon: 'border',
      hidden: false,
      opacity: 1,
      componentName: 'Border',
      setterName: 'Border-setter',
      configProps: {
        attribute: {
          borderType: 'dv-border-box-1',
          borderColor1: '#409eff',
          borderColor2: '#00CED1',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderTitle: '标题1',
          titleWidth: 250,
          dur: 3,
          reverse: false
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 1348,
      cptY: 777,
      cptZ: 5,
      cptWidth: 566,
      cptHeight: 294,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: '0d0de500-4bf1-11ee-933c-97ee7ca409bc',
      cptTitle: '边框',
      layerName: '边框',
      icon: 'border',
      hidden: false,
      opacity: 1,
      componentName: 'Border',
      setterName: 'Border-setter',
      configProps: {
        attribute: {
          borderType: 'dv-border-box-1',
          borderColor1: '#409eff',
          borderColor2: '#00CED1',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderTitle: '标题1',
          titleWidth: 250,
          dur: 3,
          reverse: false
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 1348,
      cptY: 445,
      cptZ: 5,
      cptWidth: 566,
      cptHeight: 294,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: '0ec81820-4bf1-11ee-933c-97ee7ca409bc',
      cptTitle: '边框',
      layerName: '边框',
      icon: 'border',
      hidden: false,
      opacity: 1,
      componentName: 'Border',
      setterName: 'Border-setter',
      configProps: {
        attribute: {
          borderType: 'dv-border-box-1',
          borderColor1: '#409eff',
          borderColor2: '#00CED1',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderTitle: '标题1',
          titleWidth: 250,
          dur: 3,
          reverse: false
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 1348,
      cptY: 133,
      cptZ: 5,
      cptWidth: 566,
      cptHeight: 294,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: '5b593ac0-4bf1-11ee-933c-97ee7ca409bc',
      cptTitle: '玫瑰饼图',
      layerName: '玫瑰饼图',
      icon: 'pie',
      hidden: false,
      opacity: 1,
      componentName: 'Pie',
      setterName: 'Pie-setter',
      configProps: {
        attribute: {
          theme: 'light',
          chartTitle: '出行人员年龄分布',
          titleX: 40,
          titleY: 20,
          titleTextColor: '#ccc',
          subtext: '',
          subtextColor: '#aaa',
          titleFontSize: 18,
          orient: 'horizontal',
          legendTextColor: '#ddd',
          legendX: 'center',
          legendY: 'bottom',
          borderRadius: 0,
          radiusInside: 0,
          radiusOutside: 60,
          roseType: 'radius',
          legendShow: true,
          labelFontSize: 13,
          labelColor: '#ddd',
          legendFontSize: 12,
          labelPosition: 'outside',
          pieColor: ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#5470c6', '#ff8c71']
        },
        cptDataForm: {
          dataText:
            '[{"value":1048,"name":"18岁一下"},{"value":735,"name":" 18-35岁"},{"value":580,"name":" 35-50岁"},{"value":484,"name":" 50岁以上"}]',
          dataSource: 1,
          pollTime: 0,
          apiUrl: '/sc/test',
          sql: '-- 请在此输入用来查询数据的 sql 语句\n',
          convertData:
            '(data) => {\n  // data 为图表需要的显示数据，如果数据源为接口请求，则 data 为接口返回数据\n  return data;\n};',
          convertChart:
            '(option) => {\n  // option 为图表需要的样式数据，更多详情可查看 https://echarts.apache.org/zh/option.html\n  return option;\n};'
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 106,
      cptY: 778,
      cptZ: 18,
      cptWidth: 380,
      cptHeight: 290,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: '89fece20-4c56-11ee-a3dc-71f76a1515c4',
      cptTitle: '轮播图',
      layerName: '轮播图',
      icon: 'carousel',
      hidden: false,
      opacity: 1,
      componentName: 'Carousel',
      setterName: 'Carousel-setter',
      configProps: {
        attribute: {
          trigger: 'hover',
          autoplay: true,
          interval: 3000,
          arrow: 'hover',
          carouseltype: 'default',
          direction: 'horizontal',
          fit: 'contain',
          isPreviewable: true,
          imgUrls: [
            '/static/img/249.2cc27c31.png',
            '/static/img/20.5b148da1.png',
            '/static/img/257.9c970cc4.png',
            '/static/img/252.067475ed.png'
          ]
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 1367,
      cptY: 148,
      cptZ: 18,
      cptWidth: 517,
      cptHeight: 258,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: 'data-cards-1',
      cptTitle: '数据卡片',
      layerName: '数据卡片',
      icon: 'num',
      hidden: false,
      opacity: 1,
      componentName: 'DataCards',
      setterName: 'DataCards-setter',
      configProps: {
        attribute: {
          layout: 'horizontal',
          items: [
            { title: '总销售额', value: '¥9,280,105', ratio: '+15.2%', icon: 'money' },
            { title: '总资产', value: '¥152,380,000', ratio: '+8.7%', icon: 'assets' },
            { title: '总负债', value: '¥58,925,000', ratio: '-3.2%', icon: 'debt' }
          ],
          backgroundColor: 'rgba(12, 26, 60, 0.7)',
          borderColor: '#1D2C5E',
          valueColor: '#ffffff',
          titleColor: '#a0c4ff'
        },
        cptDataForm: {
          dataSource: 1,
          pollTime: 0,
          dataText:
            '{"items":[{"title":"总销售额","value":"¥9,280,105","ratio":"+15.2%"},{"title":"总资产","value":"¥152,380,000","ratio":"+8.7%"},{"title":"总负债","value":"¥58,925,000","ratio":"-3.2%"}]}'
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 100,
      cptY: 500,
      cptZ: 10,
      cptWidth: 600,
      cptHeight: 150,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: 'map-visualization-template',
      cptTitle: '地图可视化模板',
      layerName: '地图可视化模板',
      icon: 'map',
      hidden: false,
      opacity: 1,
      componentName: 'MapVisualizationTemplate',
      setterName: 'MapVisualizationTemplate-setter',
      configProps: {
        attribute: {
          title: '物流网络图',
          showTitle: true,
          titleHeight: 40,
          titleColor: '#a0c4ff',
          mapType: 'MapMigrate',
          backgroundColor: 'rgba(12, 26, 60, 0.2)',
          borderColor: '#1D2C5E',
          mapConfig: {
            titleText: '物流网络图',
            subtext: '模拟数据',
            seriesName: '物流线路',
            seriesColor: '#409eff',
            roam: false,
            titleLeft: 'center',
            titleTop: 10,
            period: 6,
            symbol: 'diamond',
            effectColor: '#fff',
            lineWidth: 0,
            symbolSize: 6,
            curveness: 0.2,
            titleFontSize: 20,
            titleColor: '#ccc',
            subTitleColor: '#aaa',
            subTitleFontSize: 13
          }
        },
        cptDataForm: {
          dataSource: 1,
          pollTime: 0,
          dataText:
            '{"start":[116.4551,40.2539],"end":[{"name":"上海","value":95},{"name":"广州","value":90},{"name":"深圳","value":85},{"name":"杭州","value":80},{"name":"武汉","value":70},{"name":"成都","value":75},{"name":"重庆","value":65},{"name":"西安","value":60},{"name":"哈尔滨","value":50},{"name":"乌鲁木齐","value":100}]}'
        },
        animation: {
          name: 'fadeInRight',
          delay: 'animate__delay-0.4s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 1270,
      cptY: 310,
      cptZ: 12,
      cptWidth: 600,
      cptHeight: 360,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: 'table-001',
      cptTitle: '表格',
      layerName: '区域物流排行榜',
      icon: 'table',
      hidden: false,
      opacity: 1,
      componentName: 'TableComponent',
      setterName: 'TableComponent-setter',
      configProps: {
        attribute: {
          title: '区域物流量排行',
          showTitle: true,
          titleHeight: 40,
          columns: [
            { label: '排名', prop: 'rank' },
            { label: '地区', prop: 'region' },
            { label: '运单量', prop: 'orders' },
            { label: '同比增长', prop: 'growth' }
          ],
          data: [
            { rank: 1, region: '华东', orders: '4,562', growth: '12.5%' },
            { rank: 2, region: '华南', orders: '3,897', growth: '8.3%' },
            { rank: 3, region: '华北', orders: '3,245', growth: '10.2%' },
            { rank: 4, region: '西南', orders: '2,876', growth: '15.7%' },
            { rank: 5, region: '中南', orders: '2,583', growth: '5.8%' },
            { rank: 6, region: '西北', orders: '1,976', growth: '-2.3%' },
            { rank: 7, region: '东北', orders: '1,543', growth: '3.1%' },
            { rank: 8, region: '华中', orders: '1,278', growth: '7.6%' }
          ],
          backgroundColor: 'rgba(12, 28, 73, 0.7)',
          borderColor: '#1d2c5e',
          textColor: '#a4dbff',
          headerColor: '#ffffff',
          headerBgColor: 'rgba(19, 30, 58, 0.7)'
        },
        cptDataForm: {
          dataSource: 1,
          pollTime: 0,
          dataText:
            '{"columns":[{"label":"排名","prop":"rank"},{"label":"地区","prop":"region"},{"label":"运单量","prop":"orders"},{"label":"同比增长","prop":"growth"}],"data":[{"rank":1,"region":"华东","orders":"4,562","growth":"12.5%"},{"rank":2,"region":"华南","orders":"3,897","growth":"8.3%"},{"rank":3,"region":"华北","orders":"3,245","growth":"10.2%"},{"rank":4,"region":"西南","orders":"2,876","growth":"15.7%"},{"rank":5,"region":"中南","orders":"2,583","growth":"5.8%"},{"rank":6,"region":"西北","orders":"1,976","growth":"-2.3%"},{"rank":7,"region":"东北","orders":"1,543","growth":"3.1%"},{"rank":8,"region":"华中","orders":"1,278","growth":"7.6%"}]}'
        },
        animation: {
          name: 'fadeInRight',
          delay: 'animate__delay-0.6s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 100,
      cptY: 690,
      cptZ: 12,
      cptWidth: 1100,
      cptHeight: 300,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: 'chart-002',
      cptTitle: '饼图',
      layerName: '物流类型分布图',
      icon: 'pie',
      hidden: false,
      opacity: 1,
      componentName: 'PieChart',
      setterName: 'PieChart-setter',
      configProps: {
        attribute: {
          title: '物流类型分布',
          showTitle: true,
          titleHeight: 40,
          titleColor: '#a0c4ff',
          backgroundColor: 'rgba(12, 28, 73, 0.7)',
          borderColor: '#1d2c5e',
          textColor: '#ffffff',
          series: [
            {
              name: '物流类型',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['40%', '50%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#051536',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '18',
                  fontWeight: 'bold',
                  color: '#ffffff'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 35, name: '公路运输' },
                { value: 25, name: '铁路运输' },
                { value: 20, name: '航空运输' },
                { value: 15, name: '水路运输' },
                { value: 5, name: '其他方式' }
              ]
            }
          ]
        },
        cptDataForm: {
          dataSource: 1,
          pollTime: 0,
          dataText:
            '[{"value":35,"name":"公路运输"},{"value":25,"name":"铁路运输"},{"value":20,"name":"航空运输"},{"value":15,"name":"水路运输"},{"value":5,"name":"其他方式"}]'
        },
        animation: {
          name: 'fadeInRight',
          delay: 'animate__delay-0.8s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX: 1270,
      cptY: 690,
      cptZ: 12,
      cptWidth: 600,
      cptHeight: 300,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    }
  ],
  previewScaleType: 'scrollY'
}
