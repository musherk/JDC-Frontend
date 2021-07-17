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
        path: '/sheets/edit/:id',
        name: "SheetEdit",
        component: () =>
            import ('../views/sheet/SheetEdit.vue'),
        meta: {
            title: "Editer une fiche"
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
        path: '/teachers/edit/:id',
        name: "TeacherEdit",
        component: () =>
            import ('../views/teacher/TeacherEdit.vue'),
        meta: {
            title: "Editer un professeur"
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
    {
        path: '/lessons/edit/:id',
        name: "LessonEdit",
        component: () =>
            import ('../views/lesson/LessonEdit.vue'),
        meta: {
            title: "Editer un cours"
        }
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkExactActiveClass: 'active',
})

export default router