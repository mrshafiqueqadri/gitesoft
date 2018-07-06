<template>
    <div v-if="film.id" class="mt-20">
        <img :src="$load_image(film.photo)" alt="">
        <div class="text-left">
          
          <h3>{{film.name}}</h3>
          <div class="text-center">
            <Rate style="margin:auto; " :film="film" />
          </div>
          <p><b>{{'release_date' | translate}}:</b> {{film.release_date}}</p>
          <p><b>{{'price' | translate}}:</b> {{$n(film.price, 'currency', 'en-US')}}</p>
          <p><b>{{'country' | translate}}:</b> {{film.country.name}}</p>
          <p><b>{{'genre' | translate}}:</b> {{film.genre.title}}</p>
          <p><b>{{'description' | translate}}:</b> {{film.description}}</p>
        </div>
        

        <hr>
        <h3>{{'comments' | translate}}</h3>
        <comment :film="film"> </comment>
    </div>
</template>

<script>
import comment from '@/components/comment'
import {_show} from '@/services/films'
import Rate from '@/components/rate'
export default {
  components: {
    comment,
    Rate
  },
  data () {
    return {
      film: this.$route.params.film || {}
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      _show(this.$route.params.name).then(res => {
        this.film = res
      })
    },
    rating () {
      let total = this.film.ratings.reduce((rating, r) => rating += r.rating, 0)
      return total / this.film.ratings.length
    },
    rateNow (rating) {
      if (!this.user.isLoggedIn) {
        this.$router.push({name: 'Login'})
      }
    }
  }
}
</script>

<style scoped>
  img {
    width: 100%;
  }
  .mt-20 {
    margin-top: 20px;
    }
</style>
