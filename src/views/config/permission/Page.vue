<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades">权限元数据管理</i>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="handlingAdd"
          >新增</el-button
        >
        <el-input
          v-model="query.tenantId"
          placeholder="接口URl"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @row-click="look"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="tenantId" label="接口URl"></el-table-column>
        <el-table-column label="请求方法">
          <template #default="scope">
                  <el-tag>{{scope.row.method}}</el-tag>
          </template>
        </el-table-column>
         <el-table-column label="权限标识列表" show-overflow-tooltip = "true">
            <template #default="scope">
                  <el-tag v-for="permi in (scope.row.permis ? scope.row.permis.split(',') : [])" :key="permi" >{{permi}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          prop="logical"
          label="逻辑类型"
          :formatter="formatterLogical"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="permiModel"
          label="权限模式"
          :formatter="formatterPermiModel"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTm"
          :formatter="formatterDate"
          label="创建时间"
        ></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click.stop="handleEdit(scope.$index, scope.row)"
              >模版式新增</el-button
            >
            <el-button
              type="text"
              icon="el-icon-edit"
              @click.stop="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click.stop="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ca from "../../../api/ConfigApi";
export default {
  name: "user",
  data() {
    return {
      query: {
        tenantId: "", //租户id
        pageNo: 1,
        pageSize: 10,
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
    };
  },
  created() {
    this.handleSearch();
  },
  methods: {
    getData() {
      ca.globalPage(this.query).then((page) => {
        if (page) {
          console.log(page);
          this.tableData = page.list;
          this.pageTotal = page.total || 50;
        }
      });
    },
    //新增操作
    handlingAdd() {
      this.$router.push({
        name:"globalMetadata-addOrUpdate",
        path:" /globalMetadata/addOrUpdate",
        params:{action:1}
      });
    },
    // 编辑操作
    handleEdit(index, row) {
      this.$router.push({
        name:"globalMetadata-addOrUpdate",
        path:" /globalMetadata/addOrUpdate",
        params:{action:2,id:row.id}
      });
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          ca.deleteGlobal(row.id).then(() => {
            this.$message.success("删除成功");
            //刷新列表
            this.handleSearch();
          });
        })
        .catch(() => {});
    },
    //查看
    look(row) {
      this.$router.push({
        name:"globalMetadata-addOrUpdate",
        path:" /globalMetadata/addOrUpdate",
        params:{action:3,id:row.id}
      });
    },
    // 触发搜索按钮
    handleSearch() {
      this.query.pageNo = 1;
      this.getData();
    },
    // 分页导航
    handlePageChange(val) {
      this.query.pageNo = val;
      this.getData();
    },
    /**
     * 格式化相关
     */
    formatterDate(row, column, cellValue) {
      if (!cellValue) {
        return cellValue;
      }
      return this.dayutil(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    formatterStatus(row, column, cellValue) {
      return cellValue === 1 ? "开启" : "关闭";
    },
  },
  inject: ["dayutil"],
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
