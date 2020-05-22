const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "defaultLayout" */ '@/layouts/default'),
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "homePage" */ '@/views/home')
            }
        ]
    }
]

export default routes
