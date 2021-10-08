<template>
  <div class="home">

    <div class="hero bg-gray-100 mb-24">
      <div class="container mx-auto px-4 py-10 flex items-center justify-between">
        <div>
          <h1 class="font-bold">Book recommendation site built with GraphQL</h1>
          <p>Built with Laravel, Vue and Tailwind</p>
          <div class="flex items-center mt-4">
            <a href="#" class="border border-purple-600 border-solid bg-purple-600 text-white rounded p-4 mr-4 hover:bg-purple-700">
              View Books
            </a>
            <a href="#" class="border border-purple-600 border-solid rounded p-4 text-purple-600 hover:bg-purple-600 hover:text-white">
              View Screencasts
            </a>
          </div>
        </div>
        <figure>
          <img src="../assets/hero.svg" alt="hero">
        </figure>
      </div>
    </div>

    <section class="container mx-auto px-4 flex min-h-screen">
      <div class="flex flex-col pr-4">
        <template v-if="loadingCategories">
          <div>Loading...</div>
        </template>
        <template v-else>
          <a href="#" class="link-margin" @click.prevent="getCategory('all')">All</a>
          <a href="#" class="link-margin" @click.prevent="getCategory('featured')">Featured</a>
          <a href="#" v-for="category of categories" 
            :key="category.id" 
            class="link-margin" 
            @click.prevent="getCategory(category.id)"
            >
            {{ category.name }}
          </a>
        </template>
      </div>
    
      <div class="books grid grid-cols-3 gap-6 w-full">
        <template v-if="loadingBooks">
          <div>Loading...</div>
        </template>
        <template v-else>
          <router-link v-for="book in books" :key="book.id" :to="`/books/${book.id}`">
            <figure class="flex justify-center items-center flex-col text-center">
              <figcaption>
                <div>{{ book.title }}</div>
                <div>{{ book.author }}</div>
              </figcaption>
              <img :src="book.image" alt="Cover image" class="hover:opacity-90">
            </figure>
          </router-link>
        </template>
      </div>
    </section>
      
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