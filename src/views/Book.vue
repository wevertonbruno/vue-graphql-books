<template>
    <div class="book">
        <ApolloQuery :query="findBookQuery" :variables="{id: this.$route.params.id}">
            <template slot-scope="{ result: { data }, isLoading }">
                <div v-if="isLoading">Loading...</div>
                <figure v-else class="book">
                    <figcaption>
                        <h1>{{ data.book.title }}</h1>
                        <h4>{{ data.book.author }}</h4>
                    </figcaption>
                    <img :src="data.book.image" alt="Cover image">
                    <p>{{ data.book.description }}</p>
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