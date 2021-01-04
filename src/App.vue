<template>
  <div id="app">
    <ComTable
      :tableData="tableData"
      :tableOption="tableOption"
      :tablePage="tablePage"
    >
      <template slot="tailEdit" slot-scope="scope">
        <span style="color: #409eff; margin-left: 10px">{{
          scope.row.age
        }}</span>
      </template>
      <template slot="custom" slot-scope="scope">
        <span
          style="
            display: inline-block;
            color: #ffffff;
            border: 1px solid #f56c6c;
            background: #f56c6c;
            border-radius: 5px;
            padding: 5px 10px;
          "
          >{{ scope.row.custom }}</span
        >
      </template>
    </ComTable>

  </div>
</template>

<script>
import ComTable from "./components/table.vue";

export default {
  name: "App",
  components: {
    ComTable
  },
  data() {
    return {
      tableOption: {
        addBtn: true,
        group: [
          {
            label: "序号",
            type: "selection",
            prop: "selection"
          },
          {
            label: "姓名",
            type: "text",
            prop: "name"
          },
          {
            label: "年龄",
            type: "text",
            prop: "age"
          },
          {
            label: "性别",
            type: "text",
            prop: "sex"
          },
          {
            label: "自定义",
            type: "customSlot",
            prop: "custom"
          },
          {
            label: "操作",
            type: "operation",
            prop: "operation"
          }
        ]
      },
      tableData: [
        {
          name: "张三",
          sex: "男",
          age: "23",
          custom: "自定义"
        },
        {
          name: "李四",
          sex: "女",
          age: "19",
          custom: "自定义"
        },
        {
          name: "王二",
          sex: "男",
          age: "43",
          custom: "自定义"
        }
      ],
      tablePage: {}
    };
  },
  created() {
    // console.log(test)
  }
};
</script>

<style lang="scss"></style>
