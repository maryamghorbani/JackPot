  <template>
    <div class="flex min-h-full flex-1 flex-col justify-center sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[560px]">
        <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form class="space-y-6" @submit.prevent="onRegister">
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div class="mt-2">
                <input
                    id="email"
                    v-model="registerForm.email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required=""
                    class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <div class="mt-2">
                <input
                    id="name"
                    v-model="registerForm.name"
                    name="name"
                    type="text"
                    required=""
                    class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label for="birthdate" class="block text-sm font-medium leading-6 text-gray-900">Birth date</label>
              <div class="mt-2">
                <input
                    id="birthdate"
                    v-model="registerForm.birthdate"
                    name="birthdate"
                    type="date"
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
                    v-model="registerForm.password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required=""
                    class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Confirm password</label>
              <div class="mt-2">
                <input
                    id="confirmPassword"
                    v-model="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autocomplete="current-password"
                    required=""
                    class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <p v-if="!isPasswordMatch" class="text-xs !mt-1 text-red-500">Passwords do not match</p>

            <div>
              <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-cyan-600 mt-20 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Register
              </button>
            </div>
          </form>

          <div>
            <div class="relative mt-10">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-200" />
              </div>
              <div class="relative flex justify-center text-sm font-medium leading-6">
                <span class="bg-white px-6 text-gray-900">Or continue with</span>
              </div>
            </div>

            <p class="mt-6 text-center text-sm text-gray-500">
              Do you have an account?
              {{ ' ' }}
              <router-link to="/login" class="font-semibold leading-6 text-cyan-600 hover:text-cyan-500">Login</router-link>
            </p>

          </div>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { ref } from 'vue';
import type { RegisterRequest } from '../stores/type';
import { useUserStore } from "../stores/UserStore";
import router from "../router";

const userStore = useUserStore();

const registerForm = ref<RegisterRequest | null>({
  email: '',
  name: '',
  birthdate: '',
  password: '',
});
const confirmPassword = ref<string>('');
const isPasswordMatch = ref(true);

const preLoader = ref<boolean>(true);

const passwordsMatch = () => {
  registerForm.value.password === confirmPassword.value ? isPasswordMatch.value = true : isPasswordMatch.value = false;
  return isPasswordMatch;
};

const onRegister = async () => {
  passwordsMatch();
  if (!isPasswordMatch.value) return;
  const data = await userStore.register();

  userStore.setTotpDevice(data.user.totp_device);
  userStore.setMessage(data.message);

  await router.push({
    name: 'ShowBarcode',
    params: {
      totpDevice: data.user.totp_device,
      message: data.message
    }
  });
};

</script>
