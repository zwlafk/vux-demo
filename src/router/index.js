import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import SignSuccess from '@/components/Page/SignSuccess'
import Sign from '@/components/Page/Sign'
import SignIn from '@/components/Page/SignIn'
// import WatchA from '@/components/WatchA'
// import WatchB from '@/components/WatchB'
// import WatchC from '@/components/WatchC'
import BaseInfo1 from '@/components/Form/BaseInfo1'
import BaseInfo2 from '@/components/Form/BaseInfo2'
import resumeDetails from '@/components/resumeDetails'
// import interviewFeedback from '@/components/interviewFeedback'
// import lookResume from '@/components/lookResume'
// import lookResumeNext from '@/components/lookResumeNext'
// import pointOut from '@/components/pointOut'
import Form from '@/components/Form/FormWrapper'
import Family from '@/components/Form/Family/FamilyList'
import FamilyForm from '@/components/Form/Family/FamilyForm'
import Resume from '@/components/Resume/Resume'
import HandleResume from '@/components/Resume/HandleResume'
import Feedback from '@/components/Feedback/Feedback'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'sign', component: Sign },
    { path: '/signin', name: 'signin', component: SignIn },
    {
      path: '/signsuccess', name: 'SignSuccess', component: SignSuccess,

    },
    {
      path: '/form', name: 'form', component: Form, children: [
        { path: 'baseinfo1', component: BaseInfo1 },
        { path: 'baseinfo2', component: BaseInfo2 },
        {
          path: 'family', component: Family,
          children: [
            { path: 'add', component: FamilyForm },

          ]
        },

      ]
    },
    {
      path: '/resume/:id', name: 'resume', component: Resume, children: [
        { path: 'handle', component: HandleResume },
      ]
    },
    { path: '/feedback/:id', name: 'Feedback', component: Feedback },
    // { path: '/WatchA', name: 'WatchA', component: WatchA },
    // { path: '/WatchB', name: 'WatchB', component: WatchB },
    // { path: '/WatchC', name: 'WatchC', component: WatchC },
    { path: '/resumeDetails', name: 'resumeDetails', component: resumeDetails },
    // { path: '/interviewFeedback', name: 'interviewFeedback', component: interviewFeedback },
    // { path: '/lookResume', name: 'lookResume', component: lookResume },
    // { path: '/lookResumeNext', name: 'lookResumeNext', component: lookResumeNext },
    // { path: '/pointOut', name: 'pointOut', component: pointOut }
  ]
})
