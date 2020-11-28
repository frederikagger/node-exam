<template>
  <div class="container mx-auto pt-12">
    <div
      id="card"
      class="max-w-xs p-5 mx-auto flex flex-col bg-white rounded-xl h-80 lg:h-96 shadow-2x md:p-10 md:max-w-md"
    >
      <h4 class="text-4xl mb-6 font-bold text-center text-indigo-500">
        Signup
      </h4>
      <div class="flex">
        <input
          v-model="user.firstname"
          id="firstname"
          class="p-1 placeholder-gray-600 w-1/2 mr-3 focus:placeholder-gray-400 border mb-4 text-black text-lg bg-indigo-100 rounded-md border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="First name"
          type="text"
          required
        />
        <input
          v-model="user.lastname"
          id="lastname"
          class="p-1 placeholder-gray-600 w-1/2 focus:placeholder-gray-400 border mb-4 text-black text-lg bg-indigo-100 rounded-md border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Last name"
          type="text"
          required
        />
      </div>
      <input
        v-model="user.email"
        id="email"
        class="p-1 placeholder-gray-600 focus:placeholder-gray-400 border mb-4 text-black text-lg bg-indigo-100 rounded-md border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        type="text"
        placeholder="Email"
      />
      <input
        v-model="user.password"
        id="password"
        class="p-1 placeholder-gray-600 focus:placeholder-gray-400 border mb-4 text-black text-lg bg-indigo-100 rounded-md border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        type="password"
        placeholder="Password"
      />
      <input
        v-model="user.birthday"
        id="birthday"
        class="p-1 placeholder-gray-600 focus:placeholder-gray-400 border mb-4 text-black text-lg bg-indigo-100 rounded-md border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        type="date"
        placeholder="Date of birth"
      />
      <select
        name="countries"
        v-model="user.country"
        id="country"
        class="p-1 placeholder-gray-600 focus:placeholder-gray-400 border mb-4 text-black text-lg bg-indigo-100 rounded-md border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Country"
      >
        <option value="" disabled hidden>Country</option>
        <option v-for="country in countries" :key="country" :value="country">{{
          country
        }}</option>
      </select>
      <div class="inline-block mb-3">
        <input
          v-model="user.agreement"
          id="agreement"
          class="p-1 mr-3 placeholder-gray-600 focus:placeholder-gray-400 border mb-4 text-black text-lg bg-indigo-100 rounded-md border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          type="checkbox"
        />
        <label for="agreement" class="text-lg">
          Agree to the terms of service?</label
        >
      </div>

      <button
        @click="signup"
        class="bg-indigo-500 mb-4 shadow-md text-lg text-white font-medium h-10 rounded-md hover:bg-indigo-400"
      >
        Signup
      </button>
      <div class="text-center tracking-tight">
        Already have an account?
        <NuxtLink to="/login" class="text-pink-600">Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        birthday: null,
        country: ""
      },
      countries: ["Denmark", "Sweden", "Norway", "Finland"]
    };
  },
  methods: {
    async signup() {
      try {
        await this.$axios.$post("/register", {
          user: this.user
        });
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
