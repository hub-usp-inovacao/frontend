<template>
    <ErrorsTable :errors="errors" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ErrorsTable from "@/components/temporary/ErrorsTable.vue";
export default {
    components: {
        ErrorsTable
    },
    computed: {
        ...mapGetters({
            errors: "iniciativas/errors"
        })
    },
    methods: {
        ...mapActions({
            getData: "iniciativas/fetchSpreadsheets"
        }),
        bootstrap() {
            const ctx = {
                sheetsAPIKey: process.env.sheetsAPIKey,
                sheetID: process.env.sheetID,
            };

            if (this.errors == undefined)
                this.getData(ctx);
        }
    },
    beforeMount(){
        this.bootstrap();
    }
}
</script>

<style>

</style>