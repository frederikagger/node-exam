<template>
  <div class="container mx-auto pt-32">
    <div
      id="card"
      class="max-w-xs p-5 mx-auto flex flex-col bg-white rounded-xl h-80 lg:h-96 shadow-2x md:p-10 md:max-w-md"
    >
      <h4 class="text-4xl mb-6 font-bold text-center text-indigo-500">
        Login
      </h4>
      <input
        v-model="user.email"
        id="email"
        class="p-1 placeholder-gray-600 focus:placeholder-gray-400 border mb-4 text-black text-lg bg-indigo-50 rounded-md border-transparent bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        type="text"
        placeholder="Email"
      />
      <input
        v-model="user.password"
        id="password"
        class="p-1 placeholder-gray-600 focus:placeholder-gray-400 border mb-4 text-black text-lg bg-indigo-50 rounded-md border-transparent bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        type="password"
        placeholder="Password"
      />
      <button
        @click="login"
        class="bg-indigo-500 px-3 mb-4 shadow-sm text-lg text-white font-medium h-10 rounded-md hover:bg-indigo-400"
      >
        Login
      </button>
      <div class="text-center tracking-tight">
        Don't have an account yet?
        <NuxtLink to="/signup" class="text-pink-600">Sign up</NuxtLink>
      </div>
      <div
        v-if="error"
        class="bg-pink-600 rounded-md mt-4 text-white p-2 font-medium text-center text-lg"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      error: ""
    };
  },
  methods: {
    async login() {
      try {
        const token = await this.$axios.$post("/login", {
          user: this.user
        });
        this.$store.dispatch("login", token);
        this.$axios.setToken(token);
        this.$router.replace("/");
      } catch (error) {
        this.error = error.response.statusText;
        console.log(error);
      }
    }
  }
};
</script>
