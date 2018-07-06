<template>
    <star-rating @rating-selected="rateNow($event)" :rating="rating()" :show-rating="false"></star-rating>
</template>

<script>

import { mapState } from 'vuex'
import { _rating } from '@/services/films'

export default {
  props: ['film'],
  methods: {
    rating () {
      return this.film.ratings.reduce((rating, r) => rating += r.rating, 0) / this.film.ratings.length
    },
    rateNow (rating) {
      if (!this.user.isLoggedIn) {
        this.$router.push({name: 'Login'})
        return
      }
      _rating(this.film.id, {rating}).then(response => {
        this.$toast.success(response.message, { position: 'top-center' })
      })
    }
  },
  computed: mapState(['user'])

}
</script>
