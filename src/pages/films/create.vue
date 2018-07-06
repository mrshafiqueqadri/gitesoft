<template>
    <div>
        <div class="imgcontainer">
            <h2>{{'create-film' | translate}}</h2>
        </div>
    
        <div class="container text-left">
            <label for="uname"><b>{{'name' | translate}}</b></label>
            <input type="text" class="form-control" :placeholder="'name' | translate" name="uname" v-model="film.name" required>
            <validation-error v-if="errors.name" :errors="errors.name"></validation-error>

            <label for="release_date"><b>{{'release_date' | translate}}</b></label>
            <input type="date" class="form-control" :placeholder="'release_date' | translate" name="release_date" v-model="film.release_date" required>
            <validation-error v-if="errors.release_date" :errors="errors.release_date"></validation-error>

            <label for="price"><b>{{'price' | translate}}</b></label>
            <input type="number" class="form-control" :placeholder="'price' | translate" name="price" v-model="film.price" required>
            <validation-error v-if="errors.price" :errors="errors.price"></validation-error>

            <label for="country"><b>{{'country' | translate}}</b></label>
            <select class="form-control" :placeholder="'country' | translate" name="country" v-model="film.country_id" >
                <option v-for="(country, index) in pre_requisits.countries" :key="index" :value="country.id">{{country.name}}</option>
            </select>
            <validation-error v-if="errors.country" :errors="errors.country"></validation-error>

            <label for="genre"><b>{{'genre' | translate}}</b></label>
            <select class="form-control" :placeholder="'genre' | translate" name="genre" v-model="film.genre_id" >
                <option v-for="(genre, index) in pre_requisits.genres" :key="index" :value="genre.id">{{genre.title}}</option>
            </select>
            <validation-error v-if="errors.country" :errors="errors.country"></validation-error>
            
            <label for="description"><b>{{'description' | translate}}</b></label>
            <tinymce id="description" v-model="film.description"></tinymce>
            <validation-error v-if="errors.description" :errors="errors.description"></validation-error>

            <label for="photo"><b>{{'photo' | translate}}</b></label>
            <vue-dropzone ref="myVueDropzone" id="dropzone" 
                :options="dropzoneOptions" 
                @vdropzone-success="uploadedSuccessfully"
            ></vue-dropzone>

            <button type="button" @click="create">{{'create-film' | translate}}</button>

            <label>
                <router-link :to="{name: 'Login'}">{{'already_account' | translate}}</router-link>
            </label>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'
    import {_create, _prerequisite} from '@/services/films'
    export default {
        name: 'login',
        components:{
            vueDropzone: vue2Dropzone
        },
        data() {
            return {
                film: {},
                errors: {},
                pre_requisits: {},
                dropzoneOptions: {
                    url: this.$api+'/upload-image',
                    thumbnailWidth: 200,
                    maxFilesize: 5,
                    headers: { "My-Awesome-Header": "header value" },
                    addRemoveLinks: true
                }
            }
        },
        mounted() {
            if (!this.user.isLoggedIn) {
                this.$router.push('/login')
                return;
            }
            this.fetchRequisits()
        },
        methods: {
            create() {
                _create(this.film).then( res => {
                        this.$toast.success(res.message)
                        this.$router.push({name: 'Home'})
                    },
                    error => {
                        this.errors = error.body.errors
                    }
                )
            },
            fetchRequisits(){
                _prerequisite().then( res => this.pre_requisits = res)
            },
            uploadedSuccessfully(file, response) {
                this.film.photo = response
            }
        },
        computed: mapState(['user'])
    }
</script>

<style scoped>
    /* Bordered form */
    
    form {
        border: 3px solid #f1f1f1;
    }
    
    
    /* Full-width inputs */
    
    input[type=text],
    input[type=password] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }
    
    
    /* Set a style for all buttons */
    
    button {
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }
    
    
    /* Add a hover effect for buttons */
    
    button:hover {
        opacity: 0.8;
    }
    
    
    /* Extra style for the cancel button (red) */
    
    .cancelbtn {
        width: auto;
        padding: 10px 18px;
        background-color: #f44336;
    }
    
    
    /* Center the avatar image inside this container */
    
    .imgcontainer {
        text-align: center;
        margin: 24px 0 12px 0;
    }
    
    
    /* Avatar image */
    
    img.avatar {
        width: 40%;
        border-radius: 50%;
    }
    
    
    /* Add padding to containers */
    
    .container {
        padding: 16px;
    }
    
    
    /* The "Forgot password" text */
    
    span.psw {
        float: right;
        padding-top: 16px;
    }
    
    
    /* Change styles for span and cancel button on extra small screens */
    
    @media screen and (max-width: 300px) {
        span.psw {
            display: block;
            float: none;
        }
        .cancelbtn {
            width: 100%;
        }
    }
</style>
