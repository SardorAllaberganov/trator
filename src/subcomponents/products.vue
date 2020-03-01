<template>
    <div>
        <table class="responsive">
            <thead></thead>
        </table>
    </div>
</template>

<script>
export default {
    beforeCreate(){
        this.$store.dispatch("getUserProducts")
        .then(()=>{
        });
    },
    // computed: mapState(['userData'])
}
</script>
