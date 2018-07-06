<template>
    <div class="container">
        <div class="row">
            <film v-for="(film, index) in films" :key="index" :film="film"></film>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: mapState({
    films: state => state.films.films
  }),
  mounted () {
    this.fetchFilms()
  },
  methods: {
    ...mapActions(['fetchFilms'])
  }
}
</script>

<style>

</style>
