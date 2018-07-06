<template>
    <div class="col-md-4 mt-20">
        <div class="card">
            <img class="card-img-top imageThumbnail" :src="$load_image(film.photo)" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title text-primary">
                    <router-link :to="{name: 'ViewFilm', params: {name: film.slug, film: film}}">{{film.name}}</router-link><br>
                    <small class="text-muted">{{'release_date' | translate}}: {{film.release_date}}</small>
                </h5>
                <p class="card-text" v-html="film.description.substring(0, 50)"></p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <Rate :film="film" />
                </li>
                <li class="list-group-item">
                    <icon name="comment-dots" class="text-primary"></icon> ({{this.film.comments.length}})
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Rate from '@/components/rate'
export default {
  name: 'film-component',
  components: {
    Rate
  },
  props: ['film'],
  methods: {

  }
}
</script>

<style scoped>
    .mt-20 {
        margin-top: 20px;
    }
    .imageThumbnail {
        width: 100%;
        height: 200px;
    }
</style>
