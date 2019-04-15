import {Post} from '../utils/request.js'
export default {
  login (data) {
    return Post('/api/login', data)
  },
  reg (data) {
    return Post('/api/reg', data)
  },
  findOneUser (data) {
    return Post('/api/wx/user/findOne', data)
  },
  modifyOneUser (data) {
    return Post('/api/wx/user/modify', data)
  },
  modifyPsw (data) {
    return Post('/api/user/modifyPsw', data)
  },
  getApplyList(data) {
    return Post('/api/wx/apply/list', data)
  },
  addApply(data) {
    return Post('/api/wx/apply/save', data)
  },
  getHistoryList (data) {
    return Post('/api/history/list', data)
  },
  addHistory(data) {
    return Post('/api/history/save', data)
  },
  getCollectList(data) {
    return Post('/api/collect/list', data)
  },
  addCollect(data) {
    return Post('/api/collect/save', data)
  },
  addFeedback(data) {
    return Post('/api/feedback/save', data)
  },
  getPostList (data) {
    return Post('/api/wx/post/list', data)
  },
  filterPost(data) {
    return Post('/api/wx/post/filter', data)
  },
  findOnePost(data) {
    return Post('/api/wx/post/findOne', data)
  },
  searchPost(data) {
    return Post('/api/post/serach', data)
  },
  first(data) {
    return Post('/api/wx/post/first', data)
  }
}