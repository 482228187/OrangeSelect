<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="元数据标识"
      border
    >
      <el-table-column
        label="定义"
        align="center"
        prop="定义"
        width="280"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="元数据标识"
        align="center"
        prop="元数据标识"
        width="120"
      ></el-table-column>
      <el-table-column
        label="元数据名称"
        align="center"
        prop="元数据名称"
        width="120"
        show-overflow-tooltip
      >
        <!-- row:即为当前属性值对象 -->
        <template #="{ row, $index }">
          <el-input v-model="row.元数据名称" style="width: 100%"></el-input>
        </template>
      </el-table-column>
      <!-- row:即为当前属性值对象 -->
      <el-table-column
        label="数据类型"
        align="center"
        prop="数据类型"
        width="120"
      >
        <template #="{ row, $index }">
          <el-select
            v-model="row.数据类型"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="(item, index) in options"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="数据格式"
        align="center"
        prop="数据格式"
        width="120"
      >
        <!-- row:即为当前属性值对象 -->
        <template #="{ row, $index }">
          <el-input v-model="row.数据格式" style="width: 100%"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="允许值" align="center" prop="允许值" width="120">
        <!-- row:即为当前属性值对象 -->
        <template #="{ row, $index }">
          <el-input v-model="row.允许值" style="width: 100%"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="最大出现次数"
        align="center"
        prop="最大出现次数"
        width="120"
      >
        <template #="{ row, $index }">
          <el-select
            v-model="row.最大出现次数"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="(item, index) in times"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        align="center"
        prop="备注"
        width="220"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="元数据关系"
        align="center"
        prop="元数据关系"
        width="120"
      >
        <!-- row:即为当前属性值对象 -->
        <template #="{ row, $index }">
          <el-input v-model="row.元数据关系" style="width: 100%"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="元数据属性对应关系"
        align="center"
        prop="元数据属性对应关系"
        width="120"
      >
        <!-- row:即为当前属性值对象 -->
        <template #="{ row, $index }">
          <el-input
            v-model="row.元数据属性对应关系"
            style="width: 100%"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="约束" align="center" prop="约束" width="120">
        <template #="{ row, $index }">
          <el-select
            v-model="row.约束"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="(item, index) in constraint"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="220">
        <!-- row:即为已有的菜单对象|按钮的对象的数据 -->
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            :disabled="row.level == 4 ? true : false"
          >
            {{ row.level == 3 ? '添加' : '添加' }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            :disabled="row.level == 1 ? true : false"
          >
            编辑
          </el-button>
          <el-popconfirm :title="`你确定要删除${row.name}?`" width="260px">
            <template #reference>
              <el-button
                type="primary"
                size="small"
                :disabled="row.level == 1 ? true : false"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框组件:添加或者更新已有的菜单的数据结构 -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const times = ['1', '2', '3', '4', '5', '6']
const options = ['N', 'S', 'C']
const constraint = ['M', 'O']
const tableData = ref([
  {
    元数据标识: '1.1',
    元数据名称: '学校（机构）标识码',
    定义: '教育行政部门统一编制的全国范围内终身唯一的标识码',
    数据类型: 'C',
    数据格式: 'a10',
    允许值: 'GB/T 33782－2017，4.1',
    最大出现次数: '',
    备注: '教育行政部门统一编制的全国范围内终身唯一的标识码',
    元数据关系: '是否可以采用parentID这种记录父子关系',
    元数据属性对应关系: '',
    约束: 'M',
  },
  {
    元数据标识: '1.2',
    元数据名称: '统一社会信用代码',
    定义: '统一社会信用代码',
    数据类型: 'C',
    数据格式: 'a18',
    允许值: 'GB 32100',
    最大出现次数: '',
    备注: '统一社会信用代码由十八位阿拉伯数字或大写英文字母组成，包括第1 位登记管理部门代码、第3位~第8位登记管理机关行政区划码、第9位~ 第17主体标识码（组织机构代码）、第十八位校验码五个部分',
    元数据关系: '',
    元数据属性对应关系: '',
    约束: 'M',
  },
  {
    元数据标识: '3.1',
    元数据名称: '教职工数',
    定义: '在校全职工作，并由学校支付工资的编制或聘任制人员数',
    数据类型: 'N',
    数据格式: '空',
    允许值: '空',
    最大出现次数: '',
    备注: '在校全职工作，并由学校支付工资的编制或聘任制人员数',
    元数据关系: '',
    元数据属性对应关系: '',
    约束: 'M',
  },
  {
    元数据标识: '3.2',
    元数据名称: '教职工类别分布',
    定义: '统计教职工类别分布',
    数据类型: 'S',
    数据格式: '空',
    允许值: '空',
    最大出现次数: '',
    备注: '统计教职工类别分布，包括:专任教师、教辅人员、行政人员、工勤人员',
    元数据关系: '',
    元数据属性对应关系: '',
    约束: 'M',
    children: [
      {
        元数据标识: '3.2.1',
        元数据名称: '专任教师数',
        定义: '学校或机构的专任教师数',
        数据类型: 'N',
        数据格式: '空',
        允许值: '空',
        最大出现次数: '',
        备注: '',
        元数据关系: '',
        元数据属性对应关系: '',
        约束: 'M',
      },
      {
        元数据标识: '3.2.2',
        元数据名称: '教辅人员数',
        定义: '学校或机构的教辅人员数',
        数据类型: 'N',
        数据格式: '空',
        允许值: '空',
        最大出现次数: '',
        备注: '',
        元数据关系: '',
        元数据属性对应关系: '',
        约束: 'M',
      },
      {
        元数据标识: '3.2.3',
        元数据名称: '行政人员数',
        定义: '学校或机构的专任教师数',
        数据类型: 'N',
        数据格式: '空',
        允许值: '空',
        最大出现次数: '',
        备注: '',
        元数据关系: '',
        元数据属性对应关系: '',
        约束: 'M',
      },
      {
        元数据标识: '3.2.4',
        元数据名称: '工勤人员数',
        定义: '学校或机构的专任教师数',
        数据类型: 'N',
        数据格式: '空',
        允许值: '空',
        最大出现次数: '',
        备注: '',
        元数据关系: '',
        元数据属性对应关系: '',
        约束: 'M',
      },
    ],
  },
])
</script>
<style scoped lang="scss"></style>
