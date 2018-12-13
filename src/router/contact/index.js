import contactWrapper from '@/view/contact/contactWrapper'
import contact from '@/view/contact/contact'
import contactForm from '@/view/contact/contactForm'
import contactDetail from '@/view/contact/contactDetail'
import contactExtra from '@/view/contact/contactExtra'

export default [
  {
    path: '/contact/:rciId?', component: contactWrapper,
    children: [
      { path: '', name: 'contact', component: contact , beforeEnter: (to, from, next) => {
        document.title = "联系人"
        next()
      }},
      { path: 'edit/:tscidId?', name: 'contactEdit', component: contactForm },
      { path: 'detail/:tscidId', name: 'contactDetail', component: contactDetail },
      { path: 'contactExtra', name: 'contactExtra', component: contactExtra },
    ]
  },

]
