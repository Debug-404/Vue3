<template>
  <div class="myFun">
    <el-input v-model="inputData" placeholder="名字查找" style="width: 200px" @input="selStudent"/>
    <el-button type="primary" @click="addStu">添加学生</el-button>
  </div>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column fixed label="学号" prop="id" width="150"/>
    <el-table-column label="姓名" prop="name" width="120"/>
    <el-table-column label="性别" prop="sex" width="120"/>
    <el-table-column label="年龄" prop="age" width="120"/>
    <el-table-column label="家庭住址" prop="address"/>
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <el-button size="small" type="primary" @click="changeDialog(scope.row, scope.$index)">
          编辑
        </el-button>
        <el-button size="small" type="danger" @click="delStudent(scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--  对话框-->
  <div>
    <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? '新增' : '编辑'" draggable width="500px">
      <el-form ref="ruleFormRef" :model="form" :rules="rules">
        <el-form-item :label-width="60" label="学号" prop="id">
          <el-input v-model="form.id" :disabled="prohibit" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="60" label="姓名" prop="name">
          <el-input v-model="form.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="60" label="性别" prop="sex">
          <el-input v-model="form.sex" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="60" label="年龄" prop="age">
          <el-input v-model="form.age" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="60" label="住址" prop="address">
          <el-input v-model="form.address" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="" @click="dialogFormVisible = false; form = {};">取消</el-button>
          <el-button type="primary" @click="tableConfig">{{
              dialogType === "add" ? "确认添加" : "确认修改"
            }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {onBeforeMount, ref} from "vue";
import {ElNotification} from "element-plus";
import {addStudent, datalist, deleteStudent, modifyData} from "../utils/http.js";

let inputData = ref(""); //输入框
let tableData = ref();
let tableDataCopy = [];
let dialogFormVisible = ref(false); //是否显示对话框
let form = ref({}); //临时数据
let dialogType = ref("add");
let No;
let prohibit = ref(true)
let ruleFormRef = ref()
//编辑
const changeDialog = (row, index) => {
  dialogFormVisible.value = true;
  prohibit.value = true;
  dialogType.value = "edit";
  form.value = {...row};
  No = index;
};
//axios+钩子函数 加载数据
onBeforeMount(() => {
  datalist()
      .then((res) => {
        tableData.value = res["data"];
        tableDataCopy = res["data"];
      })
      .catch((err) => {
        console.log(err);
      });
});


//要添加信息的验证规则
const rules = {
  id: [
    {required: true, message: "学号不能为空", trigger: "blur"},
    {min: 4, max: 4, message: "学号为4位", trigger: "blur"},
    {
      validator: (rule, value, callback) => {
        if (tableData.value.find(function (val) {
          return val.id === value
        })) {
          callback(new Error("学号已存在"));
        } else {
          callback()
        }
      }, trigger: "blur", required: true,
    }
  ],
  name: [
    {required: true, message: "名字不能为空", trigger: "blur"}
  ],
  sex: [
    {required: true, message: "性别不能为空", trigger: "blur"}
  ],
  age: [
    {required: true, message: "性别不能为空", trigger: "blur"},
    {
      validator: (rule, value, callback) => {
        if (Number(value) < 0 || Number(value) > 100) {
          callback(new Error("您的年龄有点问题"))
        } else {
          callback()
        }
      }, trigger: "blur"
    },
  ]
}
//确认修改 and 添加信息
const tableConfig = () => {
  dialogFormVisible.value = false;
  if (dialogType.value === "add") {
    ruleFormRef.value.validate((val) => {
      if (val) {
        console.log(form.value)
        addStudent(form.value).then(() => {
          tableData.value.push(form.value);
          form.value = null;
        }).catch((err) => {
          console.log(err)
        })
      } else {
        console.log(val)
        ElNotification({
          title: "warning",
          message: "操作失败请重新确认",
          type: "warning",
        });
      }
    });
  } else {
    modifyData(form.value)
        .then((data) => {
          if (data["code"]) {
            console.log(form.value);
            tableData.value[No] = form.value;
            form.value = {};
          }
        })
        .catch((err) => {
          console.log(err);
          form.value = {};
        });
  }
};
//激活 添加信息对话框
const addStu = () => {
  dialogFormVisible.value = true;
  dialogType.value = "add";
  form.value = {};
  prohibit.value = false;
};
// 删除学生信息
const delStudent = ({id}) => {
  if (confirm("是否删除")) {
    deleteStudent(id)
        .then((data) => {
          if (data["code"]) {
            let index = tableData.value.findIndex((item) => item.id === id);
            tableData.value.splice(index, 1);
          } else {
            ElNotification({
              title: "warning",
              message: "操作失败请稍后重试",
              type: "warning",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }
};

//模糊搜索
const selStudent = () => {
  if (inputData.value.length > 0) {
    tableData.value = tableData.value.filter((item) =>
        item.name.match(inputData.value)
    );
  } else {
    tableData.value = tableDataCopy;
  }
};
</script>
<style>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.myFun {
  display: flex;
  justify-content: space-between;
}
</style>
