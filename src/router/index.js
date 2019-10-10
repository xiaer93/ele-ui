import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const _import = (name) => () => import(`../page/${name}.vue`)

const route = new VueRouter({
    routes: [
        {
            name: 'layout',
            path: '/layout',
            component: _import('layout')
        },
        {
            name: 'container',
            path: '/container',
            component: _import('container')
        },
        {
            name: 'button',
            path: '/button',
            component: _import('button')
        },
        {
            name: 'link',
            path: '/link',
            component: _import('link')
        },
        {
            name: 'radio',
            path: '/radio',
            component: _import('radio')
        },
        {
            name: 'checkbox',
            path: '/checkbox',
            component: _import('checkbox')
        },
        {
            name: 'input',
            path: '/input',
            component: _import('input')
        }
    ]
})

export default route