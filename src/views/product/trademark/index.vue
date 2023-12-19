<template>
  <el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus" @click="addTrademark">
      添加品牌
    </el-button>
    <!-- 对话框 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item
          prop="tmName"
          label="品牌名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="trademarkParams.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="品牌Logo"
          prop="logoUrl"
          :label-width="formLabelWidth"
        >
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 表单显示商品
      table
      ---border:是否有纵向的边框
      table-column
      ---lable：某一个列表
      ---width：设置这一列的宽度
      ---align：设置这一列对齐方式
     -->
    <el-table border style="width: 100%; margin: 10px 0px" :data="trademarkArr">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称" prop="tmName" width="180" />
      <el-table-column label="品牌Logo">
        <template #="{ row, $index }">
          <img
            :src="row.logoUrl"
            style="width: 100px; height: 100px"
            alt="图片走丢啦"
          />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            icon="Edit"
            circle
            @click="updateTradeMark(row)"
          />
          <el-popconfirm
            :title="`您确定要删除${row.tmName}?`"
            width="250px"
            icon="Delete"
            @confirm="removeTradeMark(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件 -->
    <!-- 
      pagination
      ---v-model:current-page：设置当前分页器页码
      ---v-model:page-size:设置每一也展示数据条数
      ---page-sizes：每页显示个数选择器的选项设置
      ---background:背景颜色
      ---layout：分页器6个子组件布局的调整 "->"把后面的子组件顶到右侧
     -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="getHasTrademark"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout=" prev, pager, next, jumper,->,total, sizes,"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import { TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
//引入组合式API函数
import { ref, reactive, onMounted, nextTick } from 'vue'
let dialogFormVisible = ref(false)
const formLabelWidth = '140px'
// 获取el-from 组件实例
let formRef = ref()
// 校验品牌名称
const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('长度必须大于等于2'))
  }
}
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('必须上传图片'))
  }
}
// 表单的校验规则
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, trigger: 'blur', validator: validatorLogoUrl }],
}
// 添加的表单数据
const trademarkParams = reactive<TradeMark>({
  tmName: '',
  // 上传图片的地址
  logoUrl: '',
})
//添加品牌按钮的回调
const addTrademark = () => {
  //对话框显示
  dialogFormVisible.value = true
  //清空收集数据 id不清除则上次修改的数据id还在,添加数据会变成修改数据
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  //清楚校验信息,第一种写法:ts的问号语法,最开始打开时可能没有value值
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
  // 第二种方法,
  /* nextTick(() => {
     formRef.value.clearValidate('tmName')
     formRef.value.clearValidate('logoUrl')
   })
   */
}
// 修改品牌
const updateTradeMark = (row: TradeMark) => {
  // 显示对话框->获取修改品牌数据
  dialogFormVisible.value = true
  // es6的写法
  Object.assign(trademarkParams, row)
  // 清楚校验信息
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}
// 删除品牌的按钮
const removeTradeMark = async (id: number) => {
  //点击确定按钮删除已有品牌请求
  let result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    //删除成功提示信息
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    //再次获取已有的品牌数据
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
// 取消按钮的逻辑
const cancel = () => {
  dialogFormVisible.value = false
}
// 确认添加商品的逻辑
const confirm = async () => {
  // 提交表单,如果成功则显示提交成功关闭对话框,反之提示错误
  //在你发请求之前,要对于整个表单进行校验
  //调用这个方法进行全部表单相校验,如果校验全部通过，在执行后面的语法
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  //添加|修改已有品牌
  if (result.code == 200) {
    //关闭对话框
    dialogFormVisible.value = false
    //弹出提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    //再次发请求获取已有全部的品牌数据
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    //添加品牌失败
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
    //关闭对话框
    dialogFormVisible.value = false
  }
}
//图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  // response :为当前上传图片post请求服务器传回的数据
  // 收集上传的图片地址,增加一个品牌的时候带给服务器
  trademarkParams.logoUrl = response.data
  // 图片上传成功,清楚对图片对应的校验结果
  formRef.value.clearValidata('logoUrl')
}
//上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF',
    })
    return false
  }
}
//当前页码
let pageNo = ref<number>(1)
//每一页展示的数据
let limit = ref<number>(3)
//存储已有品牌数据总数
let total = ref<number>(0)
//存储已有品牌的数据
let trademarkArr = ref<any>([])
//获取已有品牌的接口封装为一个函数:在任何情况下向获取数据,调用次函数即可
const getHasTrademark = async (pager = 1) => {
  //当前页码
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  // console.log(result)
  if (result.code == 200) {
    //存储已有品牌总个数
    total.value = result.data.total
    trademarkArr.value = result.data.records
    // console.log(trademarkArr)
  }
}
//这个自定义事件,分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
  //当前每一页的数据量发生变化的时候，当前页码归1
  getHasTrademark()
  console.log(123)
}
//组件挂载完毕钩子---发一次请求,获取第一页、一页三个已有品牌数据
onMounted(() => {
  getHasTrademark()
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
