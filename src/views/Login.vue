<template>
    <div class="container mx-auto h-full flex flex-col justify-center p-4">
        <form @submit.prevent="handleLogin" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div class="mb-4">
                <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username">
            </div>
            <div class="mb-6">
                <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input v-model="password" class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************">
            </div>
            <div class="flex items-center justify-between">
                <button class="bg-purple-600 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded disabled:opacity-50 hover:bg-purple-700" :disabled="loading" type="submit">
                    Sign In
                </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
                Forgot Password?
            </a>
            </div>
        </form>
    </div>
</template>
<script>
import gql from 'graphql-tag'
import { onLogin } from '@/vue-apollo'

export default {
    name: "Login",
    data(){
        return{
            username: "",
            password: "",
            loading: false
        }
    },
    methods: {
       async handleLogin() {
            const { data: { login } } = await this.$apollo.mutate({
                // Query
                mutation: gql`mutation ($data: LoginInput!) {
                    login(input: $data) {
                        access_token
                        refresh_token
                        expires_in
                        token_type
                        user{
                            id
                            name
                            email
                        }
                    }
                }`,
                // Parameters
                variables: {
                    data: {
                        username: this.username,
                        password: this.password
                    },
                },
            });
            await onLogin(this.$apollo.provider.defaultClient, login.access_token);
            this.$router.push('/');
        }
    }
}
</script>