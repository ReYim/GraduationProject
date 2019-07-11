<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="form.studentname"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.studentpass" type="password"/>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.major"/>
      </el-form-item>      
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="性别">
          <el-option label="男" value="0" />
          <el-option label="女" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="后续用到">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="后续用到">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="1" name="type" />
          <el-checkbox label="2" name="type" />
          <el-checkbox label="3" name="type" />
          <el-checkbox label="4" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="后续用到">
        <el-radio-group v-model="form.resource">
          <el-radio label="是" />
          <el-radio label="否" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        studentname: '',
        studentpass: '',
        major:'',
        sex: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store
      .dispatch("admin/add_student",this.form)
      .then(() => {
          this.form.studentname = "";
          this.form.studentpass = "";
          this.form.major = "";
          this.form.sex = "";
      }

      )
      console.log('提交成功!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.el-input{
    width: 300px;
}
</style>

