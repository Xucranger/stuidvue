import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Face/Start'
import Scanface from '@/components/Scanface'
import Scan from '@/components/Face/Scan'
import Conf from '@/components/Face/Conf'
import Running from '@/components/Face/Running'
import Success from '@/components/Face/Success'
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/start',
      name: 'Start',
      component: Start
    },
    {
      path: '/scanface',
      name: 'Scanface',
      component: Scanface,
      children:[
        {
          path: 'scan',
          name: 'Scan',
          component: Scan,
        },
        {
          path: 'conf',
          name: 'Conf',
          component: Conf,
        },
        {
          path: 'running',
          name: 'Running',
          component: Running,
        },
        {
          path: 'success',
          name: 'Success',
          component: Success,
        }
      ]
    },
  ]
})
