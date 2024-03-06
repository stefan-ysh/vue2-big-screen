<template>
  <div style="display: flex; align-items: center; flex-direction: column; padding: 10px">
    <h1 style="margin: 10px 0">大屏列表</h1>
    <el-table :data="bigscreenList" border style="width: 90%">
      <el-table-column prop="name" label="标题"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column prop="prop" label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
            plain
            icon="el-icon-edit-outline"
            type="primary"
            @click="editBigscreen(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            :type="isPublished(scope.row.isPublished) ? 'danger' : 'default'"
            plain
            :icon="!isPublished(scope.row.isPublished) ? 'el-icon-microphone' : 'el-icon-turn-off-microphone'"
            @click="changeBigscreenStatus(scope.row.id, scope.row.isPublished)"
          >
            <span v-show="isPublished(scope.row.isPublished)">取消</span>
            发布</el-button
          >
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="delBigscreen(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      bigscreenList: [
        {
          id: 'c32ionc2oi3rnc2',
          name: '双十一成交量数据监控大屏',
          isPublished: true,
          createTime: '2022-11-01'
        },
        {
          id: 'crmp239crm203jcm',
          name: '春运客流量监控大屏',
          isPublished: false,
          createTime: '2023-01-18'
        }
      ]
    }
  },
  methods: {
    editBigscreen(id) {
      console.log('[ 编辑大屏 ] >', id)
      this.$router.push({
        name: 'BigScreenDesign'
      })
    },
    delBigscreen(id) {
      console.log('[ 删除大屏 ] >', id)
    },
    changeBigscreenStatus(id, status) {
      if (status) {
        console.log('[ 取消发布大屏 ] >', id, status)
      } else {
        console.log('[ 发布大屏 ] >', id, status)
      }
    },
    isPublished(boolean) {
      return boolean
    }
  }
}
</script>

<style></style>
