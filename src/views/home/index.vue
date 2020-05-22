<template>
    <section>
        <!-- Cute tiny form -->
        <div class="form">
            <label for="field-name" class="label">Search by Id</label>
            <input v-model="id" placeholder="Search" class="input" id="field-name" />
        </div>

        <!-- Cute tiny form -->
        <div class="form">
            <label for="field-name" class="label">Search by String</label>
            <input v-model="search" placeholder="Search" class="input" id="field-name" />
        </div>

        <!-- Apollo watched Graphql query -->
        <ApolloQuery :query="require('@/graphql/QryJobInfo.gql')" :variables="{ id }">
            <template slot-scope="{ result: { loading, error, data } }">
                <!-- Loading -->
                <div v-if="loading" class="loading apollo">Loading...</div>

                <!-- Error -->
                <div v-else-if="error" class="error apollo">An error occured</div>

                <!-- Result -->
                <div v-else-if="data" class="result apollo">{{ data }}</div>

                <!-- No result -->
                <div v-else class="no-result apollo">No result :(</div>
            </template>
        </ApolloQuery>

        <!-- Apollo watched Graphql query -->
        <ApolloQuery :query="require('@/graphql/QryJobSearch.gql')" :variables="{ search }">
            <template slot-scope="{ result: { loading, error, data } }">
                <!-- Loading -->
                <div v-if="loading" class="loading apollo">Loading...</div>

                <!-- Error -->
                <div v-else-if="error" class="error apollo">An error occured</div>

                <!-- Result -->
                <div v-else-if="data" class="result apollo">{{ data }}</div>

                <!-- No result -->
                <div v-else class="no-result apollo">No result :(</div>
            </template>
        </ApolloQuery>
    </section>
</template>

<script>
export default {
    data() {
        return {
            id: '',
            search: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.form,
.input,
.apollo,
.message {
    padding: 12px;
}

label {
    display: block;
    margin-bottom: 6px;
}

.input {
    font-family: inherit;
    font-size: inherit;
    border: solid 2px #ccc;
    border-radius: 3px;
}

.error {
    color: red;
}
</style>
