  <template>
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[560px]">
        <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form class="space-y-6" @submit.prevent="onLoginRequest">
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div class="mt-2">
                <input
                    id="email"
                    v-model="loginForm.email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required=""
                    class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="mt-2">
                <input
                    id="password"
                    v-model="loginForm.password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required=""
                    class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label for="token" class="block text-sm font-medium leading-6 text-gray-900">Token</label>
              <div class="mt-2">
                <input
                    id="token"
                    v-model="loginForm.token"
                    name="token"
                    type="text" required=""
                    class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-cyan-600 mt-10 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Login
              </button>
            </div>
          </form>

          <!-- Success -->
          <div v-if="showSuccessPopup" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div class="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h3 class="text-lg font-semibold text-green-600">Login Successful</h3>
              <p class="mt-4 text-sm text-gray-700">
                You have successfully logged in!
              </p>
            </div>
          </div>

          <!-- Error -->
          <div v-if="showLoginError" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div class="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h3 class="text-lg font-semibold text-red-600">Login Error</h3>
              <p class="mt-4 text-sm text-gray-700">
                {{ showErrorPopup }}
              </p>
              <button @click="showLoginError = false" class="mt-4 px-4 py-2 bg-cyan-600 text-white rounded">
                Close
              </button>
            </div>
          </div>

          <div>
            <p class="mt-6 text-center text-sm text-gray-500">
              Not a member?
              {{ ' ' }}
              <router-link to="/register" class="font-semibold leading-6 text-cyan-600 hover:text-cyan-500">Register</router-link>
            </p>

          </div>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { LoginRequest } from "../stores/type";
import { useUserStore } from "../stores/UserStore";
import router from "../router";
import authService from "../services/AuthService/AuthService";

const userStore = useUserStore();

const preLoader = ref<boolean>(true);
const loginForm = ref<LoginRequest | null>({
  email: '',
  password: '',
  token: '',
});
const showLoginError = ref(false);
const showErrorPopup = ref('');
const showSuccessPopup = ref(false);

setTimeout(() => {
  preLoader.value = false;
}, 500);

const onLoginRequest = async () => {
  try {
    const response = await authService.login(loginForm.value);
    userStore.setUser(response);

    console.log(userStore.user)
    showSuccessPopup.value = true;

    setTimeout(async () => {
      showSuccessPopup.value = false;
      await router.push({ name: 'play' });
    }, 2000);

  } catch (error: any) {
    if (error.response && error.response.status !== 200) {
      showErrorPopup.value = "Your login information is incorrect. Please check and try again.";
    } else {
      showErrorPopup.value = "An unexpected error occurred. Please try again later.";
    }
    showLoginError.value = true;
  }
};
</script>
