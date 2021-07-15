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
        path: '/sheets/add',
        name: "SheetAdd",
        component: () =>
            import ('../views/sheet/SheetAdd.vue'),
        meta: {
            title: "Ajouter une fiche"
        }
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
        path: '/teachers/add',
        name: "TeacherAdd",
        component: () =>
            import ('../views/teacher/TeacherAdd.vue'),
        meta: {
            title: "Ajouter un professeur"
        }
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
    {
        path: '/lessons/add',
        name: "LessonAdd",
        component: () =>
            import ('../views/lesson/LessonAdd.vue'),
        meta: {
            title: "Ajouter un cours"
        }
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkExactActiveClass: 'active',
})

export default router