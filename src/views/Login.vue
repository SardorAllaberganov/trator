<template>
  <div class="login">
    <div class="row">
      <div class="col-4">
        <img class="login-photo" src="../assets/images/login-photo.jpg" alt="">
      </div>
      <div class="col-8">
        <div class="row">
          <form class="login-form" @submit.prevent="login">
            <img src="../assets/images/logo.svg" width="200" alt="">
            <h1>Kirish</h1>
            <label>Telefon raqami *</label>
            <input required v-model="phone" type="text" placeholder="Username"/>
            <label>Parol *</label>
            <input required v-model="password" type="password" placeholder="Password"/>
            <hr/>
            <button type="submit" class="login-btn">Kirish</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  color: #606060;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
.absolute-center {
  justify-content: center;
  align-items: center;
}
.col-4 {
  flex: 33.3333%;
  max-width: 33.3333%;
}
.col-8 {
  flex: 66.6666%;
  max-width: 66.6666%;
}
.login-photo {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
.login-form {
  height: 100vh;
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  label,
  input {
    width: 250px;
  }
  label {
    margin: 20px 0 10px;
  }
  input {
    padding: 5px 10px;
    outline: none;
  }
}
.login-btn {
  padding: 10px 30px;
  background: #606060;
  border: 1px solid transparent;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border-color: #606060;
    background: none;
    color: #606060;
  }
}
</style>


<script>
// @ is an alias to /src
// import HelloWorld from "@/components/";

//import axios from "axios";

export default {
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      let phone = this.phone;
      let password = this.password;
      this.$store
        .dispatch("login", { phone, password })
        .then(() => {
          console.log(this.$store.state.role);
          if (this.$store.state.role === 'admin'){
            this.$router.push("/admin")
          }
          else if (this.$store.state.role === 'supplier'){
            this.$router.push("/dashboard-supplier/products")
          }
          else{
            this.$router.push("/dashboard-company")
          }
          
        })
        .catch(err => console.log(err));
    },
  }
};
</script>
