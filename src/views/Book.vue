<template>
    <div class="book container mx-auto p-12">
        <ApolloQuery :query="findBookQuery" :variables="{id: this.$route.params.id}">
            <template slot-scope="{ result: { data }, isLoading }">
                <div v-if="isLoading">Loading...</div>
                    <figure class="flex justify-center items-center flex-col text-center">
                        <figcaption>
                            <h1>{{ data.book.title }}</h1>
                            <h4>{{ data.book.author }}</h4>
                        </figcaption>
                        <img :src="data.book.image" alt="Cover image" class="hover:opacity-90">
                        <figcaption class="mt-3">
                            <p>{{data.book.description}}</p>
                        </figcaption>
                    </figure>
            </template>
        </ApolloQuery>
    </div>
</template>

<script>
import findBookQuery from '@/graphql/queries/findBook.gql'

export default {
    name: 'Book',
    data(){
        return{
            findBookQuery
        }
    }
}
</script>