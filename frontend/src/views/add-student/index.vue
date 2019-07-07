<template>
  <div class="login-container">
      <el-table
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="学生姓名" prop="studentname" width="350" align="center"></el-table-column>
      <el-table-column label="密码" prop="studentpass" width="250px" align="center"></el-table-column>
      <el-table-column label="性别" width="100px" align="center"></el-table-column>
      <el-table-column label="专业" width="345px" align="center"></el-table-column>

      <el-table-column label="操作" align="center" width="660" class-name="small-padding fixed-width">
        <template>
        </template>
      </el-table-column>
    </el-table>
    <div align="center">
           <router-link to="/form/index">修改</router-link>
           <router-link to="/form/index">查看</router-link>        
           <router-link to="">删除</router-link> 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableKey: 0,
      list: null
    }
  },
  methods: {
    HandleUpdate(){
    }

  }
}
</script>

