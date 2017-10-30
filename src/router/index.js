import Vue from 'vue'
import Router from 'vue-router'
import bottomNav from '@/components/common/bottomNav'
import shelf from '@/components/common/shelf'
import Home from '@/components/home/home'
import search from '@/components/search/search'
import historyHot from '@/components/search/historyHot'
import searchResult from '@/components/search/searchResult'
import searchBookList from '@/components/search/searchBookList'
import category from '@/components/category/category'
import categoryBook from '@/components/common/categoryBook'
import Book from '@/components/bookInfo/book'
import readBook from '@/components/readBook/readBook'
import male from '@/components/common/male'
import female from '@/components/common/female'
import publishing from '@/components/common/publishing'

import test from '@/components/test/bookFooter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/bottomNav',
      component:bottomNav
    },
    {
      path:'/test',
      component:test
    },
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/shelf',
      component:shelf
    },
    {
      path:'/search',
      component:search,
      children:[
        {
          path:'/search/',
          component:historyHot
        },
        {
          path:'/search/searchResult',
          component:searchResult
        },
        {
          path:'/search/searchBookList',
          component:searchBookList
        }
      ]
    },
    {
      path:'/category',
      component:category
    },
    {
      path:'/categoryBook',
      name:'categoryBook',
      component:categoryBook
    },
    {
      path:'/book/:book_id',
      name:'book',
      component:Book
    },
    {
      path:'/readBook/:book_id',
      name:'readBook',
      component:readBook
    },
    {
      path:'/male',
      component:male
    },
    {
      path:'/female',
      component:female
    },
    {
      path:'/publishing',
      component:publishing
    }
  ]
})
