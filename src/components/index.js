import layoutAside from '../components/home/layout-aside'
import layoutHeader from '../components/home/layout-header'
import breadCrumb from '../components/common/breadcrumb'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
