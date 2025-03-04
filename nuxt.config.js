// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
      API_BASE: "https://my-backend-production-2da4.up.railway.app/api/v1",
    },
  },
  app: {
    baseURL: "/",
    head: {
      title: "Nuxt TailwindCSS",

      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        },
      ],
    },
  },
  css: ["@/assets/css/tailwind.css"],
});
