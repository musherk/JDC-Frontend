import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/sheets',
        name: 'Sheet',
        meta: {
            title: "Journal"
        },
        component: () =>
            import ('../views/sheet/SheetList.vue')
    },
    {
        path: '/teachers',
        name: 'Teacher',
        meta: {
            title: "Professeurs"
        },
        component: () =>
            import ('../views/teacher/TeacherList.vue')
    },
    {
        path: '/lessons',
        name: 'Lesson',
        meta: {
            title: "Cours"
        },
        component: () =>
            import ('../views/lesson/LessonList.vue')
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkExactActiveClass: 'active',
})

export default router