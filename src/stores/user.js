import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";
// function apiLogin(a, p) {
//   if (a === "ed" && p === "ed") return Promise.resolve({ isAdmin: true });
//   if (p === "ed") return Promise.resolve({ isAdmin: false });
//   return Promise.reject(new Error("invalid credentials"));
// }
const router = useRouter();

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    email: "",
    pseudo: "",
  }),
  actions: {
    logout() {
      this.$patch({
        email: "",
        pseudo: "",
      });

      // we could do other stuff like redirecting the user
    },

    async login(email, password) {
      const data = await (
        await fetch(
          `http://localhost:3001/utilisateurs?email=${email}&password=${password}`
        )
      ).json();

      if (data.length === 1) {
        this.$patch({
          email: email,
          pseudo: data[0].pseudo,
        });
        window.location.href = "#/";
      } else {
        alert("Identifiants incorrectes");
      }
    },
    async signIn(pseudo, email, password, image) {
      const body = {
        pseudo: pseudo,
        email: email,
        password: password,
        image: image,
      };
      const data = await (
        await fetch(`http://localhost:3001/utilisateurs`, {
          method: "post",
          body: JSON.stringify(body),
        })
      ).json();

      if (data.length === 1) {
        this.$patch({
          email: email,
          pseudo: pseudo,
        });
        window.location.href = "#/";
      } else {
        alert("Identifiants incorrectes");
      }
    },
  },
});
