<template>
  <div class="home">
    <div v-if="loadingCategories">Loading...</div>
    <div v-else>
      <a href="#" class="link-margin" @click.prevent="getCategory('all')">All</a>
      <a href="#" class="link-margin" @click.prevent="getCategory('featured')">Featured</a>
      <a href="#" v-for="category of categories" 
        :key="category.id" 
        class="link-margin" 
        @click.prevent="getCategory(category.id)"
        >
        {{ category.name }}
      </a>
    </div>
   
    <div v-if="loadingBooks">Loading...</div>
    <div v-else>
      <div v-for="book in books" :key="book.id" class="link-margin">
        <router-link :to="`/books/${book.id}`">{{ book.title }}</router-link>
        <div>{{ book.author }}</div>
        <img :src="book.image" alt="Cover image">
      </div>
    </div>
      
  </div>
</template>

<script>
import categoriesQuery from '@/graphql/queries/Categories.gql'
import booksQuery from '@/graphql/queries/Books.gql'
import categoryQuery from '@/graphql/queries/Category.gql'
import booksFeaturedQuery from '@/graphql/queries/BooksFeatured.gql'


export default {
  name: 'Home',
  apollo:{
    categories: {
      query: categoriesQuery,
      result({data}){
        this.categories = data.categories;
      },
      watchLoading(loading){
        this.loadingCategories = loading;
      }
    },
    books: {
      query(){
        if(this.selectedCategory === 'all'){
          return booksQuery
        }else if(this.selectedCategory === 'featured'){
          return booksFeaturedQuery
        }else{
          return categoryQuery
        }
      },
      variables(){
        return {
          id: this.selectedCategory
        }
      },
      watchLoading(loading){
        this.loadingBooks = loading;
      },
      update(data){
        if(['all', 'featured'].includes(this.selectedCategory)){
          return data.books
        }else{
          return data.category.books
        }
      }
    }
  },
  data(){
    return{
      selectedCategory: 'all',
      books: [],
      loadingBooks: false,

      categories: [],
      loadingCategories: false,
    }
  },
  methods: {
    getCategory(category){
      if(category === 'all'){
        this.query = booksQuery
      }else if(category === 'featured'){
        this.query = booksFeaturedQuery
      }else{
        this.query = categoryQuery
      }

      this.selectedCategory = category
    }
  }
}
</script>
<style scoped>
  .link-margin{
    margin-right: 24px;
  }
</style>