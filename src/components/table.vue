<template>
  <div class="table">
    <div class="top-btn">
      <div class="btn-left">
        <el-button
          v-if="option.addBtn"
          type="primary"
          :size="option.addBtnSize || 'small'"
          @click="add"
        >
          {{ option.addBtnText }}
        </el-button>
        <el-button
          v-if="option.delBtn"
          type="danger"
          :size="option.delBtnSize || 'small'"
          @click="remove"
        >
          {{ option.delBtnText }}
        </el-button>
        <el-button
          v-if="option.exportBtn"
          type="success"
          :size="option.exportBtnSize || 'small'"
          @click="exportfun"
        >
          {{ option.exportBtnText }}
        </el-button>
      </div>
      <div class="btn-right">
        <el-tooltip v-if="option.refreshBtn" content="刷新" placement="top">
          <el-button @click="refresh"
            ><i class="el-icon-refresh"></i
          ></el-button>
        </el-tooltip>
        <el-tooltip v-if="option.columnEditBtn" content="显隐" placement="top">
          <el-button @click="dialogFlag = true"
            ><i class="el-icon-s-operation"></i
          ></el-button>
        </el-tooltip>
      </div>
    </div>
    <el-table
      class="table-main"
      style="width: 100%"
      :data="tableData"
      :tooltip-effect="option.tooltipEffect"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="option.group.map(item => item.type).indexOf('selection') !== -1"
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        v-for="item in option.group.filter(item => item.type !== 'selection')"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth ? item.minWidth : '120'"
        :width="item.width"
      >
        <template slot-scope="scope">
          <div v-if="item.type === 'operation'">
            <el-button
              v-if="option.rowViewBtn"
              @click="handleView(scope.row)"
              type="text"
              size="small"
              >查看</el-button
            >
            <el-button
              v-if="option.rowEditBtn"
              @click="handleEdit(scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              v-if="option.rowDeleteBtn"
              @click="handleDelete(scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
            <slot name="tailEdit" :row="scope.row"></slot>
          </div>
          <div v-if="item.type === 'text'">
            {{ scope.row[item.prop] }}
          </div>
          <div v-if="item.type === 'customSlot'">
            <slot
              style="margin-left: 20px"
              :name="item.prop"
              :row="scope.row"
            ></slot>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="table-page"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="pageInfo.currentPage"
      :page-sizes="pageInfo.pageSizes"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <el-dialog title="展示列" :visible.sync="dialogFlag" width="30%">
      <div>
        <el-checkbox-group @change="showItemColumn" v-model="selectColumns">
          <el-checkbox
            v-for="item in defaultColumns"
            :key="item.label"
            :label="item.label"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFlag = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      dialogFlag: false,
      selectColumns: [],
      defaultColumns: [],
      defaultTableOption: {
        addBtn: true,
        addBtnText: "新增",
        delBtn: false,
        delBtnText: "删除",
        exportBtn: true,
        exportBtnText: "导出",
        tooltipEffect: "dark",
        refreshBtn: true,
        columnEditBtn: true,
        rowViewBtn: true,
        rowEditBtn: true,
        rowDeleteBtn: true,
        group: []
      },
      defaultTablePage: {
        total: 0,
        currentPage: 0,
        pageSize: 0,
        pageSizes: [10, 20, 50, 100]
      }
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableOption: {
      type: Object,
      default: () => {}
    },
    tablePage: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    option() {
      return Object.assign(this.defaultTableOption, this.tableOption);
    },
    pageInfo() {
      return Object.assign(this.defaultTablePage, this.tablePage);
    }
  },
  created() {
    console.log(this.tableOption);
    this.selectColumns = this.option.group.map(item => item.label);
    console.log(this.selectColumns);
    this.defaultColumns = JSON.parse(JSON.stringify(this.option.group));
  },
  methods: {
    add() {
      this.$emit("add");
    },
    remove() {
      this.$emit("remove");
    },
    exportfun() {
      this.$emit("exportfun");
    },
    handleSizeChange() {
      this.$emit("handleSizeChange");
    },
    handleCurrentChange() {
      this.$emit("handleCurrentChange");
    },
    handleView(row) {
      console.log(row);
      this.$emit("handleRowView");
    },
    handleEdit(row) {
      console.log(row);
      this.$emit("handleRowEdit");
    },
    handleDelete(row) {
      console.log(row);
      this.$emit("handleRowDelete");
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    refresh() {
      this.$emit("refresh");
    },
    showItemColumn(e) {
      // this.$nextTick(() => {
      //   this.option.group = this.defaultColumns.filter(item => e.indexOf(item.label) !== -1)
      // })
      this.option.group = this.defaultColumns.filter(
        item => e.indexOf(item.label) !== -1
      );
    }
  }
};
</script>

<style scoped lang="scss">
.table {
  .top-btn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .btn-left {
      display: flex;
    }
    .btn-right {
      .el-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        padding: 0;
      }
    }
  }
  .table-main {
    margin-bottom: 20px;
  }
  .table-page {
    text-align: right;
  }

  .el-table {
    width: 99.9%;
  }
  .el-table .cell {
    height: 20px !important;
  }
}
</style>
