import layoutAside from '../components/home/layout-aside'
import layoutHeader from '../components/home/layout-header'
import breadCrumb from '../components/common/breadcrumb'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import coverImage from '../components/public/cover-image'
import selectImage from '../components/public/select-image'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-Editor', quillEditor)
    Vue.component('cover-image', coverImage)
    Vue.component('select-image', selectImage)
  }
}
