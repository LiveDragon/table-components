/*
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2020-12-31 10:41:54
 * @LastEditors: longyunfei
 * @LastEditTime: 2021-01-04 17:42:53
 */
// const ele = <div>测试内容</div>
// const divEle = {
//     name: 'divEle',
//     render(h) {
//         return h('div',{}, 2)
//     }
// }
// const clickDiv= function () {
//     console.log('----------------')
// }
export default {
  name: 'test',
  data() {
    return {
      ele: '<div>测试内容</div>',
      tableGroup: [
        {
          label: '序号',
          type: 'selection',
          prop: 'selection'
        },
        {
          label: '项目名称',
          type: 'text',
          prop: 'equipmentName'
        },
        {
          label: '设备编码',
          type: 'text',
          prop: 'equipmentCode'
        }

      ],
      tableData: [
        {
          equipmentName: '测试名称',
          equipmentCode: '测试编码',
          equipmentCodedd: '9',
          test1: '测试1',
          test2: '测试2',
        },
        {
          equipmentName: '测试名称',
          equipmentCode: '测试编码',
          test2: '测试2',
        },
        {
          equipmentName: '测试名称',
          equipmentCode: '测试编码',
          // test2: '测试2',
        }
      ],
    }
  },
  props: {
    Val: {
      type: String,
      default: () => 'ccc'
    },
    showFlag: {
      type: Boolean,
      default: () => true
    }
  },
  methods: {
    clickDiv() {
      console.log('----------------')
    }
  },
  render(h) {
    return h(
      'el-table',
      { style: { width: '100%' }, props: { data: this.tableData } },
      this.tableGroup.map(item => {
        return h('el-table-column', { props: { prop: item.prop, label: item.label } })
      })
    );


    // return h('div',{ on: { click : this.clickDiv}, domProps: {  innerHTML: "<p>i am a p</p>", innerText: '0000000' }, style: { color: 'red' }}, null);
    // let child = []
    // if(this.showFlag) {
    //     child = [
    //         h('div', this.ele),
    //         h('div', 333),
    //         h('div', 222),
    //     ]
    // } else {
    //     child = [
    //         h('div', this.ele),
    //         h('div', 222),
    //     ]
    // }
    // return h('div',child);

    // return h('div',[h('div', this.ele), this.showFlag && h('div', 333), h('div', {domPropsInnerHTML: '<p>i am a p</p>'}, null),]);


    // return h('ul', [1,2,3].map(function (item,index) {
    //     return h('a',{
    //       domProps:{
    //         href: item,
    //         target: '_black'
    //       },
    //       style: {
    //         marginRight: '5px'
    //       }
    //     }, '文件'+parseInt(index+1))
    //   }))

  }
}